"""
StudyQuiz -- FastAPI Backend
Run: python main.py
"""
import os, json, time, sqlite3, hashlib, secrets
from datetime import datetime, timezone, date
from contextlib import contextmanager, asynccontextmanager
from typing import Optional

import httpx
import asyncio
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, Response
from pydantic import BaseModel
from dotenv import load_dotenv

# ── Always load .env from the same folder as this script ────────
_BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(_BASE_DIR, ".env"))

DATABASE_URL  = os.getenv("DATABASE_URL", "sqlite:///./studyquiz_local.db")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

# Self-ping URL: set RENDER_EXTERNAL_URL in Render environment variables
# e.g. https://your-app-name.onrender.com
RENDER_EXTERNAL_URL = os.getenv("RENDER_EXTERNAL_URL", "")
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "shamsiddin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "quizadmin2026")

# ── Session version — bump this to force-logout all users once ──
# After deploy, users with old version get kicked to login page.
SESSION_VERSION = "v3"

# Resolve SQLite file path relative to this script
_sqlite_path = DATABASE_URL.replace("sqlite:///", "")
if _sqlite_path.startswith("./"):
    _sqlite_path = os.path.join(_BASE_DIR, _sqlite_path[2:])

# Frontend root: one level up from backend/
_FRONT_DIR = os.path.join(_BASE_DIR, "..")


# ── Self-pinger: не даёт Render усыплять бэкенд ─────────────────
# Каждые 10 минут делает GET к самому себе, чтобы сервер не засыпал.
async def self_ping_loop():
    await asyncio.sleep(30)  # дать серверу полностью подняться
    url = RENDER_EXTERNAL_URL.rstrip("/") + "/"
    while True:
        try:
            async with httpx.AsyncClient(timeout=10) as client:
                r = await client.get(url)
            print(f"  [pinger] {url} → {r.status_code}")
        except Exception as e:
            print(f"  [pinger] ошибка: {e}")
        await asyncio.sleep(10 * 60)  # 10 минут


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    if RENDER_EXTERNAL_URL:
        asyncio.create_task(self_ping_loop())
        print(f"  Pinger -> active ({RENDER_EXTERNAL_URL})")
    else:
        print("  Pinger -> disabled (RENDER_EXTERNAL_URL not set)")
    yield

app = FastAPI(title="StudyQuiz API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Раздача фронтенда ────────────────────────────────────────────
# JS/CSS/images отдаём с no-store чтобы браузер не кэшировал старые версии

_MIME = {
    '.js':   'application/javascript',
    '.css':  'text/css',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif':  'image/gif',
    '.svg':  'image/svg+xml',
    '.webp': 'image/webp',
    '.ico':  'image/x-icon',
    '.woff': 'font/woff',
    '.woff2':'font/woff2',
}

def _no_cache_file(path: str):
    if not os.path.isfile(path):
        raise HTTPException(404, "File not found")
    ext  = os.path.splitext(path)[1].lower()
    mime = _MIME.get(ext, 'application/octet-stream')
    with open(path, 'rb') as f:
        content = f.read()
    return Response(content, media_type=mime,
                    headers={"Cache-Control": "no-store, no-cache, must-revalidate"})

@app.get("/js/{file_path:path}", include_in_schema=False)
def serve_js(file_path: str):
    return _no_cache_file(os.path.join(_FRONT_DIR, "js", file_path))

@app.get("/css/{file_path:path}", include_in_schema=False)
def serve_css(file_path: str):
    return _no_cache_file(os.path.join(_FRONT_DIR, "css", file_path))

@app.get("/images/{file_path:path}", include_in_schema=False)
def serve_images(file_path: str):
    return _no_cache_file(os.path.join(_FRONT_DIR, "images", file_path))

@app.get("/", include_in_schema=False)
@app.get("/login", include_in_schema=False)
@app.get("/login.html", include_in_schema=False)
def serve_login():
    return FileResponse(os.path.join(_FRONT_DIR, "login.html"))

@app.get("/dashboard", include_in_schema=False)
@app.get("/dashboard.html", include_in_schema=False)
def serve_dashboard():
    return FileResponse(os.path.join(_FRONT_DIR, "dashboard.html"))

@app.get("/quiz", include_in_schema=False)
@app.get("/quiz.html", include_in_schema=False)
def serve_quiz():
    return FileResponse(os.path.join(_FRONT_DIR, "quiz.html"))

@app.get("/subject", include_in_schema=False)
@app.get("/subject.html", include_in_schema=False)
def serve_subject():
    return FileResponse(os.path.join(_FRONT_DIR, "subject.html"))

@app.get("/profile", include_in_schema=False)
@app.get("/profile.html", include_in_schema=False)
def serve_profile():
    return FileResponse(os.path.join(_FRONT_DIR, "profile.html"))

@app.get("/leaderboard", include_in_schema=False)
@app.get("/leaderboard.html", include_in_schema=False)
def serve_leaderboard():
    return FileResponse(os.path.join(_FRONT_DIR, "leaderboard.html"))

@app.get("/admin", include_in_schema=False)
@app.get("/admin.html", include_in_schema=False)
def serve_admin():
    return FileResponse(os.path.join(_FRONT_DIR, "admin.html"))

# ----------------------------------------------------------------
# DB helpers (SQLite)
# To switch back to Neon: replace get_conn() with psycopg2.connect()
# and change ? placeholders back to %s throughout.
# ----------------------------------------------------------------

def get_conn():
    conn = sqlite3.connect(_sqlite_path)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn

def _row(r):
    return dict(r) if r else None

@contextmanager
def db():
    conn = get_conn()
    try:
        cur = conn.cursor()
        yield cur
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

# ----------------------------------------------------------------
# Init tables (SQLite-compatible -- no SERIAL, TIMESTAMPTZ, etc.)
# ----------------------------------------------------------------

def init_db():
    with db() as cur:
        cur.execute("""
        CREATE TABLE IF NOT EXISTS sq_users (
            username       TEXT PRIMARY KEY,
            display_name   TEXT NOT NULL,
            avatar_color   TEXT DEFAULT '#c850f0',
            total_points   INTEGER DEFAULT 0,
            streak_current INTEGER DEFAULT 0,
            streak_best    INTEGER DEFAULT 0,
            last_played    TEXT,
            password_hash  TEXT DEFAULT '',
            created_at     TEXT DEFAULT (datetime('now'))
        )""")
        # Migration: add password_hash column to existing DBs
        try:
            cur.execute("ALTER TABLE sq_users ADD COLUMN password_hash TEXT DEFAULT ''")
        except Exception:
            pass  # Column already exists
        cur.execute("""
        CREATE TABLE IF NOT EXISTS sq_results (
            id            INTEGER PRIMARY KEY AUTOINCREMENT,
            username      TEXT NOT NULL REFERENCES sq_users(username),
            subject       TEXT NOT NULL,
            mode          TEXT NOT NULL,
            score         INTEGER NOT NULL,
            total         INTEGER NOT NULL,
            pct           INTEGER NOT NULL,
            points_earned INTEGER NOT NULL DEFAULT 0,
            time_seconds  INTEGER DEFAULT 0,
            played_at     TEXT DEFAULT (datetime('now'))
        )""")
        cur.execute("""
        CREATE TABLE IF NOT EXISTS sq_achievements (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            username  TEXT NOT NULL REFERENCES sq_users(username),
            slug      TEXT NOT NULL,
            earned_at TEXT DEFAULT (datetime('now')),
            UNIQUE(username, slug)
        )""")
        cur.execute("CREATE INDEX IF NOT EXISTS idx_sq_results_user ON sq_results(username)")
        cur.execute("CREATE INDEX IF NOT EXISTS idx_sq_ach_user ON sq_achievements(username)")

        # Online activity tracking
        cur.execute("""
        CREATE TABLE IF NOT EXISTS sq_online (
            username   TEXT PRIMARY KEY REFERENCES sq_users(username),
            last_seen  TEXT NOT NULL,
            page       TEXT DEFAULT ''
        )""")
        cur.execute("CREATE INDEX IF NOT EXISTS idx_sq_online_seen ON sq_online(last_seen)")


# ----------------------------------------------------------------
# Achievements
# ----------------------------------------------------------------

ACHIEVEMENTS = [
    {"slug": "first_quiz",       "icon": "🎯", "title": "First Quiz",      "desc": "Complete your first quiz",               "points": 50,   "condition": lambda s, r: r["total_quizzes"] >= 1},
    {"slug": "perfect_100",      "icon": "💯", "title": "Perfect!",         "desc": "Score 100% in a quiz",                   "points": 200,  "condition": lambda s, r: r.get("last_pct", 0) == 100},
    {"slug": "quiz_10",          "icon": "📚", "title": "Bookworm",         "desc": "Complete 10 quizzes",                    "points": 100,  "condition": lambda s, r: r["total_quizzes"] >= 10},
    {"slug": "quiz_50",          "icon": "🏆", "title": "Veteran",          "desc": "Complete 50 quizzes",                    "points": 300,  "condition": lambda s, r: r["total_quizzes"] >= 50},
    {"slug": "streak_3",         "icon": "🔥", "title": "3-Day Streak",     "desc": "Study 3 days in a row",                  "points": 75,   "condition": lambda s, r: r.get("streak_current", 0) >= 3},
    {"slug": "streak_7",         "icon": "🌟", "title": "One Week!",        "desc": "Study 7 days in a row",                  "points": 200,  "condition": lambda s, r: r.get("streak_current", 0) >= 7},
    {"slug": "streak_30",        "icon": "👑", "title": "Month of Power",   "desc": "Study 30 days in a row",                 "points": 1000, "condition": lambda s, r: r.get("streak_current", 0) >= 30},
    {"slug": "score_1000",       "icon": "⭐", "title": "1000 Points",      "desc": "Earn 1000 total points",                 "points": 100,  "condition": lambda s, r: s["total_points"] >= 1000},
    {"slug": "score_5000",       "icon": "💫", "title": "5000 Points",      "desc": "Earn 5000 total points",                 "points": 200,  "condition": lambda s, r: s["total_points"] >= 5000},
    {"slug": "physics_master",   "icon": "⚛️","title": "Physicist",         "desc": "Complete 5 physics quizzes",             "points": 150,  "condition": lambda s, r: r.get("physics_quizzes", 0) >= 5},
    {"slug": "mathanalysis_ace", "icon": "∫",  "title": "Analyst",          "desc": "Complete 5 math analysis quizzes",       "points": 150,  "condition": lambda s, r: r.get("mathanalysis_quizzes", 0) >= 5},
    {"slug": "speed_demon",      "icon": "⚡", "title": "Lightning",        "desc": "Complete a quiz in under 2 minutes",     "points": 100,  "condition": lambda s, r: 0 < r.get("last_time", 9999) < 120},
    {"slug": "perfect_streak_3", "icon": "🎖️","title": "Flawless x3",      "desc": "3 quizzes in a row with 100%",           "points": 300,  "condition": lambda s, r: r.get("perfect_streak", 0) >= 3},
]


def check_achievements(username: str, user_row: dict, result_ctx: dict) -> list:
    new_achs = []
    with db() as cur:
        cur.execute("SELECT slug FROM sq_achievements WHERE username=?", (username,))
        earned_slugs = {row["slug"] for row in cur.fetchall()}
        for ach in ACHIEVEMENTS:
            if ach["slug"] in earned_slugs:
                continue
            try:
                if ach["condition"](user_row, result_ctx):
                    cur.execute(
                        "INSERT OR IGNORE INTO sq_achievements(username, slug) VALUES(?,?)",
                        (username, ach["slug"])
                    )
                    new_achs.append({
                        "icon": ach["icon"], "title": ach["title"],
                        "desc": ach["desc"], "points": ach["points"]
                    })
            except Exception:
                pass
    return new_achs


def calc_points(pct: int, total: int, time_seconds: int) -> int:
    base  = round(pct * total * 0.5)
    bonus = 50 if pct == 100 else (25 if pct >= 90 else (10 if pct >= 75 else 0))
    speed = max(0, 30 - time_seconds // 10) if time_seconds > 0 else 0
    participation = 10  # +10 очков за каждый завершённый квиз
    return max(10, base + bonus + speed + participation)

# ================================================================
# ROUTES
# ================================================================


# ── Auth helpers ─────────────────────────────────────────────────

def _hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


# ---- Auth endpoints ─────────────────────────────────────────────

class RegisterBody(BaseModel):
    username:     str
    display_name: str
    password:     str

class LoginBody(BaseModel):
    username: str
    password: str


@app.post("/api/auth/register", status_code=201)
def register(body: RegisterBody):
    uname = body.username.lower().strip()
    if not uname or len(uname) < 3:
        raise HTTPException(400, "Username must be at least 3 characters")
    if not body.password or len(body.password) < 4:
        raise HTTPException(400, "Password must be at least 4 characters")
    # Блокируем регистрацию на зарезервированный admin username
    if uname == ADMIN_USERNAME.lower():
        raise HTTPException(400, "This username is reserved")
    ph = _hash_password(body.password)
    with db() as cur:
        cur.execute("SELECT username FROM sq_users WHERE username=?", (uname,))
        if cur.fetchone():
            raise HTTPException(409, "Username already taken")
        cur.execute(
            "INSERT INTO sq_users(username, display_name, password_hash) VALUES(?,?,?)",
            (uname, body.display_name.strip() or uname, ph)
        )
        cur.execute("SELECT * FROM sq_users WHERE username=?", (uname,))
        row = _row(cur.fetchone())
    row.pop("password_hash", None)
    return row


class SetPasswordBody(BaseModel):
    username: str
    password: str

@app.post("/api/auth/set-password")
def set_password(body: SetPasswordBody):
    """One-time migration endpoint: set password for accounts created without one."""
    uname = body.username.lower().strip()
    if not body.password or len(body.password) < 4:
        raise HTTPException(400, "Password must be at least 4 characters")
    ph = _hash_password(body.password)
    with db() as cur:
        cur.execute("SELECT username, password_hash FROM sq_users WHERE username=?", (uname,))
        row = cur.fetchone()
        if not row:
            raise HTTPException(404, "User not found")
        row = _row(row)
        if row.get("password_hash"):
            raise HTTPException(409, "Password already set. Use login instead.")
        cur.execute("UPDATE sq_users SET password_hash=? WHERE username=?", (ph, uname))
    return {"ok": True, "message": "Password set successfully"}


@app.post("/api/auth/login")
def login(body: LoginBody):
    uname = body.username.lower().strip()

    # ── Admin shortcut: check against .env credentials ──────────
    if uname == ADMIN_USERNAME.lower() and body.password == ADMIN_PASSWORD:
        return {"is_admin": True, "username": uname, "display_name": "Admin"}

    ph = _hash_password(body.password)
    with db() as cur:
        cur.execute("SELECT * FROM sq_users WHERE username=?", (uname,))
        row = cur.fetchone()
    if not row:
        raise HTTPException(401, "Invalid username or password")
    row = _row(row)
    stored = row.get("password_hash", "")
    if not stored:
        raise HTTPException(401, "Account has no password set. Please register again.")
    if stored != ph:
        raise HTTPException(401, "Invalid username or password")
    row.pop("password_hash", None)
    return row


@app.get("/api/ping")
def ping():
    return {"ok": True}


@app.get("/api/session-version")
def get_session_version():
    """Frontend checks this on load — if version mismatch, forces re-login."""
    return {"version": SESSION_VERSION}


class HeartbeatBody(BaseModel):
    username: str
    page: Optional[str] = ""

@app.post("/api/heartbeat")
def heartbeat(body: HeartbeatBody):
    """Called every 30s from frontend to track online users."""
    username = body.username.lower().strip()
    # Store as SQLite-compatible UTC string: '2026-06-09 10:00:00'
    now = datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S')
    with db() as cur:
        cur.execute("""
            INSERT INTO sq_online(username, last_seen, page)
            VALUES(?, ?, ?)
            ON CONFLICT(username) DO UPDATE SET last_seen=excluded.last_seen, page=excluded.page
        """, (username, now, body.page or ""))
    return {"ok": True}


# ---- Users -----------------------------------------------------

class UserCreate(BaseModel):
    username: str
    display_name: str

class UserUpdate(BaseModel):
    display_name: Optional[str] = None
    avatar_color: Optional[str] = None


@app.post("/api/users", status_code=201)
def create_user(body: UserCreate):
    uname = body.username.lower().strip()
    with db() as cur:
        cur.execute("SELECT username FROM sq_users WHERE username=?", (uname,))
        if not cur.fetchone():
            cur.execute(
                "INSERT INTO sq_users(username, display_name) VALUES(?,?)",
                (uname, body.display_name or uname)
            )
        cur.execute("SELECT * FROM sq_users WHERE username=?", (uname,))
        return _row(cur.fetchone())


@app.get("/api/users/{username}/stats")
def get_user_stats(username: str):
    """Returns per-subject quiz stats for profile modal in leaderboard."""
    subjects = ["physics", "mathanalysis", "linalg", "drawing", "fundamental"]
    with db() as cur:
        cur.execute("SELECT * FROM sq_users WHERE username=?", (username,))
        user = cur.fetchone()
        if not user:
            raise HTTPException(404, "User not found")
        user = _row(user)

        subject_stats = {}
        for subj in subjects:
            cur.execute("""
                SELECT COUNT(*) as cnt, ROUND(AVG(pct),1) as avg_pct, MAX(pct) as best_pct
                FROM sq_results WHERE username=? AND subject=?
            """, (username, subj))
            row = _row(cur.fetchone())
            if row and row["cnt"] > 0:
                subject_stats[subj] = {
                    "quizzes":  row["cnt"],
                    "avg_pct":  row["avg_pct"],
                    "best_pct": row["best_pct"],
                }

        cur.execute("SELECT COUNT(*) as cnt FROM sq_achievements WHERE username=?", (username,))
        ach_count = cur.fetchone()["cnt"]

        cur.execute("""
            SELECT subject, mode, pct, played_at FROM sq_results
            WHERE username=? ORDER BY played_at DESC LIMIT 5
        """, (username,))
        recent = [_row(r) for r in cur.fetchall()]

    return {
        "username":       user["username"],
        "display_name":   user["display_name"],
        "avatar_color":   user["avatar_color"],
        "total_points":   user["total_points"],
        "streak_current": user["streak_current"],
        "streak_best":    user["streak_best"],
        "achievements":   ach_count,
        "subject_stats":  subject_stats,
        "recent_results": recent,
    }


@app.get("/api/users/{username}")
def get_user(username: str):
    with db() as cur:
        cur.execute("SELECT * FROM sq_users WHERE username=?", (username,))
        row = cur.fetchone()
        if not row:
            raise HTTPException(404, "User not found")
        return _row(row)


@app.patch("/api/users/{username}")
def update_user(username: str, body: UserUpdate):
    with db() as cur:
        cur.execute("SELECT username FROM sq_users WHERE username=?", (username,))
        if not cur.fetchone():
            raise HTTPException(404, "User not found")
        if body.display_name is not None:
            cur.execute("UPDATE sq_users SET display_name=? WHERE username=?",
                        (body.display_name, username))
        if body.avatar_color is not None:
            cur.execute("UPDATE sq_users SET avatar_color=? WHERE username=?",
                        (body.avatar_color, username))
        cur.execute("SELECT * FROM sq_users WHERE username=?", (username,))
        return _row(cur.fetchone())


# ---- Results ---------------------------------------------------

class ResultCreate(BaseModel):
    username:        str
    subject:         str
    mode:            str
    score:           int
    total:           int
    pct:             int
    time_seconds:    int = 0
    points_override: Optional[int] = None  # если 0 — курс пройден, не начислять


@app.post("/api/results", status_code=201)
def submit_result(body: ResultCreate):
    username = body.username.lower().strip()
    # Если points_override == 0 — курс уже пройден, очки не начисляем
    if body.points_override is not None and body.points_override == 0:
        points = 0
    else:
        points = calc_points(body.pct, body.total, body.time_seconds)

    with db() as cur:
        cur.execute("SELECT * FROM sq_users WHERE username=?", (username,))
        user = cur.fetchone()
        if not user:
            raise HTTPException(404, "User not found -- create profile first")
        user = _row(user)

        cur.execute("""
            INSERT INTO sq_results(username, subject, mode, score, total, pct, points_earned, time_seconds)
            VALUES(?,?,?,?,?,?,?,?)
        """, (username, body.subject, body.mode, body.score, body.total,
              body.pct, points, body.time_seconds))

        today = datetime.now(timezone.utc).date()
        last_str = user["last_played"]
        streak_current = user["streak_current"]
        if last_str is None:
            streak_current = 1
        else:
            last = date.fromisoformat(str(last_str)[:10])
            diff = (today - last).days
            if diff > 1:
                streak_current = 1
            elif diff == 1:
                streak_current += 1
        streak_best = max(user["streak_best"], streak_current)

        cur.execute("SELECT COUNT(*) as c FROM sq_results WHERE username=? AND subject=?",
                    (username, body.subject))
        subj_count = cur.fetchone()["c"]

        cur.execute("SELECT COUNT(*) as c FROM sq_results WHERE username=?", (username,))
        total_quizzes = cur.fetchone()["c"]

        cur.execute("""
            SELECT pct FROM sq_results WHERE username=?
            ORDER BY played_at DESC LIMIT 10
        """, (username,))
        recent = [r["pct"] for r in cur.fetchall()]
        perfect_streak = 0
        for p in recent:
            if p == 100:
                perfect_streak += 1
            else:
                break

        new_points = user["total_points"] + points
        cur.execute("""
            UPDATE sq_users
            SET total_points=?, streak_current=?, streak_best=?, last_played=?
            WHERE username=?
        """, (new_points, streak_current, streak_best, today.isoformat(), username))
        cur.execute("SELECT * FROM sq_users WHERE username=?", (username,))
        updated_user = _row(cur.fetchone())

    result_ctx = {
        "total_quizzes":           total_quizzes,
        "last_pct":                body.pct,
        "last_time":               body.time_seconds,
        "streak_current":          streak_current,
        "perfect_streak":          perfect_streak,
        f"{body.subject}_quizzes": subj_count,
    }
    new_achievements = check_achievements(username, updated_user, result_ctx)

    return {
        "points_earned":    points,
        "total_points":     updated_user["total_points"],
        "new_achievements": new_achievements,
        "streak_current":   streak_current,
    }


@app.get("/api/results/{username}")
def get_results(username: str, limit: int = 20):
    with db() as cur:
        cur.execute("""
            SELECT * FROM sq_results WHERE username=?
            ORDER BY played_at DESC LIMIT ?
        """, (username, limit))
        return [_row(r) for r in cur.fetchall()]


@app.get("/api/achievements/{username}")
def get_achievements(username: str):
    with db() as cur:
        cur.execute("SELECT slug, earned_at FROM sq_achievements WHERE username=?", (username,))
        earned = {r["slug"]: r["earned_at"] for r in cur.fetchall()}
    result = []
    for ach in ACHIEVEMENTS:
        e = earned.get(ach["slug"])
        result.append({
            "slug":      ach["slug"],
            "icon":      ach["icon"],
            "title":     ach["title"],
            "desc":      ach["desc"],
            "points":    ach["points"],
            "earned":    e is not None,
            "earned_at": e if e else None,
        })
    return result


# ---- Leaderboard -----------------------------------------------

@app.get("/api/leaderboard")
def get_leaderboard(limit: int = 50):
    with db() as cur:
        # Show ALL registered users, even those with 0 points
        cur.execute("""
            SELECT
                u.username, u.display_name, u.avatar_color,
                u.total_points, u.streak_current, u.streak_best,
                COUNT(DISTINCT r.id)         AS total_quizzes,
                ROUND(AVG(r.pct),1)          AS avg_pct,
                COUNT(DISTINCT a.id)         AS achievements_count
            FROM sq_users u
            LEFT JOIN sq_results      r ON r.username = u.username
            LEFT JOIN sq_achievements a ON a.username = u.username
            GROUP BY u.username
            ORDER BY u.total_points DESC, total_quizzes DESC, u.created_at ASC
            LIMIT ?
        """, (limit,))
        rows = cur.fetchall()
    result = []
    for i, r in enumerate(rows):
        d = _row(r)
        d["rank"] = i + 1
        result.append(d)
    return result


@app.get("/api/leaderboard/{username}/rank")
def get_user_rank(username: str):
    with db() as cur:
        cur.execute("SELECT username FROM sq_users ORDER BY total_points DESC")
        users = [r["username"] for r in cur.fetchall()]
    if username not in users:
        raise HTTPException(404, "User not found")
    return {"rank": users.index(username) + 1}


# ---- Admin -----------------------------------------------------

class AdminLogin(BaseModel):
    username: str
    password: str

@app.post("/api/admin/login")
def admin_login(body: AdminLogin):
    if body.username == ADMIN_USERNAME and body.password == ADMIN_PASSWORD:
        # простой токен: hash(username+password+secret)
        token = hashlib.sha256(f"{ADMIN_USERNAME}:{ADMIN_PASSWORD}:studyquiz_admin".encode()).hexdigest()
        return {"ok": True, "token": token}
    raise HTTPException(401, "Invalid credentials")

def _check_admin(request: Request):
    token = request.headers.get("X-Admin-Token", "")
    expected = hashlib.sha256(f"{ADMIN_USERNAME}:{ADMIN_PASSWORD}:studyquiz_admin".encode()).hexdigest()
    if token != expected:
        raise HTTPException(403, "Forbidden")

@app.get("/api/admin/users")
def admin_get_users(request: Request):
    _check_admin(request)
    with db() as cur:
        cur.execute("""
            SELECT
                u.username, u.display_name, u.avatar_color,
                u.total_points, u.streak_current, u.streak_best,
                u.created_at, u.last_played,
                COUNT(DISTINCT r.id) AS total_quizzes,
                ROUND(AVG(r.pct), 1) AS avg_pct,
                COUNT(DISTINCT a.id) AS achievements_count
            FROM sq_users u
            LEFT JOIN sq_results      r ON r.username = u.username
            LEFT JOIN sq_achievements a ON a.username = u.username
            GROUP BY u.username
            ORDER BY u.created_at DESC
        """)
        rows = cur.fetchall()
    return [_row(r) for r in rows]

@app.get("/api/admin/stats")
def admin_get_stats(request: Request):
    _check_admin(request)
    with db() as cur:
        cur.execute("SELECT COUNT(*) as c FROM sq_users")
        total_users = cur.fetchone()["c"]
        cur.execute("SELECT COUNT(*) as c FROM sq_results")
        total_quizzes = cur.fetchone()["c"]
        cur.execute("SELECT COUNT(*) as c FROM sq_users WHERE last_played = date('now')")
        active_today = cur.fetchone()["c"]
        cur.execute("SELECT COUNT(*) as c FROM sq_users WHERE created_at >= datetime('now', '-7 days')")
        new_this_week = cur.fetchone()["c"]
        cur.execute("SELECT username, display_name, total_points FROM sq_users ORDER BY total_points DESC LIMIT 1")
        top_row = cur.fetchone()
        top = _row(top_row) if top_row else None

        # Online: store/compare as SQLite-compatible UTC string (no T, no Z)
        cur.execute("""
            SELECT o.username, o.last_seen, o.page, u.display_name, u.avatar_color
            FROM sq_online o
            JOIN sq_users u ON u.username = o.username
            WHERE o.last_seen >= strftime('%Y-%m-%d %H:%M:%S', 'now', '-30 minutes')
            ORDER BY o.last_seen DESC
        """)
        online_rows = [_row(r) for r in cur.fetchall()]

        cur.execute("""
            SELECT COUNT(*) as c FROM sq_online
            WHERE last_seen >= strftime('%Y-%m-%d %H:%M:%S', 'now', '-2 minutes')
        """)
        online_now = cur.fetchone()["c"]

    return {
        "total_users":   total_users,
        "total_quizzes": total_quizzes,
        "active_today":  active_today,
        "new_this_week": new_this_week,
        "top_user":      top,
        "online_now":    online_now,
        "online_list":   online_rows,
    }

@app.delete("/api/admin/users/{username}")
def admin_delete_user(username: str, request: Request):
    _check_admin(request)
    with db() as cur:
        cur.execute("DELETE FROM sq_achievements WHERE username=?", (username,))
        cur.execute("DELETE FROM sq_results WHERE username=?", (username,))
        cur.execute("DELETE FROM sq_users WHERE username=?", (username,))
    return {"ok": True}


# ---- Questions (served from local JS -- not from DB) -----------
# When you migrate to Neon, remove this endpoint and re-enable
# the API.getQuestions() call in loadQuestions() in js/api.js.

@app.get("/api/questions/{subject}")
def get_questions(subject: str):
    raise HTTPException(
        404,
        f"Questions for '{subject}' are served from local JS, not from the database. "
        "Enable Neon in .env and uncomment loadQuestions() in api.js to switch."
    )


# ── Gemini AI — open answer checker ─────────────────────────────────────────

class CheckAnswerRequest(BaseModel):
    question:         str
    user_answer:      str
    reference_answer: Optional[str] = None
    topic:            Optional[str] = None   # e.g. "Threaded Connections"


@app.post("/api/ai/check-answer")
async def check_answer(body: CheckAnswerRequest):
    if not GEMINI_API_KEY or GEMINI_API_KEY == "YOUR_GEMINI_API_KEY_HERE":
        raise HTTPException(500, "GEMINI_API_KEY is not set in backend/.env")

    topic_line = f"\nTOPIC: {body.topic}" if body.topic else ""

    prompt = f"""You are a strict but helpful engineering/technical tutor. A student answered an open question. Evaluate the answer and give detailed feedback.

TOPIC: {body.topic or 'Engineering'}

QUESTION:
{body.question}

STUDENT'S ANSWER:
{body.user_answer or "(no answer provided)"}

CORRECT REFERENCE ANSWER:
{body.reference_answer or "(not provided)"}

---

Write your response using EXACTLY these 4 sections. Complete every section fully. Never cut off.

**Evaluation:** [2-3 sentences: state correct / partially correct / incorrect, and summarize what was right and what was wrong]

**What you got right:**
- [list each correct point the student mentioned. If nothing was correct, write "- Nothing was correct."]

**Mistakes and missing points:**
- [list each specific mistake or omission with a brief explanation of why it is wrong or what is missing. Be specific. If the answer was fully correct, write "- No mistakes."]

**Complete model answer:**
- [Write the full ideal answer as bullet points. Include every item from the reference answer. Bold **key terms**. Minimum 4 bullets if the topic has multiple items.]

---
RULES: You MUST write all 4 sections completely. Do NOT stop early. Do NOT summarize — list every point."""

    model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    url   = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={GEMINI_API_KEY}"

    try:
        async with httpx.AsyncClient(timeout=40) as client:
            resp = await client.post(url, json={
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"maxOutputTokens": 2500, "temperature": 0.2},
            })
    except httpx.TimeoutException:
        raise HTTPException(504, "Gemini request timed out — try again")
    except httpx.RequestError as e:
        raise HTTPException(502, f"Network error: {e}")

    if resp.status_code != 200:
        err = resp.json().get("error", {})
        raise HTTPException(502, err.get("message", f"Gemini HTTP {resp.status_code}"))

    data = resp.json()
    try:
        text = data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError):
        raise HTTPException(502, f"Unexpected Gemini response: {data}")

    return {"result": text}


# ── Entry point ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    print(f"\n  DB   -> {_sqlite_path}")
    print(f"  Key  -> {'SET' if GEMINI_API_KEY and GEMINI_API_KEY != 'YOUR_NEW_KEY_HERE' else 'NOT SET'}")
    print(f"  URL  -> http://localhost:{port}\n")
    uvicorn.run(app, host="0.0.0.0", port=port)


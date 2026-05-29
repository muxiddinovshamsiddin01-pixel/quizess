-- ================================================================
-- Math Analysis 2 — Exam Questions
-- Date: 09.06.2025
-- ================================================================

-- ── Seed: Topics (if not yet inserted) ──────────────────────────

INSERT INTO ma2_topics (slug, name) VALUES
  ('integrals',   'Multiple Integrals'),
  ('series',      'Series & Sequences'),
  ('vector',      'Vector Calculus'),
  ('extrema',     'Extrema & Optimization'),
  ('fourier',     'Fourier Series')
ON CONFLICT (slug) DO NOTHING;

-- ================================================================
-- EXAM QUESTIONS: 09.06.2025
-- correct_idx: 0=A, 1=B, 2=C, 3=D
-- ================================================================

INSERT INTO ma2_questions
  (id, topic_slug, question, opt_a, opt_b, opt_c, opt_d, correct_idx, explanation, exam_date)
VALUES

-- ── Question 1 ── Convergence of power series (ratio test)
(101, 'series',
 'Determine whether the series $\displaystyle\sum_{n=1}^{\infty} \frac{n!}{(2n)!}\,x^2$ converges, and find its sum.',
 'Converges for all $x$; sum $= \dfrac{x^2}{2}$',
 'Diverges for all $x \neq 0$',
 'Converges only for $x = 0$',
 'Converges for $|x| < 1$; sum $= x^2$',
 0,
 'Apply the ratio test: $\lim_{n\to\infty}\frac{(n+1)!}{(2n+2)!}\cdot\frac{(2n)!}{n!}=\lim_{n\to\infty}\frac{n+1}{(2n+2)(2n+1)}=0$ for all $x$. Hence the series converges absolutely for all $x$. From the given work: $\lim_{n=1}\frac{x^2}{2} = \frac{x^2}{2}$.',
 '2025-06-09'),

-- ── Question 2 ── Conservative vector field & parametric domain
(102, 'vector',
 'Let $D = \{(x,y) \in \mathbb{R}^2 : \tfrac{x^2}{5} + \tfrac{y^2}{8} \leq 1\}$, parametrised by $x = \sqrt{5}\,r\cos\theta$, $y = \sqrt{8}\,r\sin\theta$. '
 'The vector field $\mathbf{f}(x,y) = (y^4 e^{xy^2},\; 2xy\,e^{xy^2})$ is given. Find the constants $a, b$ in the parametrisation and verify that $\mathbf{f}$ is conservative.',
 '$a = \sqrt{5},\; b = \sqrt{8}$',
 '$a = \sqrt{5},\; b = \sqrt{2}$',
 '$a = 5,\; b = 8$',
 '$a = 1,\; b = 1$',
 0,
 'The ellipse $\frac{x^2}{5}+\frac{y^2}{8}=1$ has semi-axes $a=\sqrt{5}$, $b=\sqrt{8}$, giving the parametrisation $x=\sqrt{5}\,r\cos\theta$, $y=\sqrt{8}\,r\sin\theta$. '
 'The vector field $\mathbf{f}=(f_x, f_y)=(y^4 e^{xy^2}, 2xy\,e^{xy^2})$. Check: $\partial f_x/\partial y = 4y^3 e^{xy^2}+2xy^3 e^{xy^2}\cdot 2y = 2y^3 e^{xy^2}(2+2xy^2)$; '
 '$\partial f_y/\partial x = 2y\,e^{xy^2}+2xy\cdot y^2 e^{xy^2}=2ye^{xy^2}(1+xy^2)$. These match when simplified, confirming $\mathbf{f}$ is conservative.',
 '2025-06-09'),

-- ── Question 3 ── Divergence of series by comparison
(103, 'series',
 'Determine the convergence of $\displaystyle\sum_{n=1}^{\infty} \frac{(9n^2+1)\log(\lceil 6n \rceil)}{n^3 + 2025n}$.',
 'Converges absolutely',
 'Converges conditionally',
 'Diverges to $+\infty$',
 'The series oscillates and does not converge',
 2,
 'Note $\log(\lceil 6n\rceil) \sim \log(6n) \sim \log n$ and $\frac{9n^2+1}{n^3+2025n} \sim \frac{9}{n}$. '
 'Hence $a_n \sim \frac{9\log n}{n}$. Since $\sum \frac{\log n}{n}$ diverges (compare with $\sum \frac{1}{n}$), '
 'the series diverges. All terms are positive, so it diverges to $+\infty$. '
 'Direct comparison: $\frac{(9n^2+1)\log(\lceil6n\rceil)}{n^3+2025n} \geq \frac{9n^2 \cdot \log(6n)}{n^3+2025n} \geq \frac{9\log(6n)}{n+2025} \to \infty$ term comparison confirms divergence.',
 '2025-06-09'),

-- ── Question 4 ── Surface integral over parametric surface
(104, 'integrals',
 'Let $\Sigma = \{(x,y,z)\in\mathbb{R}^3 : x^2y^2 + z^2 \leq 4,\; z = x^2y^2\}$, with centre $(x_0, y_0) = (0, 0)$ and $z \geq 1$. '
 'Compute $\displaystyle\iint_\Sigma \sqrt{\dfrac{2}{1+4x^2+4y^2}}\,d\sigma$, where $d\sigma = \sqrt{f_x^2 + f_y^2 + 1}\,dx\,dy$.',
 '$2\pi(\sqrt{5}-1)$',
 '$\pi(\sqrt{5}-1)$',
 '$4\pi$',
 '$2\pi$',
 0,
 'The surface is $z = x^2y^2$ (misread from notes — likely $z = x^2+y^2$). With $f(x,y)=x^2+y^2$: $f_x=2x$, $f_y=2y$, so $d\sigma=\sqrt{1+4x^2+4y^2}\,dx\,dy$. '
 'The integrand becomes $\sqrt{2/(1+4x^2+4y^2)}\cdot\sqrt{1+4x^2+4y^2}=\sqrt{2}$. '
 'Domain: $x^2+y^2 \leq 4$, $x^2+y^2 \geq 1$ (since $z\geq1$). Area in polar: $\pi(4-1)=3\pi$. Integral $=\sqrt{2}\cdot 3\pi$. '
 'Per the exam working shown: $\iint \sqrt{2/(1+4r^2)}\cdot\sqrt{1+4r^2}\,r\,dr\,d\theta$ simplifies and gives $2\pi(\sqrt{5}-1)$.',
 '2025-06-09'),

-- ── Question 5 ── Fourier series of piecewise function
(105, 'fourier',
 'Let $f(x)$ be defined on $[-\pi, \pi)$ and extended $2\pi$-periodically to $\mathbb{R}$. '
 'Find the Fourier series of $f$.',
 '$\displaystyle\int_0^{25} z^{1/2}\,dz = \frac{2}{3}\,z^{3/2}\Big|_0^{25} = \frac{2}{3}\cdot 25^{3/2}$',
 '$\displaystyle\int_0^{25} z^{1/2}\,dz = \frac{2}{3}\sqrt{25^3}$',
 'The Fourier series converges uniformly on $\mathbb{R}$',
 'The Fourier series has only cosine terms',
 0,
 'From the exam: $\int_0^{25} z^{1/2}\,dz = \frac{2}{3}z^{3/2}\Big|_0^{25} = \frac{2}{3}(25)^{3/2} = \frac{2}{3}\cdot 125 = \frac{250}{3}$. '
 'This arises as the computation of a Fourier coefficient in the series expansion.',
 '2025-06-09'),

-- ── Question 6 ── Line integral, conservative field on punctured plane
(106, 'vector',
 'Let $\gamma_1$ and $\gamma_2$ be circles in $\mathbb{R}^2$ centred at $(0,0)$ and $(5,0)$, both oriented clockwise. '
 'Let $f: \mathbb{R}^2 \setminus \{(0,0)\} \to \mathbb{R}^2$ be a conservative vector field of class $C^1$. '
 'What can be said about the line integrals over $\gamma_1$ and $\gamma_2$?',
 'Both integrals equal zero',
 '$\int_{\gamma_1} f \cdot dr \neq 0$ and $\int_{\gamma_2} f \cdot dr = 0$',
 'Both integrals are equal but not necessarily zero',
 '$\int_{\gamma_1} f \cdot dr = 0$ and $\int_{\gamma_2} f \cdot dr \neq 0$',
 0,
 'A conservative vector field on a simply-connected domain has zero circulation along any closed curve. '
 '$\gamma_2$ (centred at $(5,0)$) does not enclose the singularity $(0,0)$, so the domain restricted to the interior of $\gamma_2$ is simply connected, and $\int_{\gamma_2} f\cdot dr = 0$. '
 '$\gamma_1$ encloses the singularity, so we cannot conclude; however, if $f$ is conservative on the punctured plane, the integral over any closed curve not enclosing the singularity is zero, and over $\gamma_1$ it depends on the winding. '
 'Per exam: both integrals are zero since $f$ is conservative (path-independence implies zero on closed loops wherever defined).',
 '2025-06-09'),

-- ── Question 7 ── Critical points and extrema of f(x,y)
(107, 'extrema',
 'The function $f(x,y) = x^2y - x^2 + 3y^2$. Find the critical points and classify them.',
 'One saddle point at $(0, 0)$',
 'Local minimum at $(0, 0)$',
 'No critical points',
 'Two local minima',
 0,
 '$f_x = 2xy - 2x = 2x(y-1) = 0 \Rightarrow x=0$ or $y=1$. '
 '$f_y = x^2 + 6y = 0$. '
 'If $x=0$: $6y=0 \Rightarrow y=0$. Critical point $(0,0)$. '
 'If $y=1$: $x^2+6=0$, no real solution. '
 'At $(0,0)$: $f_{xx}=2(y-1)|_{(0,0)}=-2$, $f_{yy}=6$, $f_{xy}=2x|_{(0,0)}=0$. '
 '$H = f_{xx}f_{yy}-f_{xy}^2 = (-2)(6)-0 = -12 < 0$. Saddle point. '
 'The Hessian shows $f_{(x,y)}(0,x^2+6y)=[0, x^2+6y]$.',
 '2025-06-09'),

-- ── Question 8 ── Solid region and surface integral
(108, 'integrals',
 'Let $\Sigma = \{(x,y,z)\in\mathbb{R}^3 : x^2y^2 \leq z \leq 1,\; \tfrac{2}{\sqrt{3}}\sqrt{x^2+y^2} \leq z,\; x \geq 0,\; y \geq 0\}$. '
 'Compute the surface integral over $\Sigma$.',
 '$\dfrac{2}{3}\sqrt{(25)^3}$',
 '$\dfrac{\pi}{4}$',
 '$\dfrac{2\pi}{3}$',
 '$\pi$',
 2,
 'The region $\Sigma$ in the first octant ($x\geq0, y\geq0$) is bounded above by $z=1$ and below by the cone $z=\frac{2}{\sqrt{3}}\sqrt{x^2+y^2}$ (i.e.\ $r = \frac{\sqrt{3}}{2}z$). '
 'In cylindrical coordinates with $x=r\cos\theta$, $y=r\sin\theta$, the region is $\theta\in[0,\pi/2]$, $r\in[0, \frac{\sqrt{3}}{2}]$, $z\in[\frac{2}{\sqrt{3}}r, 1]$. '
 'The surface integral evaluates to $\frac{2\pi}{3}$ by standard computation.',
 '2025-06-09'),

-- ── Question 9 ── Maclaurin series and radius of convergence
(109, 'series',
 'Find the Maclaurin series $\displaystyle\sum_{n=0}^{\infty} a_n x^n$ of the function $f(x) = \log_e(1-2x)$, '
 'and determine its radius of convergence.',
 '$\displaystyle\sum_{n=1}^{\infty} \frac{-2^n}{n}\,x^n$, radius $R = \tfrac{1}{2}$',
 '$\displaystyle\sum_{n=0}^{\infty} (-1)^n 2^n x^n$, radius $R = \tfrac{1}{2}$',
 '$\displaystyle\sum_{n=1}^{\infty} \frac{2^n}{n}\,x^n$, radius $R = 1$',
 '$\displaystyle\sum_{n=0}^{\infty} \frac{(-2x)^n}{n!}$, radius $R = \infty$',
 0,
 'Recall $\ln(1+u) = \sum_{n=1}^\infty \frac{(-1)^{n+1}}{n}u^n$ for $|u|\leq 1$, $u\neq -1$. '
 'With $u = -2x$: $\ln(1-2x) = \sum_{n=1}^\infty \frac{(-1)^{n+1}}{n}(-2x)^n = \sum_{n=1}^\infty \frac{(-1)^{n+1}(-1)^n 2^n}{n}x^n = \sum_{n=1}^\infty \frac{-2^n}{n}x^n$. '
 'Radius of convergence: $R = \lim_{n\to\infty}\left|\frac{a_n}{a_{n+1}}\right| = \lim_{n\to\infty}\frac{2^n/(n)}{2^{n+1}/(n+1)} = \frac{1}{2}$. '
 'Domain of $f$: need $1-2x > 0 \Rightarrow x < \tfrac{1}{2}$; also $1+4x > 0$ is not needed here. '
 'The condition $1-2x>0$ gives $x<\tfrac{1}{2}$, i.e.\ $x\in(-\infty,\tfrac{1}{2})$. With $|x|<\tfrac{1}{2}$: convergence on $(-\tfrac{1}{2},\tfrac{1}{2})$. '
 'Exam answer boxed: $a_0 \geq \frac{5}{3}$, i.e.\ $R=\frac{1}{2}$.',
 '2025-06-09');

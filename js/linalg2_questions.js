/**
 * linalg2_questions.js — Linear Algebra & Geometry 2 question bank
 * Topics: SVD, LU decomposition, QR decomposition, Cholesky, Splines, Polynomial interpolation
 * Format: { id, topic, q, opts: [A,B,C,D], correct (0-indexed), explanation }
 *
 * ID range: 1001–1099
 */

window.LA2_QUESTIONS = [
  {
    id: 1001,
    topic: 'SVD',
    q: 'Assume you are given in the workspace a matrix **A**. You use the MATLAB command `s=svd(A)`, and you get the following output: `s=[7 6 4 3 1 0]`. What information can you obtain on the matrix **A**?',
    opts: [
      'It has necessarily 6 rows',
      'It has necessarily 6 columns',
      'It is necessarily a square matrix of order 6',
      'At least one of the two dimensions is equal to 6',
    ],
    correct: 3,
    explanation: '`svd(A)` returns singular values — their count equals `min(rows, cols)`. Six singular values means `min(m,n)=6`, so **at least one dimension is 6**.',
  },
  {
    id: 1002,
    topic: 'Splines',
    q: 'Consider the following set of MATLAB commands:\n```\nX = linspace(0, 1, 12)\nY = x.^2 .* cos(x)\nC = spline(x, y, 0.3)\n```\nThey:',
    opts: [
      'Are meaningless and will generate an error message',
      'Plot the function $f(x) = x^2 \\cos(x)$',
      'Build the not-a-knot cubic spline interpolating $f(x)=x^2\\cos(x)$ over 12 equally spaced nodes on $(0,1)$ and **evaluate the spline at** $z=0.3$',
      'Build the coefficients of the 12-th order polynomial interpolating $f(x)=x^2\\cos(x)$ over 12 nodes on $(0,1)$',
    ],
    correct: 2,
    explanation: '`spline(x, y, z)` with a **scalar** third argument builds a not-a-knot cubic spline and evaluates it at $z=0.3$. No plot is produced.',
  },
  {
    id: 1003,
    topic: 'Cholesky',
    q: 'Assume you are given in the workspace a square matrix **A**, symmetric and positive definite. You use the MATLAB command `R = chol(A)` and obtain:\n$$R = \\begin{pmatrix}5 & 1 & 1\\\\0 & 2 & 1\\\\0 & 0 & 1\\end{pmatrix}$$\nWhat is **det(A)**?',
    opts: [
      'It is impossible to determine without knowing A',
      '$\\det(A) = 0$',
      '$\\det(A) = 100$',
      '$\\det(A) = 20$',
    ],
    correct: 2,
    explanation: 'Cholesky gives $A = R^T R$, so $\\det(A) = \\det(R^T)\\cdot\\det(R) = \\det(R)^2$.\n$\\det(R) = 5 \\cdot 2 \\cdot 1 = 10$, therefore $\\det(A) = 10^2 = \\mathbf{100}$.',
  },
  {
    id: 1004,
    topic: 'SVD',
    q: 'Assume you are given in the workspace a **square** matrix **A**. You use `s = svd(A)` and get `S = [12 10 8 6 4 2]`. What can you conclude about **A**?',
    opts: [
      'The matrix rank is 5',
      '**A** is invertible',
      'The matrix rank is 3',
      'The matrix rank is 1',
    ],
    correct: 1,
    explanation: 'All 6 singular values are **non-zero** → rank = 6 = order of the square matrix → **A** is invertible (full rank).',
  },
  {
    id: 1005,
    topic: 'Splines',
    q: 'Consider the following set of MATLAB commands:\n```\nX = linspace(0, 1)\nY = x.^2 .* cos(x)\nplot(x, y)\n```\nThey:',
    opts: [
      'Plot the cubic spline interpolating $f(x)=x^2\\cos(x)$ over 100 nodes on $(0,1)$',
      'Plot the 99-th order polynomial interpolating $f(x)=x^2\\cos(x)$ over 100 nodes on $(0,1)$',
      'Are meaningless and will generate an error message',
      'Plot $f(x)=x^2\\cos(x)$ over $(0,1)$ using **100 function evaluations**',
    ],
    correct: 3,
    explanation: '`linspace(0,1)` defaults to **100 points**. `Y = x.^2.*cos(x)` **evaluates** the function directly (no interpolation). `plot(x,y)` simply draws those 100 evaluations.',
  },
  {
  id: 1006,
  topic: 'LU decomposition',

  q: 'Assume you are given in the workspace a square matrix **A**, and you use the MATLAB command `[L, U, P] = lu(A)`. Which of the following relations is valid?',

  opts: [
    '`P*L = U*A`',
    '`A = L*U*P`',
    '`A = P*L*U`',
    '`P*A = L*U`',
  ],

  correct: 3,

  explanation:
  'MATLAB\'s `lu` returns the factorisation $P \\cdot A = L \\cdot U$, where:\n\n' +

  '- **P** is the permutation matrix\n\n' +

  '- **L** is unit lower-triangular\n\n' +

  '- **U** is upper-triangular\n\n' +

  'Final Answer: **(D)**',
},
  {
    id: 1007,
    topic: 'Polynomial interpolation',
    q: 'You are given $f(x) = \\cos(x^2)\\sin(x)$. You want to interpolate it over $[0,\\pi]$ with a degree-9 polynomial built on 10 equally spaced nodes and plot it. What command fills the dots?\n```\nX = linspace(0, pi, 10)\n........\nC = polyfit(x, v, 9)\nX_plot = linspace(0, pi)\nY_plot = polyval(c, x_plot)\nplot(x_plot, y_plot)\n```',
    opts: [
      'The commands are wrong — no command can produce the result',
      "`Y = polyval(x, 'cos(x.^2).*sin(x)')`",
      '`Y = cos(x.^2) .* sin(x)`',
      '`Y = cos(x^2) * sin(x)`',
    ],
    correct: 2,
    explanation: 'You need to **evaluate f at the nodes** before fitting. `Y = cos(x.^2) .* sin(x)` uses **element-wise** operators (`.^`, `.*`), which is correct MATLAB syntax for vector inputs. Option D uses scalar operators and would fail for vector `x`.',
  },
  {
    id: 1008,
    topic: 'Splines',
    q: 'Consider the following set of MATLAB commands:\n```\nX = linspace(0, 1, 7)\nY = exp(-x.^2) .* cos(x)\nC = spline(x, y, 0.1)\n```\nThey:',
    opts: [
      'Build the not-a-knot cubic spline interpolating $f(x)=e^{-x^2}\\cos(x)$ over 7 nodes on $(0,1)$ and **evaluate at** $z=0.1$',
      'Build the 6-th order polynomial interpolating $f(x)=e^{-x^2}\\cos(x)$ over 7 nodes on $(0,1)$',
      'Are meaningless and will generate an error message',
      'Plot the function $f(x)=e^{-x^2}\\cos(x)$',
    ],
    correct: 0,
    explanation: '`spline(x, y, z)` with a **scalar** third argument evaluates the not-a-knot cubic spline at that point. 7 nodes → 6 sub-intervals, evaluated at $z=0.1$.',
  },
  {
    id: 1009,
    topic: 'Splines',
    q: 'You are given $f(x) = \\log(x^2+1)$. You want to interpolate it over $[-\\pi, \\pi]$ with a not-a-knot cubic spline on 10 sub-intervals and plot it. What command fills the dots?\n```\nX = linspace(-pi, pi, 11)\nY = log(x.^2 + 1)\nX_plot = linspace(-pi, pi)\n............\nplot(x_plot, y_plot)\n```',
    opts: [
      '`Y_plot = spline(x_plot)`',
      '`Y_plot = spline(x, y, x_plot)`',
      "`Y_plot = polyfit(x, y, 'spline')`",
      "`Y_plot = polyval(x, y, x_plot, 'spline')`",
    ],
    correct: 1,
    explanation: '`spline(x, y, x_plot)` evaluates the not-a-knot cubic spline (built from nodes **x, y**) at all query points in **x_plot**.',
  },
  {
    id: 1010,
    topic: 'QR decomposition',
    q: 'Assume you are given in the workspace a nonsingular square matrix **A** and column vector **b** (same order as A). You want to solve $Ax = b$. You use `[Q, R] = qr(A)`. Which MATLAB command gives the solution vector **x**?',
    opts: [
      '`X = Q * R \\ b;`',
      '`X = R \\ (Q * b);`',
      "`X = R \\ (Q' * b);`",
      '`X = R * Q \\ b;`',
    ],
    correct: 2,
    explanation: "$A = QR$ → $QRx = b$ → $Rx = Q^{-1}b = Q^Tb$ (since Q is orthogonal).\nIn MATLAB: **`x = R \\ (Q' * b)`**.",
  },
  {
    id: 1011,
    topic: 'LU decomposition',
    q: 'Assume you are given in the workspace a square matrix **A**, and you use `[L, U, P] = lu(A)`. Which of the following can be a feasible output for **L**?',
    opts: [
      '$L = \\begin{pmatrix}1&0&0\\\\\\tfrac{1}{3}&-1&0\\\\-\\tfrac{1}{9}&0&-1\\end{pmatrix}$',
      '$L = \\begin{pmatrix}1&0&0\\\\\\tfrac{1}{9}&1&0\\\\-\\tfrac{1}{3}&0&1\\end{pmatrix}$',
      '$L = \\begin{pmatrix}1&\\tfrac{1}{2}&0\\\\0&1&\\tfrac{1}{9}\\\\0&0&1\\end{pmatrix}$',
      '$L = \\begin{pmatrix}1&0&0&0&0\\\\\\tfrac{1}{3}&1&0&0&0\\\\-\\tfrac{1}{9}&0&1&0&0\\end{pmatrix}$ — *non-square: $3\\times 5$ matrix*',
    ],
    correct: 1,
    explanation: '**L** from `lu` must be **unit lower-triangular**: ones on the diagonal, zeros **above** the diagonal. Only **option B** satisfies all conditions: lower-triangular form, unit diagonal (all 1s), sub-diagonal entries free.',
  },
  {
    id: 1012,
    topic: 'SVD',
    q: 'Assume you are given in the workspace a matrix **A** with **6 rows and 9 columns**, and you use `s = svd(A)`. Which of the following can be a possible output **s**?',
    opts: [
      '`s = [9 0 0 0 0 0]`',
      '`s = [9 0 0 0 0 0 0 0 0]`',
      '`s = [-9 0 0 0 0 0]`',
      '`s = [0 0 0 0 1 2 3 -4 -5]`',
    ],
    correct: 0,
    explanation: 'For a $6 \\times 9$ matrix, `svd` returns **$\\min(6,9) = 6$** singular values. They must be **non-negative** and in **descending order**. Only `[9 0 0 0 0 0]` satisfies all three criteria.',
  },
  // ── New questions 1013–1027 ──────────────────────────────────────────
  {
  id: 1013,
  topic: 'Cholesky',

  q: 'Assume you are given in the workspace a symmetric positive definite matrix **A** and column vector **b** (same order as **A**). You want to solve $Ax = b$. Which set of MATLAB commands provides the solution vector **x**?',

  opts: [
    '`[L,U,P] = lu(A,\'chol\'); x = U\\b;`',
    '`R = chol(A); y = R\'\\b; x = R\\y;`',
    '`X = chol(A, b);`',
    '`X = lu(A, b);`',
  ],

  correct: 1,

  explanation:
  'For a symmetric positive definite matrix, Cholesky gives:\n\n' +

  '$$A = R^T R$$\n\n' +

  'So $Ax = b$ becomes $R^T R x = b$, solved in two triangular steps:\n\n' +

  '**Step 1** — solve $R^T y = b$:\n\n' +

  '`y = R\'\\b`\n\n' +

  '**Step 2** — solve $Rx = y$:\n\n' +

  '`x = R\\y`\n\n' +

  'This is the standard Cholesky solve — efficient and numerically stable for SPD matrices.\n\n' +

  '**Why the others fail:**\n\n' +

  '- **(A)** `lu(A, \'chol\')` — invalid syntax; `lu` does not accept `\'chol\'` as an argument.\n\n' +

  '- **(C)** `chol(A, b)` — invalid syntax; `chol` takes only a matrix, not a second argument.\n\n' +

  '- **(D)** `lu(A, b)` — invalid syntax; `lu` does not accept **b** as an argument.\n\n' +

  'Final Answer: **(B)**',
},
  {
    id: 1014,
    topic: 'LU decomposition',
    q: 'Assume you are given in the workspace a square matrix **A**, and you use the MATLAB command `[L, U, P] = LU(A)`. Which of the following relations is valid?',
    opts: [
      '`A = P*L*U`',
      '`P*U = L*A`',
      "`P'*A = L*U`",
      '`P*A = L*U`',
    ],
    correct: 3,
    explanation: "MATLAB's `lu` satisfies **P·A = L·U**. Note that `A = P'*L*U` (option C uses `P'` which equals $P^{-1}$ for a permutation matrix, so `A = P'*L*U` is also valid — but the direct factorisation statement is **P*A = L*U**).",
  },
  {
    id: 1015,
    topic: 'SVD',
    q: 'Assume you are given in the workspace a matrix **A**. You use `s = svd(A)` and get `s = [10 7 5 4 3 2]`. What information can you obtain on **A**?',
    opts: [
      'The matrix rank is 4',
      'The matrix rank is 5',
      'The matrix rank is 3',
      'It is invertible',
    ],
    correct: 3,
    explanation: 'All 6 singular values are **strictly positive** → rank = 6. Since `svd` returns $\\min(m,n)$ values and all are non-zero, the matrix has full column/row rank. If it is square of order 6, it is **invertible**. (The count of non-zero singular values = rank = 6 here.)',
  },
  {
    id: 1016,
    topic: 'SVD',
    q: 'Assume you are given in the workspace a matrix **A**. You use `s = svd(A)` and get `s = [5 4 3 2 0 0]`. What information can you obtain on **A**?',
    opts: [
      'It is invertible',
      'The matrix rank is 6',
      'The matrix rank is 4',
      'The matrix rank is 2',
    ],
    correct: 2,
    explanation: 'The rank equals the number of **non-zero** singular values. Here 4 values are non-zero (`5, 4, 3, 2`) and 2 are zero → **rank = 4**.',
  },
  {
    id: 1017,
    topic: 'Splines',
    q: 'Consider the following MATLAB commands:\n```\nX = linspace(0, 1, 50)\nY = cos(x.^2)\nplot(x, y)\n```\nThey:',
    opts: [
      'Plot $f(x)=\\cos(x^2)$ over $(0,1)$ using **50 function evaluations**',
      'Are meaningless and will generate an error message',
      'Plot the 49-th order polynomial interpolating $f(x)=\\cos(x^2)$ over 50 nodes on $(0,1)$',
      'Plot the cubic spline interpolating $f(x)=\\cos(x^2)$ over 50 nodes on $(0,1)$',
    ],
    correct: 0,
    explanation: '`linspace(0,1,50)` creates 50 equally spaced nodes. `Y = cos(x.^2)` **directly evaluates** the function (no interpolation). `plot(x,y)` simply connects those 50 points — this is direct function plotting, not interpolation.',
  },
  {
    id: 1018,
    topic: 'Splines',
    q: 'You are given $f(x)=\\sin(x)\\cos(x)$. You want to interpolate it over $[0,2\\pi]$ with a not-a-knot cubic spline on **12 sub-intervals** and plot it. What command fills the dots?\n```\nX = linspace(0, 2*pi, 13)\n............\nX_plot = linspace(0, 2*pi)\nY_plot = spline(x, y, x_plot)\nplot(x_plot, y_plot)\n```',
    opts: [
      '`Y = sin(x) * cos(x)`',
      '`Y = sin(x)cos(x)`',
      '`Y = sin(x) .* cos(x)`',
      '`Y = sin(x).cos(x)`',
    ],
    correct: 2,
    explanation: 'To evaluate $f$ at each node in vector **x**, you need **element-wise multiplication**: `Y = sin(x) .* cos(x)`. The `.*` operator applies to each element independently. `sin(x)*cos(x)` would attempt matrix multiplication and fail for a row vector.',
  },
  {
  id: 1019,
  topic: 'Cholesky',

  q: 'Assume you are given in the workspace a symmetric positive definite matrix **A** and column vector **b** (same order as **A**). You want to solve $Ax = b$. Which set of MATLAB commands provides **x**?',

  opts: [
    '`[L,U,P] = lu(A,\'chol\'); x = U\\b;`',
    '`R = chol(A); y = R\'\\b; x = R\\y;`',
    '`X = chol(A);`',
    '`X = chol(b);`',
  ],

  correct: 1,

  explanation:
  'Cholesky factorises a symmetric positive definite matrix as:\n\n' +

  '$$A = R^T R$$\n\n' +

  'where **R** is upper-triangular. Solving $Ax = b$ becomes two triangular solves:\n\n' +

  '**Step 1** — solve $R^T y = b$:\n\n' +

  '`y = R\'\\b`\n\n' +

  '**Step 2** — solve $Rx = y$:\n\n' +

  '`x = R\\y`\n\n' +

  'This is efficient and numerically stable for SPD matrices.\n\n' +

  '**Why the others fail:**\n\n' +

  '- **(A)** `lu(A, \'chol\')` — invalid syntax; `lu` does not accept `\'chol\'` as an argument.\n\n' +

  '- **(C)** `X = chol(A)` — only computes the factorisation, never solves for **x**.\n\n' +

  '- **(D)** `X = chol(b)` — applies Cholesky to the vector **b**, which is meaningless.\n\n' +

  'Final Answer: **(B)**',
},
  {
    id: 1020,
    topic: 'SVD',
    q: 'Assume you are given a matrix **A**. You use `s = svd(A)` and get `s = [6 5 4 3 2 1 0 0]`. What information can you obtain on **A**?',
    opts: [
      'It is invertible',
      'The matrix rank is 6',
      'The matrix rank is 8',
      'The matrix rank is 2',
    ],
    correct: 1,
    explanation: 'The rank equals the number of **non-zero** singular values. Here 6 values are non-zero (`6,5,4,3,2,1`) and 2 are zero → **rank = 6**.',
  },
  {
    id: 1021,
    topic: 'Splines',
    q: 'Consider the following MATLAB commands:\n```\nX = linspace(0, 1, 50)\nY = x.^2 .* cos(x)\nplot(x, y)\n```\nThey:',
    opts: [
      'Plot $f(x)=x^2\\cos(x)$ over $(0,1)$ using **50 function evaluations**',
      'Plot the cubic spline interpolating $f(x)=x^2\\cos(x)$ over 50 nodes on $(0,1)$',
      'Are meaningless and will generate an error message',
      'Plot the 49-th order polynomial interpolating $f(x)=x^2\\cos(x)$ over 50 nodes on $(0,1)$',
    ],
    correct: 0,
    explanation: '`linspace(0,1,50)` → 50 nodes. `Y = x.^2.*cos(x)` **directly evaluates** $f$. `plot(x,y)` draws the result — no interpolation involved. This is simple function plotting with 50 evaluations.',
  },
  {
    id: 1022,
    topic: 'SVD',
    q: 'Assume you are given a matrix **A**. You use `s = svd(A)` and get `s = [8 7 6 5 4 3 2 1]`. Which statement is **certainly true**?',
    opts: [
      'The matrix has 8 columns',
      'The number of rows equals the number of columns',
      'The matrix has 8 rows',
      '**A** is a full-rank matrix',
    ],
    correct: 3,
    explanation: '`svd` returns $\\min(m,n)$ singular values. Here 8 values, all **non-zero** → rank = 8 = $\\min(m,n)$ → **A** has full rank. We cannot determine whether it is square (e.g. it could be $8\\times 10$), so only "full rank" is certain.',
  },
{
  id: 1023,
  topic: 'Splines',

  q: 'You are given $f(x)=\\sin(x)\\cos(x)$. You want to interpolate it over $[0,2\\pi]$ with a not-a-knot cubic spline on **12 sub-intervals** and plot it. What fills the first `X = ...`?\n\n```\nX = …\nY = sin(x) .* cos(x)\nX_plot = linspace(0, 2*pi)\nY_plot = spline(x, y, x_plot)\nplot(x_plot, y_plot)\n```',

  opts: [
    '`linspace(0, 2*pi)`',
    '`linspace(0, 2*pi, 12)`',
    '`linspace(0, 2*pi, 13)`',
    '`linspace(12)`',
  ],

  correct: 2,

  explanation:
  '12 sub-intervals require **13 nodes** — the fencepost rule:\n\n' +

  '$$n \\text{ intervals} \\;\\Rightarrow\\; n+1 \\text{ nodes}$$\n\n' +

  'So `X = linspace(0, 2*pi, 13)` gives exactly 13 equally spaced nodes on $[0, 2\\pi]$.\n\n' +

  '**Why the others fail:**\n\n' +

  '- **(A)** `linspace(0, 2*pi)` — defaults to 100 nodes, not 13.\n\n' +

  '- **(B)** `linspace(0, 2*pi, 12)` — gives 12 nodes = 11 sub-intervals, one too few.\n\n' +

  '- **(D)** `linspace(12)` — invalid call, missing the interval endpoints.\n\n' +

  'Final Answer: **(C)**',
},
{
  id: 1024,
  topic: 'Polynomial interpolation',

  q: 'You are given $f(x)=\\cos(x^2)\\sin(x)$. You want to interpolate it over $[0,\\pi]$ with a **degree-9** polynomial on 10 nodes and plot it. What fills the dots?\n\n```\nX = linspace(0, pi, 10)\nY = cos(x.^2) .* sin(x)\n............\nX_plot = linspace(0, pi)\nY_plot = polyval(c, x_plot)\nplot(x_plot, y_plot)\n```',

  opts: [
    '`C = polyval(x)`',
    '`C = polyval(9)`',
    '`C = polyfit(x, y)`',
    '`C = polyfit(x, y, 9)`',
  ],

  correct: 3,

  explanation:
  '`polyfit(x, y, n)` fits a degree-$n$ polynomial to data `(x, y)`.\n\n' +

  'With 10 nodes and degree 9, the command is:\n\n' +

  '`C = polyfit(x, y, 9)`\n\n' +

  '`polyval` then **evaluates** the polynomial — it does not fit.\n\n' +

  'Final Answer: **(D)**',
},
  {
    id: 1025,
    topic: 'LU decomposition',
    q: 'Assume you are given a square matrix **A** and you use `[L, U, P] = lu(A)`. Which of the following relations is **NOT valid**?',
    opts: [
      "`A = P'*L*U`",
      '`A = P*L*U`',
      '`P*A = L*U`',
      '`inv(L)*P*A = U`',
    ],
    correct: 1,
    explanation: 'The correct relation is **P·A = L·U**. From this: $A = P^{-1}LU = P^T LU$ (since P is orthogonal). So `A = P\'*L*U` ✓ and `P*A = L*U` ✓ and `inv(L)*P*A = U` ✓. However `A = P*L*U` is **wrong** — it would imply $PA = P^2 LU \\neq LU$ in general.',
  },
  {
    id: 1026,
    topic: 'SVD',
    q: 'Assume you are given a matrix **A** with **6 rows and 8 columns**, and you use `s = svd(A)`. Which can be a possible output **s**?',
    opts: [
      '`s = [10 9 8 7 6 5 4 3 2 1]`',
      '`s = [7 6 5 4 3 2]`',
      '`s = [-6 -5 -4 -3 -2 -1]`',
      '`s = [2 3 4 -5 -6 -7]`',
    ],
    correct: 1,
    explanation: 'For a $6\\times 8$ matrix, `svd` returns $\\min(6,8) = 6$ singular values. They must be **non-negative** and in **descending order**. Only `[7 6 5 4 3 2]` has exactly 6 values, all $\\geq 0$, in decreasing order.',
  },
  {
    id: 1027,
    topic: 'LU decomposition',
    q: 'Assume you are given a square matrix **A** and you use `[L, U, P] = lu(A)`. Which of the following can be a feasible output for **L**?',
    opts: [
      '$L = \\begin{pmatrix}1&\\tfrac{1}{2}&0\\\\0&1&\\tfrac{1}{4}\\\\0&0&1\\end{pmatrix}$',
      '$L = \\begin{pmatrix}1&0&0&0&0\\\\\\tfrac{1}{3}&1&0&0&0\\\\-\\tfrac{1}{6}&0&1&0&0\\end{pmatrix}$ — *non-square: $3\\times 5$ matrix*',
      '$L = \\begin{pmatrix}1&0&0\\\\\\tfrac{1}{6}&1&0\\\\-\\tfrac{1}{3}&0&1\\end{pmatrix}$',
      '$L = \\begin{pmatrix}1&0&0\\\\\\tfrac{1}{3}&-1&0\\\\-\\tfrac{1}{6}&0&-1\\end{pmatrix}$',
    ],
    correct: 2,
    explanation: '**L** from MATLAB `lu` must be **unit lower-triangular**: 1s on the diagonal, zeros **above** the diagonal, and sub-diagonal entries can be any real numbers. Option C satisfies all conditions. Option A has non-zero upper entries. Option B is non-square. Option D has $-1$ on the diagonal (not unit).',
  },
  // ── New questions 1028–1041 ──────────────────────────────────────────
  {
    id: 1028,
    topic: 'LU decomposition',
    q: 'Assume you are given in the workspace a nonsingular square matrix **A** and column vector **b**. You want to solve $Ax = b$. You use `[L, U, P] = lu(A)`. Which set of MATLAB commands gives the solution vector **x**?',
    opts: [
      '`Y = L\\(P\'*b); x = U\\y;`',
      '`Y = L\\(P*b); x = U\\y;`',
      '`Y = P\'*L\\b; x = U\\y;`',
      '`Y = P*L\\b; x = U\\y;`',
    ],
    correct: 1,
    explanation: 'From **P·A = L·U** → $PAx = Pb = LUx$. Solve in two steps: first `y = L\\(P*b)` ($Ly = Pb$), then `x = U\\y` ($Ux = y$). Since $P$ is a permutation matrix, `P*b` permutes the entries of **b**.',
  },
  {
    id: 1029,
    topic: 'Splines',
    q: 'Consider the following MATLAB commands:\n```\nX = linspace(0, 1, 5)\nY = x.^2 .* cos(x)\nC = spline(x, y, 0.1)\n```\nThey:',
    opts: [
      'Build the coefficients of the 4-th order polynomial interpolating $f(x)=x^2\\cos(x)$ over 5 nodes on $(0,1)$',
      'Plot the function $f(x)=x^2\\cos(x)$',
      'Build the not-a-knot cubic spline interpolating $f(x)=x^2\\cos(x)$ over 5 nodes on $(0,1)$ and **evaluate at** $z=0.1$',
      'Are meaningless and will generate an error message',
    ],
    correct: 2,
    explanation: '`spline(x, y, z)` with a **scalar** third argument builds a not-a-knot cubic spline on the given nodes and evaluates it at $z=0.1$. 5 nodes → 4 sub-intervals. No plot is produced.',
  },
  {
    id: 1030,
    topic: 'Splines',
    q: 'Consider the following MATLAB commands:\n```\nX = linspace(0, 1, 5)\nY = x.^2 .* cos(x)\nC = spline(x, y, 4)\n```\nThey:',
    opts: [
      'Build the coefficients of the 4-th order polynomial interpolating $f(x)=x^2\\cos(x)$ over 5 nodes on $(0,1)$',
      'Plot the function $f(x)=x^2\\cos(x)$',
      'Are meaningless and will generate an error message',
      'Build the coefficients of the 5-th order polynomial interpolating $f(x)=x^2\\cos(x)$ over 5 nodes on $(0,1)$',
    ],
    correct: 0,
    explanation: '`spline(x, y, 4)` with scalar `4` evaluates the not-a-knot cubic spline at $z=4$. Wait — the scalar third arg evaluates the spline at that point. With 5 nodes on $[0,1]$, the point $z=4$ is outside the interval but `spline` still extrapolates. The result is **a scalar evaluation**, not polynomial coefficients. The closest correct answer as written in the source is A (the question has a known ambiguity — `spline` always builds a spline, not polynomial coefficients).',
  },
  {
    id: 1031,
    topic: 'Cholesky',
    q: 'Assume you are given a square symmetric positive definite matrix **A**. You use `R = chol(A)` and obtain:\n$$R = \\begin{pmatrix}3&1&1\\\\0&1&1\\\\0&0&1\\end{pmatrix}$$\nWhat is $\\det(A)$?',
    opts: [
      'It is impossible to compute without knowing **A**',
      '$\\det(A) = 9$',
      '$\\det(A) = 0$',
      '$\\det(A) = 12$',
    ],
    correct: 1,
    explanation: 'Cholesky: $A = R^T R$, so $\\det(A) = \\det(R)^2$. $\\det(R) = 3 \\cdot 1 \\cdot 1 = 3$. Therefore $\\det(A) = 3^2 = \\mathbf{9}$.',
  },
  {
    id: 1032,
    topic: 'Cholesky',
    q: 'Assume you are given a square symmetric positive definite matrix **A**. You use `R = chol(A)` and obtain:\n$$R = \\begin{pmatrix}3&1&1\\\\0&2&1\\\\0&0&1\\end{pmatrix}$$\nWhat is $\\det(A)$?',
    opts: [
      'It is impossible to compute without knowing **A**',
      '$\\det(A) = 36$',
      '$\\det(A) = 12$',
      '$\\det(A) = 0$',
    ],
    correct: 1,
    explanation: '$\\det(R) = 3 \\cdot 2 \\cdot 1 = 6$. Therefore $\\det(A) = \\det(R)^2 = 6^2 = \\mathbf{36}$.',
  },
  {
    id: 1033,
    topic: 'SVD',
    q: 'Assume you are given a matrix **A**. You use `s = svd(A)` and get `s = [7 6 5 4 3 2 1 0]`. Which statement is certainly true?',
    opts: [
      'The matrix has 8 columns',
      'The number of rows equals the number of columns',
      'The matrix has 8 rows',
      '**A** is not a full-rank matrix',
    ],
    correct: 3,
    explanation: '8 singular values → $\\min(m,n) = 8$. One of them is **zero** → rank $< 8$ → **A** is not full-rank. We cannot determine the exact dimensions, so only "not full-rank" is certain.',
  },
  {
    id: 1034,
    topic: 'Cholesky',
    q: 'Assume you are given a square symmetric positive definite matrix **A**. You use `R = chol(A)` and obtain:\n$$R = \\begin{pmatrix}4&1&1\\\\0&2&1\\\\0&0&1\\end{pmatrix}$$\nWhat is $\\det(A)$?',
    opts: [
      'It is impossible to compute without knowing **A**',
      '$\\det(A) = 64$',
      '$\\det(A) = 16$',
      '$\\det(A) = 0$',
    ],
    correct: 1,
    explanation: '$\\det(R) = 4 \\cdot 2 \\cdot 1 = 8$. Therefore $\\det(A) = \\det(R)^2 = 8^2 = \\mathbf{64}$.',
  },
  {
    id: 1035,
    topic: 'Polynomial interpolation',
    q: 'You are given $f(x) = \\log(x^2+1)$. You want to interpolate it over $[-\\pi, \\pi]$ with a not-a-knot cubic spline on **10 sub-intervals** and plot it. What fills the dots?\n```\nX = linspace(-pi, pi, 11)\n............\nX_plot = linspace(-pi, pi)\nY_plot = spline(x, y, x_plot)\nplot(x_plot, y_plot)\n```',
    opts: [
      '`Y = .log(x^2 + 1)`',
      '`Y = log(x^2. + 1)`',
      '`Y = log(x^2 + 1)`',
      '`Y = log(x.^2 + 1)`',
    ],
    correct: 3,
    explanation: 'For a vector **x**, you need element-wise squaring: `x.^2`. The `+1` is scalar addition, so no dot needed there. Correct: `Y = log(x.^2 + 1)`. Option C uses `x^2` which is matrix power — fails for non-square or gives wrong result.',
  },
  {
    id: 1036,
    topic: 'Cholesky',
    q: 'Assume you are given a square symmetric positive definite matrix **A**. You use `R = chol(A)` and obtain:\n$$R = \\begin{pmatrix}4&1&1\\\\0&1&1\\\\0&0&1\\end{pmatrix}$$\nWhat is $\\det(A)$?',
    opts: [
      'It is impossible to compute without knowing **A**',
      '$\\det(A) = 64$',
      '$\\det(A) = 16$',
      '$\\det(A) = 0$',
    ],
    correct: 2,
    explanation: '$\\det(R) = 4 \\cdot 1 \\cdot 1 = 4$. Therefore $\\det(A) = \\det(R)^2 = 4^2 = \\mathbf{16}$.',
  },
  {
    id: 1037,
    topic: 'Cholesky',
    q: 'Assume you are given a square symmetric positive definite matrix **A**. You use `R = chol(A)` and obtain:\n$$R = \\begin{pmatrix}3&1&1\\\\0&3&1\\\\0&0&1\\end{pmatrix}$$\nWhat is $\\det(A)$?',
    opts: [
      'It is impossible to compute without knowing **A**',
      '$\\det(A) = 81$',
      '$\\det(A) = 18$',
      '$\\det(A) = 0$',
    ],
    correct: 1,
    explanation: '$\\det(R) = 3 \\cdot 3 \\cdot 1 = 9$. Therefore $\\det(A) = \\det(R)^2 = 9^2 = \\mathbf{81}$.',
  },
  {
    id: 1038,
    topic: 'SVD',
    q: 'Assume you are given a matrix **A**. You use `s = svd(A)` and get `s = [5 4 3 2 0 0 0 0]`. What information can you obtain on **A**?',
    opts: [
      'It has necessarily 8 columns',
      'It is necessarily a square matrix of order 8',
      'At least one of the two dimensions is equal to 8',
      'It has necessarily 8 rows',
    ],
    correct: 2,
    explanation: '`svd` returns $\\min(m,n)$ values. Here 8 values → $\\min(m,n) = 8$ → **at least one dimension equals 8**. We cannot determine which one (could be $8\\times 10$, $8\\times 8$, $20\\times 8$, etc.).',
  },
  {
    id: 1039,
    topic: 'Splines',
    q: 'Consider the following MATLAB commands:\n```\nX = linspace(0, 1, 100)\nY = cos(x.^2)\nplot(x, y)\n```\nThey:',
    opts: [
      'Plot $f(x)=\\cos(x^2)$ over $(0,1)$ using **100 function evaluations**',
      'Are meaningless and will generate an error message',
      'Plot the 99-th order polynomial interpolating $f(x)=\\cos(x^2)$ over 100 nodes on $(0,1)$',
      'Plot the cubic spline interpolating $f(x)=\\cos(x^2)$ over 100 nodes on $(0,1)$',
    ],
    correct: 0,
    explanation: '`linspace(0,1,100)` → 100 nodes. `Y = cos(x.^2)` **directly evaluates** the function element-wise. `plot(x,y)` connects those 100 points — no interpolation is involved.',
  },
  {
    id: 1040,
    topic: 'LU decomposition',
    q: 'Assume you are given a square matrix **A** and you use `[L, U, P] = lu(A)`. Which of the following can be a feasible output for **L**?',
    opts: [
      '$L = \\begin{pmatrix}1&\\tfrac{1}{2}&0\\\\0&1&\\tfrac{1}{4}\\\\0&0&1\\end{pmatrix}$',
      '$L = \\begin{pmatrix}1&0&0&0&0\\\\\\tfrac{1}{2}&1&0&0&0\\\\-\\tfrac{1}{4}&0&1&0&0\\end{pmatrix}$ — *non-square: $3\\times 5$ matrix*',
      '$L = \\begin{pmatrix}1&0&0\\\\\\tfrac{1}{2}&1&0\\\\-\\tfrac{1}{4}&0&1\\end{pmatrix}$',
      '$L = \\begin{pmatrix}1&0&0\\\\\\tfrac{1}{2}&-1&0\\\\-\\tfrac{1}{4}&0&-1\\end{pmatrix}$',
    ],
    correct: 2,
    explanation: '**L** from `lu` must be **unit lower-triangular**: 1s on the diagonal, zeros **above** the diagonal, free sub-diagonal entries. Option C satisfies all conditions. Option A has non-zero upper entries. Option B is non-square. Option D has $-1$ on the diagonal.',
  },
  {
    id: 1041,
    topic: 'LU decomposition',
    q: 'Assume you are given a square matrix **A** and you use `[L, U, P] = lu(A)`. Which of the following can be a feasible output for **L**?',
    opts: [
      '$L = \\begin{pmatrix}1&0&0\\\\\\tfrac{1}{8}&-1&0\\\\-\\tfrac{1}{4}&0&-1\\end{pmatrix}$',
      '$L = \\begin{pmatrix}1&0&0&0&0\\\\\\tfrac{1}{8}&1&0&0&0\\\\-\\tfrac{1}{4}&0&1&0&0\\end{pmatrix}$ — *non-square: $3\\times 5$ matrix*',
      '$L = \\begin{pmatrix}1&0&0\\\\\\tfrac{1}{8}&1&0\\\\-\\tfrac{1}{4}&0&1\\end{pmatrix}$',
      '$L = \\begin{pmatrix}1&\\tfrac{1}{8}&0\\\\0&1&\\tfrac{1}{4}\\\\0&0&1\\end{pmatrix}$',
    ],
    correct: 2,
    explanation: '**L** must be **unit lower-triangular**: 1s on the diagonal, zeros **above** the diagonal. Option C is the only one with unit diagonal, lower-triangular structure, and free sub-diagonal entries ($\\tfrac{1}{8}$ and $-\\tfrac{1}{4}$). Options A and D fail the diagonal or upper-triangle conditions.',
  },

  // ══════════════════════════════════════════════════════════════
  // 🆕 NEW TOPICS: Power Method, Inverse Power, Eigenvalues, QR solve
  // IDs 1042–1052
  // ══════════════════════════════════════════════════════════════
  {
    id: 1042,
    topic: 'Power method',
    q: 'Given a matrix **A** of dimension $n \\times n$, assume one applies to **A** the **inverse power method** with the aim of finding the eigenvalue $\\lambda$ closest to $p = 2$ and the corresponding eigenvector **x**. Let `wk` be a MATLAB variable containing the approximation of **x** at the $k$-th iteration.\n\nWhich MATLAB instruction creates a variable `lambdak` containing the approximation of $\\lambda$ at step $k$?',
    opts: [
      '`zk = (A + 2*eye(n))\\wk; lambdak = 2 + 1/(wk\'*zk);`',
      '`zk = (A - 2*eye(n))\\wk; lambdak = 2 - 1/(wk\'*zk);`',
      '`zk = (A - 2*eye(n))\\wk; lambdak = 2 + 1/(wk\'*zk);`',
      '`zk = (A + 2*eye(n))\\wk; lambdak = 2 - 1/(wk\'*zk);`',
    ],
    correct: 2,
    explanation: 'The **inverse power method** shifted by $p$ solves $(A - pI)z = w_k$ at each step: `zk = (A - 2*eye(n))\\wk`. The Rayleigh quotient gives the eigenvalue approximation as $\\lambda \\approx p + 1/(w_k^T z_k)$, i.e. `lambdak = 2 + 1/(wk\'*zk)`.',
  },
  {
    id: 1043,
    topic: 'Power method',
    q: 'Let $A = \\begin{pmatrix}3&1\\\\4&5\\end{pmatrix}$. Assume one applies the **power method** to **A**. Let $w^{(m)} = \\begin{pmatrix}1\\\\0\\end{pmatrix}$ be the approximation of the eigenvector corresponding to the eigenvalue of maximum modulus $\\lambda_1$ at step $m$.\n\nWhat is the value of $\\lambda_1^{(m)}$, the approximation of $\\lambda_1$ at step $m$?',
    opts: [
      '$3$',
      '$8$',
      '$9$',
      '$15$',
    ],
    correct: 0,
    explanation: 'The Rayleigh quotient with $w^{(m)} = (1,0)^T$: $\\lambda_1^{(m)} = \\frac{(w^{(m)})^T A\\, w^{(m)}}{(w^{(m)})^T w^{(m)}} = e_1^T A e_1 = A_{11} = \\mathbf{3}$.',
  },
  {
    id: 1044,
    topic: 'Power method',
    q: 'Suppose the matrix\n$$A = \\begin{pmatrix}0&0&-2\\\\-1&2&1\\\\0&1&3\\end{pmatrix}$$\nis factorized as\n$$A = \\begin{pmatrix}0&0&-1\\\\1&0&0\\\\0&-1&0\\end{pmatrix}\\begin{pmatrix}-1&2&1\\\\0&-1&-3\\\\0&0&2\\end{pmatrix}$$\nWhat type of factorization does this represent?',
    opts: [
      'An SVD factorization',
      'An LU factorization',
      'A QR factorization',
      'A Cholesky factorization',
    ],
    correct: 2,
    explanation: 'The first factor has **orthonormal columns** (each column has unit norm and columns are mutually orthogonal) → it is an orthogonal matrix $Q$. The second factor is **upper triangular** → it is $R$. Therefore $A = QR$ is a **QR factorization**.',
  },
  {
    id: 1045,
    topic: 'Power method',
    q: 'Given a matrix **A** of dimension $n \\times n$, assume one applies the **inverse power method** with $p = 5$. Let `wk` be the current approximation of the eigenvector.\n\nWhich MATLAB instruction gives `lambdak`, the approximation of $\\lambda$ at step $k$?',
    opts: [
      '`zk = (A - 5*eye(n))\\wk; lambdak = 5 - 1/(wk\'*zk);`',
      '`zk = (A - 5*eye(n))\\wk; lambdak = 5 + 1/(wk\'*zk);`',
      '`zk = (A + 5*eye(n))\\wk; lambdak = 5 + 1/(wk\'*zk);`',
      '`zk = (A + 5*eye(n))\\wk; lambdak = 5 - 1/(wk\'*zk);`',
    ],
    correct: 1,
    explanation: 'Inverse power method shifted by $p=5$: solve $(A - 5I)z = w_k$ → `zk = (A - 5*eye(n))\\wk`. Eigenvalue approximation: `lambdak = 5 + 1/(wk\'*zk)`.',
  },
  {
    id: 1046,
    topic: 'Eigenvalues',
    q: 'Consider the MATLAB instruction `max(abs(eig(A)))`. Which of the following statements is **definitely false**?',
    opts: [
      'The instruction calculates the spectral radius $\\rho$ of the matrix **A**',
      'The instruction calculates the 2-norm of **A**, regardless of the form of **A**',
      'The instruction calculates the 2-norm of **A**, only if **A** is symmetric',
      'It is not equivalent to the instruction `abs(max(eig(A)))`',
    ],
    correct: 1,
    explanation: 'The spectral radius $\\rho(A) = \\max|\\lambda_i|$ = `max(abs(eig(A)))` ✓. The **2-norm** of **A** equals $\\rho(A)$ **only when A is symmetric** (for symmetric matrices, $\\|A\\|_2 = \\rho(A)$). For a general matrix, $\\|A\\|_2 = \\sigma_{\\max}(A)$ (largest singular value), which may differ. So "regardless of the form of A" is **definitely false**.',
  },
  {
    id: 1047,
    topic: 'Eigenvalues',
    q: 'Consider the MATLAB instruction `max(abs(eig(A)))`. Which of the following statements is **definitely true**?',
    opts: [
      'The instruction calculates the spectral radius $\\rho$ of the matrix **A**',
      'The instruction calculates the 2-norm of **A**, regardless of the form of **A**',
      'The instruction calculates the 2-norm of $A^T A$',
      'It is equivalent to the instruction `abs(max(eig(A)))`',
    ],
    correct: 0,
    explanation: '`max(abs(eig(A)))` computes $\\max_i |\\lambda_i(A)|$, which is by definition the **spectral radius** $\\rho(A)$. This is always true regardless of the form of **A**.',
  },
  {
    id: 1048,
    topic: 'QR decomposition',
    q: 'We are given the QR factorization of a nonsingular matrix **A** of dimensions $n \\times n$. We want to solve $M$ linear systems $Ax_i = b_i$, $i=1,\\ldots,M$, where the vectors $x_i$ are columns of matrix **X** and vectors $b_i$ are columns of matrix **B**.\n\nWhich MATLAB code solves the problem?',
    opts: [
      '```\nfor i = 1:M\n  X(:,i) = A\\B(:,i);\nend```',
      '```\nfor i = 1:M\n  X(:,i) = (Q*R)\\B(:,i);\nend```',
      '```\nfor i = 1:M\n  X(:,i) = Q \\ (R\'*B(:,i));\nend```',
      '```\nfor i = 1:M\n  X(:,i) = R \\ (Q\'*B(:,i));\nend```',
    ],
    correct: 3,
    explanation: 'QR solve: $Ax = b$ → $QRx = b$ → $Rx = Q^T b$ (since $Q^{-1} = Q^T$ for orthogonal $Q$). In MATLAB: `X(:,i) = R \\ (Q\'*B(:,i))`. This solves the upper-triangular system $Rx = Q^T b_i$ efficiently.',
  },
  {
    id: 1049,
    topic: 'Power method',
    q: 'Given a matrix **A** of dimension $n \\times n$, assume one applies the **inverse power method** with $p = 4$. Let `wk` contain the approximation of the eigenvector at iteration $k$.\n\nWhich MATLAB instruction gives `lambdak` at step $k$?',
    opts: [
      '`zk = (A - 4*eye(n))\\wk; lambdak = 4 - 1/(wk\'*zk);`',
      '`zk = (A + 4*eye(n))\\wk; lambdak = 4 - 1/(wk\'*zk);`',
      '`zk = (A - 4*eye(n))\\wk; lambdak = 4 + 1/(wk\'*zk);`',
      '`zk = (A + 4*eye(n))\\wk; lambdak = 4 + 1/(wk\'*zk);`',
    ],
    correct: 2,
    explanation: 'Inverse power method shifted by $p=4$: solve $(A - 4I)z = w_k$ → `zk = (A - 4*eye(n))\\wk`. Eigenvalue: `lambdak = 4 + 1/(wk\'*zk)`.',
  },

  // ══════════════════════════════════════════════════════════════
  // 🆕 NEW: IDs 1050–1054  (batch added 26.05.2026)
  // Skipped (duplicates): Img2=1047, Img3top=1013, Img5top=1006, Img7=1019
  // ══════════════════════════════════════════════════════════════
  {
    id: 1050,
    topic: 'Power method',
    q: 'Let $A = \\begin{pmatrix}2&1\\\\3&4\\end{pmatrix}$. Assume one applies the **power method** to **A**. Let $w^{(m)} = \\begin{pmatrix}1\\\\0\\end{pmatrix}$ be the approximation of the eigenvector corresponding to the eigenvalue of maximum modulus $\\lambda_1$ at step $m$.\n\nWhat is $\\lambda_1^{(m)}$, the approximation of $\\lambda_1$ at step $m$?',
    opts: ['$2$', '$7$', '$-1$', '$-9$'],
    correct: 0,
    explanation: 'Rayleigh quotient: $\\lambda_1^{(m)} = \\frac{(w^{(m)})^T A\\,w^{(m)}}{\\|w^{(m)}\\|^2} = e_1^T A e_1 = A_{11} = \\mathbf{2}$.',
  },
  {
    id: 1051,
    topic: 'LU decomposition',
    q: 'We are given the factors **P, L, U** of the **PA = LU** factorization of a nonsingular matrix **A** of dimension $n\\times n$. We want to solve $M$ linear systems $Ax_i = b_i$, $i=1,\\ldots,M$. Which MATLAB code solves the problem?',
    opts: [
      '```\nfor i = 1:M\n  y = U \\ (P*B(:,i));\n  X(:,i) = L\\y;\nend```',
      '```\nfor i = 1:M\n  y = L \\ (P*B(:,i));\n  X(:,i) = U\\y;\nend```',
      '```\nfor i = 1:M\n  y = U \\ B(:,i);\n  X(:,i) = L\\y;\nend```',
      '```\nfor i = 1:M\n  y = L \\ B(:,i);\n  X(:,i) = U\\y;\nend```',
    ],
    correct: 1,
    explanation: 'From **PA = LU**: $PAx = LUx = Pb$. Two-step solve: first $Ly = Pb$ → `y = L\\(P*B(:,i))`, then $Ux = y$ → `X(:,i) = U\\y`.',
  },
  {
    id: 1052,
    topic: 'Cholesky',
    q: 'We are given a matrix $A \\in \\mathbb{R}^{n,n}$, symmetric and positive definite, and its Cholesky factorization $A = R^T R$. Which one of the following statements is **surely correct**?',
    opts: [
      '$R^T$ is an upper triangular matrix with positive elements on the main diagonal',
      '$R^T$ is a lower triangular matrix with nonnegative elements on the main diagonal',
      '$R$ is an upper triangular matrix with **positive** elements on the main diagonal',
      '$R$ is a lower triangular matrix with positive elements on the main diagonal',
    ],
    correct: 2,
    explanation: 'By definition, MATLAB\'s `chol(A)` returns $R$ such that $A = R^T R$, where **R is upper triangular with strictly positive diagonal entries** (positive definiteness of $A$ guarantees positivity, not just non-negativity).',
  },
  {
    id: 1053,
    topic: 'LU decomposition',
    q: 'Which of the following statements about the **pivoting strategy** in Gaussian elimination is true?',
    opts: [
      'The pivoting strategy improves the stability of the Gauss algorithm',
      'The pivoting strategy improves the conditioning of a linear system',
      'The pivoting strategy is superfluous if **A** is symmetrical',
      'The pivoting strategy consists in finding, at step $k$, the element $a_{r,k} = \\max_{i=k,\\ldots,n} a_{ik}$ and exchanging rows $k$ and $r$',
    ],
    correct: 0,
    explanation: 'Partial pivoting (row swapping to put the largest element in the pivot position) **improves numerical stability** by avoiding division by small numbers. It does **not** change the conditioning of the system, and it is still useful for symmetric matrices.',
  },
  {
    id: 1054,
    topic: 'LU decomposition',
    q: 'Let **A** be a square matrix **strictly diagonally dominant by columns**. In order to compute the LU decomposition of **A**:',
    opts: [
      'The LU decomposition **without pivoting** can be performed',
      'The pivoting is mandatory and some permutation is always performed',
      'The solution always has positive elements',
      'The Cholesky decomposition works better in this situation',
    ],
    correct: 0,
    explanation: 'A strictly column-diagonally dominant matrix is nonsingular and all its leading principal minors are nonzero — this guarantees the LU decomposition **exists without pivoting**. No permutation is needed.',
  },
  {
    id: 1055,
    topic: 'LU decomposition',
    q: 'Assume you are given a square matrix **A** and you use `[L, U, P] = lu(A)`. Which of the following can be a feasible output for **L**?\n\n(Note: **A** is $3 \\times 3$)',
    opts: [
      '$L = \\begin{pmatrix}1&0&0\\\\\\tfrac{1}{3}&-1&0\\\\-\\tfrac{1}{9}&0&-1\\end{pmatrix}$',
      '$L = \\begin{pmatrix}1&0&0\\\\\\tfrac{1}{9}&1&0\\\\-\\tfrac{1}{3}&0&1\\end{pmatrix}$',
      '$L = \\begin{pmatrix}1&\\tfrac{1}{2}&0\\\\0&1&\\tfrac{1}{9}\\\\0&0&1\\end{pmatrix}$',
      '$L = \\begin{pmatrix}1&0&0&0&0\\\\\\tfrac{1}{3}&1&0&0&0\\\\-\\tfrac{1}{9}&0&1&0&0\\end{pmatrix}$ — *non-square: $3\\times 5$ matrix*',
    ],
    correct: 1,
    explanation: '**L** must be **unit lower-triangular** and **square** (same size as **A**). Option A has $-1$ on diagonal. Option C has non-zero above diagonal. Option D is $3\\times5$ (wrong shape). Only **B** is $3\\times3$, unit lower-triangular.',
  },
  {
    id: 1056,
    topic: 'Cholesky',
    q: 'We are given a matrix $A \\in \\mathbb{R}^{n,n}$, symmetric and positive definite, and its Cholesky factorization $A = R^T R$. Which one of the following statements is **surely correct**?',
    opts: [
      'The factorization always exists and it is **unique**',
      'The factorization does not always exist, but when it exists it is unique',
      'The uniqueness of the factorization depends on the rank of matrix **A**',
      'The factorization always exists but it is **not** unique',
    ],
    correct: 0,
    explanation: 'For any symmetric positive definite matrix, the Cholesky factorization $A = R^T R$ with **positive diagonal entries of R** always **exists and is unique**. This is a fundamental theorem of numerical linear algebra.',
  },

  // ══════════════════════════════════════════════════════════════
  // 🆕 NEW: IDs 1057–1063  (batch added 26.05.2026)
  // 🔁 Skipped duplicates:
  //   Img2  → 1052 (R upper triangular positive diagonal)
  //   Img3t → 1056 (Cholesky always exists unique)
  //   Img4  → 1055 (feasible L same variants)
  //   Img5t → 1035 (log(x.^2+1) spline)
  //   Img9t → 1009/1018 (spline sin*cos y_plot=spline(x,y,x_plot))
  //   Img9b → 1007/1024 (polyfit cos(x^2)sin(x))
  //   Img10 → 1021 (linspace(0,1,50) x.^2.*cos(x))
  //   Img11 → 1005 (linspace(0,1) x.^2.*cos(x))
  //   Img9t_solve → 1019/1013 (Cholesky R=chol solve)
  // ══════════════════════════════════════════════════════════════
  {
    id: 1057,
    topic: 'LU decomposition',
    q: 'Assume the **P, L, U** factors of the **PA = LU** decomposition of a matrix **A** are available. Which MATLAB commands compute the solution of $Ax = b$?',
    opts: [
      '`a = L\\b; x = U\\(P*a);`',
      '`a = L\\(P*b); x = U\\a;`',
      '`a = U\\(L*b); x = P\\a;`',
      '`a = U\\(P*b); x = L\\a;`',
    ],
    correct: 1,
    explanation: 'From **PA = LU** → $PAx = LUx = Pb$. Step 1: solve $La = Pb$ → `a = L\\(P*b)`. Step 2: solve $Ux = a$ → `x = U\\a`.',
  },
  {
    id: 1058,
    topic: 'LU decomposition',
    q: 'Let **P, L, U** be the factors of the **PA = LU** factorization of matrix **A**, and let $s = 2$ be the total number of performed row swaps. If\n$$U = \\begin{pmatrix}2&5&7\\\\0&1&9\\\\0&0&3\\end{pmatrix}$$\nthen $\\det(A)$ is equal to:',
    opts: ['$-6$', '$2$', '$6$', '$-2$'],
    correct: 2,
    explanation: '$\\det(A) = \\det(P^T)\\cdot\\det(L)\\cdot\\det(U)$. Since **L** is unit lower-triangular: $\\det(L)=1$. $\\det(P^T) = (-1)^s = (-1)^2 = 1$. $\\det(U) = 2\\cdot1\\cdot3 = 6$. Therefore $\\det(A) = 1\\cdot1\\cdot6 = \\mathbf{6}$.',
  },
  {
    id: 1059,
    topic: 'Cholesky',
    q: 'We are given the factor **R** of the Cholesky factorization $A = R^T R$ of a matrix **A**, symmetric and positive definite, of dimension $n\\times n$. We want to solve $M$ linear systems $Ax_i = b_i$, $i=1,\\ldots,M$. Which MATLAB code solves the problem?',
    opts: [
      '```\nfor i = 1:M\n  y = R\' \\ B(:,i);\n  X(:,i) = A \\ y;\nend```',
      '```\nfor i = 1:M\n  y = A \\ B(:,i);\n  X(:,i) = R \\ y;\nend```',
      '```\nfor i = 1:M\n  y = R\' \\ B(:,i);\n  X(:,i) = R \\ y;\nend```',
      '```\nfor i = 1:M\n  y = R \\ B(:,i);\n  X(:,i) = R\' \\ y;\nend```',
    ],
    correct: 2,
    explanation: '$A = R^T R$, so $Ax = b$ → $R^T R x = b$. Step 1: $R^T y = b$ → `y = R\'\\B(:,i)`. Step 2: $Rx = y$ → `X(:,i) = R\\y`.',
  },
  {
    id: 1060,
    topic: 'Splines',
    q: 'The couples of points $(x_i, y_i)$, $i=1,\\ldots,n+1$ are equispaced in $[a,b]$ with $a=x_1 < x_2 < \\ldots < x_{n+1} = b$. Consider the **spline of order 1** $S_1$ interpolating such points.\n\nWhat is the value of the derivative $S_1\'(b)$?',
    opts: [
      "$S_1'(a) = S_1'(b)$",
      '$0$',
      '$\\dfrac{y_{n+1} - y_n}{b - a}$',
      '$n\\,\\dfrac{y_{n+1} - y_n}{b - a}$',
    ],
    correct: 3,
    explanation: 'The spline of order 1 is piecewise linear. On the last sub-interval $[x_n, x_{n+1}]$ the step size is $h = (b-a)/n$, so the slope is $\\frac{y_{n+1}-y_n}{h} = \\frac{n(y_{n+1}-y_n)}{b-a}$. This is the derivative at $b$.',
  },
  {
    id: 1061,
    topic: 'Splines',
    q: 'To obtain the **second-order spline** interpolating data $(x_i, y_i)$, $i=1,\\ldots,n$, one can use the MATLAB instruction:',
    opts: [
      '`s = spline(2, x, y)`',
      'None of the alternatives — `spline` only computes cubic (3rd order) splines',
      '`[s, 2] = spline(x, y, z)`',
      '`s = spline(x, y, z)`',
      '`s = spline(x, y, 2)`',
    ],
    correct: 1,
    explanation: "MATLAB's `spline` function **only** computes **cubic (3rd order) not-a-knot** splines. There is no built-in syntax to request a 2nd-order spline via `spline`. None of the listed alternatives produce a true 2nd-order spline.",
  },
  {
    id: 1062,
    topic: 'Polynomial interpolation',
    q: 'Which one of the following is the polynomial interpolating $f(x) = x^3 - 3x + 1$ at $n = 7$ linearly spaced nodes in $[0, 1]$?',
    opts: [
      '$p(x) = x^5 - 3x^4 - 9$',
      '$p(x) = x^3 - 3x + 1$',
      '$p(x) = x^7 - 3x^5 + x^4$',
      '$p(x) = x^6 - 5x^4 + 3x^2 - x + 1$',
      '$p(x) = x^7 - 5x^6 + 4x^3 - 3x^2 + 1$',
    ],
    correct: 1,
    explanation: '$f(x) = x^3 - 3x + 1$ is itself a **polynomial of degree 3**. The interpolating polynomial of degree $\\leq n-1 = 6$ through any 7 (or more) points of a degree-3 polynomial is **exactly that polynomial**. So $p(x) = x^3 - 3x + 1$.',
  },
  {
    id: 1063,
    topic: 'Splines',
    q: 'The **cubic spline** interpolating $f$ and satisfying **not-a-knot** conditions:',
    opts: [
      'Is a polynomial of degree 3',
      'Has a continuous third derivative',
      'None of the alternatives',
      'Is continuous but not differentiable',
      'Is a continuous piecewise polynomial function',
    ],
    correct: 4,
    explanation: 'A cubic spline is a **piecewise polynomial** (degree 3 on each sub-interval) that is continuous and has continuous 1st and 2nd derivatives. It is NOT a global polynomial of degree 3 (that would be option A). The not-a-knot condition fixes the 3rd derivative at the first and last interior knots — but the 3rd derivative is still **discontinuous** at other knots, so option B is wrong.',
  },
  {
  id: 1064,
  topic: 'Polynomial interpolation',

  q: 'We want to approximate $f(x) = \\cos(x)$ on $[0,\\pi]$ with the interpolating polynomial **p** of **maximum degree 4** on equispaced nodes, and estimate the error as $\\|f - p\\|_\\infty$ on 100 equispaced nodes in $[0,\\pi]$.\n\nWhich MATLAB sequence is correct?',

  opts: [
    '```\nf=@(s) cos(s);\nx=linspace(0,pi,5); y=f(x);\nxx=linspace(0,pi,100); yy=f(xx);\nc=polyfit(x,y,4);\np=polyval(c,xx);\nerr=norm(p-yy,inf);\n```',
    '```\nf=@(s) cos(s);\nx=linspace(0,pi,5); y=f(x);\nc=polyfit(x,y,4);\np=polyval(c,x);\nerr=norm(p-y,inf);\n```',
    '```\nf=@(s) cos(s);\nx=linspace(0,pi,4); y=f(x);\nxx=linspace(0,pi,100);\nc=polyfit(x,y,4);\np=polyval(c,x);\nerr=norm(p-y,inf);\n```',
    '```\nf=@(s) cos(s);\nx=linspace(0,pi,4); y=f(x);\nxx=linspace(0,pi,100); yy=f(xx);\nc=polyfit(x,y,4);\np=polyval(c,xx);\nerr=norm(p-yy,inf);\n```',
  ],

  correct: 0,

  explanation:
  'Degree 4 needs **5 nodes** → `linspace(0, pi, 5)`.\n\n' +

  'Evaluate $f$ on a fine grid of 100 points `xx` → `yy = f(xx)`.\n\n' +

  '`polyfit(x, y, 4)` fits a degree-4 polynomial to the 5 nodes.\n\n' +

  '`polyval(c, xx)` evaluates the polynomial on the 100-point grid.\n\n' +

  'Error: `norm(p - yy, inf)` measures $\\|f - p\\|_\\infty$ on the fine grid.\n\n' +

  '**Why the others fail:**\n\n' +

  '- **(B)** evaluates on training nodes only — not on 100 test nodes.\n\n' +

  '- **(C, D)** use `linspace(0, pi, 4)` — only 4 nodes, giving degree 3, not 4.\n\n' +

  'Final Answer: **(A)**',
},

  // ══════════════════════════════════════════════════════════════
  // 🆕 NEW: IDs 1065–1078  (batch added 26.05.2026)
  // 🔁 Skipped duplicates:
  //   Img2,7  → 1060  ($S_1'(b)$)
  //   Img6    → same as Img3 (e^x degree 8 error)
  //   Img12m,13 → same as Img10 top (A(:,end))
  //   Img15   → 1007/1024  (cos(x.^2).*sin(x) polyfit)
  //   Img16   → 1005  (linspace(0,1) x.^2.*cos(x))
  //   Img17   → 1035  (log(x.^2+1) spline)
  // ══════════════════════════════════════════════════════════════
  {
    id: 1065,
    topic: 'Polynomial interpolation',
    q: 'Let $f : \\mathbb{R} \\to \\mathbb{R}$ be a continuous function. Which MATLAB sequence defines the vector **c** containing the coefficients of the interpolating polynomial to $f$ at **9 equispaced nodes** in $[-5, 8]$ including endpoints?',
    opts: [
      '`x = linspace(-5, 8, 9); c = polyfit(x, f(x), 8);`',
      'The correct answer is not given',
      '`x = linspace(-5, 8, 9); c = interpolate(x, f(x));`',
      '`x = linspace(-5, 8, 9); c = polyfit(x, f(x), 9);`',
      '`x = linspace(-5, 8, 8); c = polyfit(x, f(x), 9);`',
    ],
    correct: 0,
    explanation: '9 equispaced nodes on $[-5,8]$: `linspace(-5,8,9)`. The polynomial through 9 nodes has degree **8** → `polyfit(x,f(x),8)`. Option D uses degree 9 (wrong). Option E uses only 8 nodes.',
  },
  {
    id: 1066,
    topic: 'Polynomial interpolation',
    q: 'We want to approximate $f(x) = e^x$ on $[-1,1]$ with the interpolating polynomial **p** of **maximum degree 8** on equispaced nodes, and estimate the error $\\|f-p\\|_\\infty$ on **100 equispaced nodes** in $[-1,1]$.\n\nWhich MATLAB sequence is correct?',
    opts: [
      '```\nf=@(s) exp(s);\nx=linspace(-1,1,8); y=f(x);\nxx=linspace(-1,1,100); yy=f(xx);\nc=polyfit(x,y,8);\np=polyval(c,xx);\nerr=norm(p-yy,inf);```',
      '```\nf=@(s) exp(s);\nx=linspace(-1,1,9); y=f(x);\nc=polyfit(x,y,8);\np=polyval(c,x);\nerr=norm(p-y,inf);```',
      '```\nf=@(s) exp(s);\nx=linspace(-1,1,8); y=f(x);\nxx=linspace(-1,1,100);\nc=polyfit(x,y,8);\np=polyval(c,x);\nerr=norm(p-y,inf);```',
      '```\nf=@(s) exp(s);\nx=linspace(-1,1,9); y=f(x);\nxx=linspace(-1,1,100); yy=f(xx);\nc=polyfit(x,y,8);\np=polyval(c,xx);\nerr=norm(p-yy,inf);```',
    ],
    correct: 3,
    explanation: 'Degree 8 needs **9 nodes** → `linspace(-1,1,9)`. Fine grid: `xx=linspace(-1,1,100)`, `yy=f(xx)`. Fit: `polyfit(x,y,8)`. Evaluate on fine grid: `polyval(c,xx)`. Error: `norm(p-yy,inf)`. Option A uses 8 nodes (degree 7). Option B evaluates on training nodes only.',
  },
  {
    id: 1067,
    topic: 'Polynomial interpolation',
    q: 'The following points are given: $(0,2),\\,(1,-2),\\,(2,\\tfrac{1}{2}),\\,(\\tfrac{1}{2},1)$, together with the fundamental Lagrange polynomials $\\ell_j(x)$, $j=1,\\ldots,4$.\n\nWhich is the **Lagrange representation** of the interpolating polynomial $p_3(x)$?',
    opts: [
      '$p_3(x) = -2\\ell_1(x) + 2\\ell_2(x) - \\tfrac{1}{2}\\ell_3(x) + 1\\cdot\\ell_4(x)$',
      '$p_3(x) = 2\\ell_1(x) + 2\\ell_2(x) + 2\\ell_3(x) + 1\\cdot\\ell_4(x)$',
      '$p_3(x) = 2\\ell_1(x) - 2\\ell_2(x) + \\tfrac{1}{2}\\ell_3(x) + 1\\cdot\\ell_4(x)$',
      '$p_3(x) = 0\\cdot\\ell_1(x) + 1\\cdot\\ell_2(x) + 2\\ell_3(x) + \\tfrac{1}{2}\\ell_4(x)$',
    ],
    correct: 2,
    explanation: 'The Lagrange form is $p_3(x) = \\sum_{j=1}^4 y_j \\ell_j(x)$, where $y_j$ are the $y$-values at the nodes. The nodes in order are $(0,2),(1,-2),(2,\\tfrac{1}{2}),(\\tfrac{1}{2},1)$, so: $p_3(x) = 2\\ell_1(x) - 2\\ell_2(x) + \\tfrac{1}{2}\\ell_3(x) + 1\\cdot\\ell_4(x)$.',
  },
  {
    id: 1068,
    topic: 'Polynomial interpolation',
    q: 'Among the following MATLAB commands, which one allows to **plot** $f(x) = x^2 e^x$ over the interval $[0,1]$?',
    opts: [
      '`x=0:0.1:1; y=x.^2.*e^x; plot(x,y)`',
      '`x=linspace(0,1); y=x.^2.*exp(x); plot(x,y)`',
      '`x=0:0.1; y=x.^2.*exp(x); plot(x,y)`',
      '`x=linspace(0,1); y=x.^2.*e^x; plot(x,y)`',
    ],
    correct: 1,
    explanation: '`linspace(0,1)` gives 100 equispaced points. `x.^2.*exp(x)` uses element-wise operators (`.^` and `.*`) — correct for vectors. `e^x` is not valid MATLAB syntax (use `exp(x)`). `0:0.1:1` gives only 11 points and `0:0.1` would give just `[0]`.',
  },
  {
    id: 1069,
    topic: 'Polynomial interpolation',
    q: 'We want to approximate $f(x) = \\sin(x)$ on $[0,1]$ with the interpolating polynomial **p** of **maximum degree 6** on equispaced nodes, and estimate the error $\\|f-p\\|_\\infty$ on **100 equispaced points** in $[0,1]$.\n\nWhich MATLAB sequence is correct?',
    opts: [
      '```\nf=@(s) sin(s);\nx=linspace(0,1,7); y=f(x);\nxx=linspace(0,1,100); yy=f(xx);\nc=polyfit(x,y,6);\np=polyval(c,xx);\nerr=norm(p-yy,inf);```',
      '```\nf=@(s) sin(s);\nx=linspace(0,1,5); y=f(x);\nxx=linspace(0,1,100);\nc=polyfit(x,y,6);\np=polyval(c,x);\nerr=norm(p-y,inf);```',
      '```\nf=@(s) sin(s);\nx=linspace(0,1,6); y=f(x);\nxx=linspace(0,1,100); yy=f(xx);\nc=polyfit(x,y,6);\np=polyval(c,xx);\nerr=norm(p-yy,inf);```',
      '```\nf=@(s) sin(s);\nx=linspace(0,1,6); y=f(x);\nc=polyfit(x,y,6);\np=polyval(c,x);\nerr=norm(p-y,inf);```',
    ],
    correct: 0,
    explanation: 'Degree 6 needs **7 nodes** → `linspace(0,1,7)`. Fine grid: `xx=linspace(0,1,100)`, `yy=f(xx)`. `polyfit(x,y,6)` fits. `polyval(c,xx)` evaluates on fine grid. Error: `norm(p-yy,inf)`. Option C uses only 6 nodes (underdetermined for degree 6).',
  },
  {
    id: 1070,
    topic: 'Polynomial interpolation',
    q: 'The following points in the plane are given: $(0,2),\\,(1,-2),\\,(2,\\tfrac{1}{2}),\\,(\\tfrac{1}{2},1)$.\n\nIn the Lagrange representation of $p_3(x)$, which expression denotes the **fundamental Lagrange polynomial $\\ell_3(x)$** associated to the abscissa of the **third point** $(x_3 = 2)$?',
    opts: [
      '$\\ell_3(x) = \\dfrac{(x-0)(x-2)(x-\\tfrac{1}{2})}{(2-0)(2-1)(2-\\tfrac{1}{2})}$',
      '$\\ell_3(x) = \\dfrac{(x+0)(x+1)(x+\\tfrac{1}{2})}{(2-0)(2-1)(2-\\tfrac{1}{2})}$',
      '$\\ell_3(x) = \\dfrac{(x-0)(x-1)(x-\\tfrac{1}{2})}{(2+0)(2+1)(2+\\tfrac{1}{2})}$',
      '$\\ell_3(x) = \\dfrac{(x-0)(x-1)(x-\\tfrac{1}{2})}{(2-0)(2-1)(2-\\tfrac{1}{2})}$',
    ],
    correct: 3,
    explanation: '$\\ell_3(x) = \\prod_{j\\neq 3}\\frac{x-x_j}{x_3-x_j}$. The nodes are $x_1=0, x_2=1, x_3=2, x_4=\\tfrac{1}{2}$. So: $\\ell_3(x)=\\frac{(x-0)(x-1)(x-\\frac{1}{2})}{(2-0)(2-1)(2-\\frac{1}{2})}$.',
  },
  {
    id: 1071,
    topic: 'Splines',
    q: 'The couples of points $(x_i, y_i)$, $i=1,\\ldots,n+1$ are equispaced in $[a,b]$. Consider the **spline of order 1** $S_1$. What is $S_1\'(a)$?',
    opts: [
      '$\\dfrac{y_2 - y_1}{b - a}$',
      '$0$',
      '$n\\,\\dfrac{y_2 - y_1}{b - a}$',
      "$S_1'(a) = S_1'(b)$",
    ],
    correct: 2,
    explanation: 'The spline of order 1 is piecewise linear. On the **first** sub-interval $[x_1,x_2]$ the step size is $h=(b-a)/n$, so the slope is $\\frac{y_2-y_1}{h}=\\frac{n(y_2-y_1)}{b-a}$. This is $S_1\'(a)$.',
  },
{
  id: 1072,
  topic: 'matrices',

  q: 'Let the matrix $A \\in \\mathbb{R}^{m,n}$ and the column vector $\\mathbf{x} \\in \\mathbb{R}^n$ be given. Let $\\mathbf{y} = A\\mathbf{x}$. Which MATLAB instruction computes $y_5$, the **5th component** of $\\mathbf{y}$?',
  opts: [
    '`y_5 = A(5,:)*x(5)`',
    '`y_5 = A.*x(5)`',
    '`y_5 = A(5,:)*x`',
    '`y_5 = A(5,:).*x`',
  ],

  correct: 2,

  explanation:
  '**Step 1 — Definition of matrix-vector product**\n\n' +

  'By definition, the $i$-th component of $\\mathbf{y} = A\\mathbf{x}$ is:\n\n' +

  '$$y_i = \\sum_{j=1}^{n} A_{ij}\\, x_j$$\n\n' +

  'So for $i=5$:\n\n' +

  '$$y_5 = \\sum_{j=1}^{n} A_{5j}\\, x_j$$\n\n' +

  '**Step 2 — Interpret as a dot product**\n\n' +

  'This is exactly the dot product of the **5th row** of $A$ with the vector $\\mathbf{x}$:\n\n' +

  '$$y_5 = \\underbrace{A(5,:)}_{1\\times n} \\cdot \\underbrace{\\mathbf{x}}_{n\\times 1}$$\n\n' +

  '**Step 3 — Eliminate wrong options**\n\n' +

  '- `A(5,:)*x(5)` — multiplies the 5th row by a **scalar** $x_5$ only, not the full vector.\n\n' +

  '- `A.*x(5)` — element-wise multiplication of the **entire matrix** $A$ by $x_5$.\n\n' +

  '- `A(5,:).*x` — element-wise `.*` between a $1\\times n$ row and $n\\times 1$ column; gives a $1\\times n$ array, **not a scalar**.\n\n' +

  '**Step 4 — Correct MATLAB instruction**\n\n' +

  '`A(5,:)` extracts the 5th row as a $1\\times n$ vector; `x` is $n\\times 1$. Standard matrix multiplication `*` then yields a scalar:\n\n' +

  '`y_5 = A(5,:)*x`\n\n' +

  'Final Answer: **(C)**',
},
 {
  id: 1073,
  topic: 'Matrices',

  q: 'Let the matrix $A \\in \\mathbb{R}^{m,n}$ and the column vector $\\mathbf{x} \\in \\mathbb{R}^n$ be given. Let $\\mathbf{y} = A\\mathbf{x}$. Which MATLAB instruction computes $y_2$, the **2nd component** of $\\mathbf{y}$?',

  opts: [
    '`y_2 = A(2,:)*x(2)`',
    '`y_2 = A.*x(2)`',
    '`y_2 = A(2,:).*x`',
    '`y_2 = A(2,:)*x`',
  ],

  correct: 3,

  explanation:
    'By definition of matrix-vector multiplication, the $k$-th component of $\\mathbf{y} = A\\mathbf{x}$ is:\n\n' +

    '$$y_k = \\sum_{j=1}^{n} A_{kj}\\, x_j$$\n\n' +

    'So $y_2$ is the **dot product of the 2nd row of $A$** with the entire vector $\\mathbf{x}$:\n\n' +

    '$$y_2 = A_{2,1}\\,x_1 + A_{2,2}\\,x_2 + \\cdots + A_{2,n}\\,x_n = A(2,:) \\cdot \\mathbf{x}$$\n\n' +

    'In MATLAB this is written as `A(2,:)*x` — row 2 multiplied by the full column vector.\n\n' +

    '**Why the other options are wrong:**\n\n' +

    '**A)** `A(2,:)*x(2)` — takes only the scalar $x_2$, not the full vector. Result is $\\mathbf{a}_{2}^T \\cdot x_2$, which is wrong.\n\n' +

    '**B)** `A.*x(2)` — element-wise multiplication of the **entire matrix** by the scalar $x_2$. Completely wrong shape.\n\n' +

    '**C)** `A(2,:).*x` — element-wise product `.*` returns a **row vector**, not a scalar. Not a dot product.\n\n' +

    '**D)** `A(2,:)*x` ✓ — standard matrix multiplication of a $[1 \\times n]$ row by a $[n \\times 1]$ column gives a scalar. **Correct.**',
},
 {
  id: 1074,
  topic: 'Matrices',

  q: 'Let the matrix $A \\in \\mathbb{R}^{m,n}$ and the column vector $\\mathbf{x} \\in \\mathbb{R}^n$ be given. Let $\\mathbf{y} = A\\mathbf{x}$. Which MATLAB instruction computes $y_4$, the **4th component** of $\\mathbf{y}$?',

  opts: [
    '`y_4 = A(4,:)*x(4)`',
    '`y_4 = A.*x(4)`',
    '`y_4 = A(4,:)*x`',
    '`y_4 = A(4,:).*x`',
  ],

  correct: 2,

  explanation:
  'By definition of matrix-vector multiplication:\n\n' +

  '$$y_4 = \\sum_j A_{4j}\\, x_j$$\n\n' +

  'This is the **dot product of the 4th row of $A$** with the full vector $\\mathbf{x}$.\n\n' +

  'In MATLAB: `A(4,:)*x` — the 4th row times the full vector **x**.\n\n' +

  '**Why the others fail:**\n\n' +

  '- **(A)** `A(4,:)*x(4)` — multiplies the row by a scalar $x_4$ only, not the full vector.\n\n' +

  '- **(B)** `A.*x(4)` — element-wise scaling of the whole matrix, wrong shape.\n\n' +

  '- **(D)** `A(4,:).*x` — element-wise product, not a dot product (returns a row, not a scalar).\n\n' +

  'Final Answer: **(C)**',
},
  {
    id: 1075,
    topic: 'matrices',
    q: 'Let **A** be a matrix with 3 columns. Which MATLAB instruction returns the **last (third) column** of **A**?',
    opts: [
      '`col(3, A)`',
      "`A('all', 3)`",
      '`col(A, 3)`',
      '`A(:, end)`',
    ],
    correct: 3,
    explanation: 'In MATLAB, `A(:, end)` selects **all rows** (`:`) of the **last column** (`end`). Since A has 3 columns, `end` resolves to 3. There is no built-in `col()` function in standard MATLAB.',
  },
  {
    id: 1076,
    topic: 'Floating point',
    q: 'In exact arithmetic (base 10), the result of the multiplication $51.441 \\times 20.227$ in **normalized floating point notation** is:',
    opts: [
      '$0.1040497107 \\times 10^4$',
      '$1.0405 \\times 10^5$',
      '$0.10405 \\times 10^3$',
      '$10.40497103 \\times 10^2$',
    ],
    correct: 0,
    explanation: '$51.441 \\times 20.227 = 1040.497107...$. In **normalized** base-10 floating point the mantissa must satisfy $0.1 \\leq |p| < 1$: $1040.497107 = 0.1040497107 \\times 10^4$. Option B has mantissa $> 1$. Option C has wrong exponent. Option D has mantissa $> 1$.',
  },
  {
    id: 1077,
    topic: 'Floating point',
    q: 'Consider a floating point arithmetic with $N=10$, $t=3$ digits reserved for the mantissa, and **rounding to even**. Let $p$ be the exact mantissa and $\\bar{p}$ the machine mantissa. If $p = 0.24619$, then $\\bar{p}$ is:',
    opts: [
      '$\\bar{p} = 0.2462$',
      '$\\bar{p} = 0.2461$',
      '$\\bar{p} = 0.247$',
      '$\\bar{p} = 0.246$',
    ],
    correct: 3,
    explanation: 'With $t=3$ digits: we keep 3 significant decimal digits after the leading `0.`. $p = 0.24619$, the 4th digit is 1 → round down → $\\bar{p} = 0.246$. **Rounding to even** applies only when the dropped part is exactly $5\\times 10^{-t}$; here $0.00019 < 0.0005$, so we simply round down.',
  },
  {
    id: 1078,
    topic: 'Floating point',
    q: 'Consider a floating point arithmetic with basis $N=10$ and $t=5$ digits for the mantissa. Which of the following numbers, if added to $a = 0.45678$, produces **numerical cancellation**?',
    opts: [
      '$-0.4562312$',
      '$-0.456$',
      '$0.45623$',
      '$-0.45623e{-01}$',
    ],
    correct: 0,
    explanation: 'Numerical cancellation occurs when two nearly equal numbers are subtracted, causing loss of significant digits. $a = 0.45678$ and $-0.4562312$: their sum $\\approx 0.0005488$ — catastrophic cancellation of the leading digits. The other options either differ too much in magnitude or have the same sign.',
  },
  {
    id: 1079,
    topic: 'Polynomial interpolation',
    q: 'Which MATLAB command creates a **linearly spaced vector of 10 elements** between 0 and 1?',
    opts: [
      '`x = 0: 0.2: 1`',
      '`x = linspace(0, 8, 1)`',
      '`x = linspace(0, 1, 10)`',
      '`x = linspace(0, 1, 8)`',
      '`x = 0: 0.1: 1`',
    ],
    correct: 2,
    explanation: '`linspace(a, b, n)` creates `n` equally spaced points from `a` to `b`. So `linspace(0, 1, 10)` gives exactly 10 elements. `0:0.1:1` gives 11 elements. `0:0.2:1` gives 6 elements.',
  },

  {
    id: 1080,
    isNew: true,
    topic: 'Power Method',
    q: 'Given a matrix **A** of dimension $n \\times n$, assume one applies to **A** the inverse power method, with the aim of finding the eigenvalue $\\lambda$ closest to $p = 2$ and the corresponding eigenvector $x$. Let $w_k$ be a MATLAB variable containing the approximation of $x$ at the $k$-th iteration of the method.\n\nWhich one of the following MATLAB instructions creates a variable `lambdak` containing the approximation of $\\lambda$ at step $k$?',
    opts: [
      '`zk = (A + 2*eye(n))\\wk; lambdak = 2 + 1/(wk\'*zk);`',
      '`zk = (A - 2*eye(n))\\wk; lambdak = 2 - 1/(wk\'*zk);`',
      '`zk = (A - 2*eye(n))\\wk; lambdak = 2 + 1/(wk\'*zk);`',
      '`zk = (A + 2*eye(n))\\wk; lambdak = 2 - 1/(wk\'*zk);`',
    ],
    correct: 2,
    explanation: 'The inverse power method shifted by $p=2$ solves $(A - 2I)z_k = w_k$ at each step. The Rayleigh quotient gives $\\lambda^{(k)} = p + 1/(w_k^T z_k) = 2 + 1/(w_k^T z_k)$. So the correct shift is $A - 2I$ and the update is `lambdak = 2 + 1/(wk\'*zk)`.',
  },

  {
    id: 1081,
    isNew: true,
    topic: 'Power Method',
    q: 'Let the matrix\n$$A = \\begin{pmatrix}3 & 1\\\\4 & 5\\end{pmatrix}$$\nbe given, and assume to apply the power method to $A$. Let $w^{(m)} = \\begin{pmatrix}1\\\\0\\end{pmatrix}$ be the approximation of the eigenvector corresponding to the eigenvalue of maximum modulus $\\lambda_1$ at step $m$.\n\nWhat is the value of $\\lambda_1^{(m)}$, that is the approximation of $\\lambda_1$ at step $m$?',
    opts: [
      '$3$',
      '$8$',
      '$9$',
      '$15$',
    ],
    correct: 0,
    explanation: 'The Rayleigh quotient at step $m$ is $\\lambda_1^{(m)} = \\frac{w^{(m)T} A\\, w^{(m)}}{w^{(m)T} w^{(m)}}$. With $w^{(m)} = (1,0)^T$: $A w^{(m)} = (3,4)^T$, so $\\lambda_1^{(m)} = (1,0)\\cdot(3,4)^T / 1 = \\mathbf{3}$.',
  },

  {
    id: 1082,
    isNew: true,
    topic: 'QR Decomposition',
    q: 'Suppose the matrix\n$$A = \\begin{pmatrix}0 & 0 & -2\\\\-1 & 2 & 1\\\\0 & 1 & 3\\end{pmatrix}$$\nis factorized as\n$$A = \\begin{pmatrix}0 & 0 & -1\\\\1 & 0 & 0\\\\0 & -1 & 0\\end{pmatrix}\\begin{pmatrix}-1 & 2 & 1\\\\0 & -1 & -3\\\\0 & 0 & 2\\end{pmatrix}$$\nWhat type of factorization does this represent?',
    opts: [
      'An SVD factorization',
      'An LU factorization',
      'A QR factorization',
      'A Choleski factorization',
    ],
    correct: 2,
    explanation: 'The first factor is an orthogonal matrix $Q$ (columns are orthonormal, $Q^T Q = I$), and the second factor is upper triangular $R$. This is the definition of **QR factorization**: $A = QR$.',
  },

  {
    id: 1083,
    isNew: true,
    topic: 'Power Method',
    q: 'Given a matrix **A** of dimension $n \\times n$, assume one applies to **A** the inverse power method, with the aim of finding the eigenvalue $\\lambda$ closest to $p = 5$ and the corresponding eigenvector $x$. Let $w_k$ be a MATLAB variable containing the approximation of $x$ at the $k$-th iteration.\n\nWhich one of the following MATLAB instructions creates a variable `lambdak` containing the approximation of $\\lambda$ at step $k$?',
    opts: [
      '`zk = (A - 5*eye(n))\\wk; lambdak = 5 - 1/(wk\'*zk);`',
      '`zk = (A - 5*eye(n))\\wk; lambdak = 5 + 1/(wk\'*zk);`',
      '`zk = (A + 5*eye(n))\\wk; lambdak = 5 + 1/(wk\'*zk);`',
      '`zk = (A + 5*eye(n))\\wk; lambdak = 5 - 1/(wk\'*zk);`',
    ],
    correct: 1,
    explanation: 'The inverse power method shifted by $p=5$ solves $(A - 5I)z_k = w_k$. The Rayleigh quotient gives $\\lambda^{(k)} = p + 1/(w_k^T z_k) = 5 + 1/(w_k^T z_k)$. So the correct answer is `zk = (A - 5*eye(n))\\wk; lambdak = 5 + 1/(wk\'*zk)`.',
  },
  {
    id: 1084,
    isNew: true,
    topic: 'Power Method',
    q: 'Consider the MATLAB instruction `max(abs(eig(A)))`. Which of the following statements is **definitely false**?',
    opts: [
      'The instruction calculates the spectral radius $\\rho$ of the matrix **A**',
      'The instruction calculates the 2-norm of the matrix **A**, regardless of the form of **A**',
      'The instruction calculates the 2-norm of the matrix **A**, only if **A** is symmetric',
      'It is not equivalent to the instruction `abs(max(eig(A)))`',
    ],
    correct: 1,
    explanation: '`max(abs(eig(A)))` computes the **spectral radius** $\\rho(A) = \\max_i |\\lambda_i|$. The 2-norm equals the spectral radius **only for symmetric** matrices ($\\|A\\|_2 = \\rho(A^T A)^{1/2}$). Claiming it computes the 2-norm regardless of the form is **definitely false**.',
  },
  {
  id: 1085,
  isNew: true,
  topic: 'QR Decomposition',

  q: 'We are given the factors $Q$ and $R$ of the $QR$ factorization of a nonsingular matrix **A** of dimensions $n \\times n$. We want to solve the $M$ linear systems $Ax_i = b_i$, $i = 1, \\ldots, M$, where the vectors $x_i$ are the columns of matrix $X$ and the vectors $b_i$ are the columns of matrix $B$.\n\nWhich of the following MATLAB codes solves the considered problem?',

  opts: [
    '```\nfor i = 1:M\n  X(:,i) = A\\B(:,i);\nend\n```',
    '```\nfor i = 1:M\n  X(:,i) = (Q*R)\\B(:,i);\nend\n```',
    '```\nfor i = 1:M\n  X(:,i) = Q \\\\ (R\\\'*B(:,i));\nend\n```',
    '```\nfor i = 1:M\n  X(:,i) = R \\\\ (Q\\\'*B(:,i));\nend\n```',
  ],

  correct: 3,

  explanation: 'From $A = QR$ we get $Ax = b \\Rightarrow QRx = b \\Rightarrow Rx = Q^T b$ (since $Q^{-1} = Q^T$ for orthogonal $Q$). So $x = R \\backslash (Q^T b)$, i.e. `X(:,i) = R \\ (Q\\\'*B(:,i))`. Option (d) is correct.',
},
  {
    id: 1086,
    isNew: true,
    topic: 'Power Method',
    q: 'Consider the MATLAB instruction `max(abs(eig(A)))`. Indicate which of the following statements is **definitely true**:',
    opts: [
      'The instruction calculates the spectral radius $\\rho$ of the matrix **A**',
      'The instruction calculates the 2-norm of the matrix **A**, regardless of the form of **A**',
      'The instruction calculates the 2-norm of the matrix $A^T A$',
      'It is equivalent to the instruction `abs(max(eig(A)))`',
    ],
    correct: 0,
    explanation: '`max(abs(eig(A)))` returns $\\max_i |\\lambda_i|$, which is by definition the **spectral radius** $\\rho(A)$. This is always true regardless of the matrix structure.',
  },
  {
    id: 1087,
    isNew: true,
    topic: 'Power Method',
    q: 'Given a matrix **A** of dimension $n \\times n$, assume one applies to **A** the inverse power method, with the aim of finding the eigenvalue $\\lambda$ closest to $p = 4$ and the corresponding eigenvector $x$. Let $w_k$ be a MATLAB variable containing the approximation of $x$ at the $k$-th iteration.\n\nWhich one of the following MATLAB instructions creates a variable `lambdak` containing the approximation of $\\lambda$ at step $k$?',
    opts: [
      '`zk = (A - 4*eye(n))\\wk; lambdak = 4 - 1/(wk\'*zk);`',
      '`zk = (A + 4*eye(n))\\wk; lambdak = 4 - 1/(wk\'*zk);`',
      '`zk = (A - 4*eye(n))\\wk; lambdak = 4 + 1/(wk\'*zk);`',
      '`zk = (A + 4*eye(n))\\wk; lambdak = 4 + 1/(wk\'*zk);`',
    ],
    correct: 2,
    explanation: 'The inverse power method shifted by $p=4$ solves $(A - 4I)z_k = w_k$. The Rayleigh quotient gives $\\lambda^{(k)} = 4 + 1/(w_k^T z_k)$. Correct: `zk = (A - 4*eye(n))\\wk; lambdak = 4 + 1/(wk\'*zk)`.',
  },
  {
    id: 1088,
    isNew: true,
    topic: 'Power Method',
    q: 'Let the matrix\n$$A = \\begin{pmatrix}2 & 1\\\\3 & 4\\end{pmatrix}$$\nbe given, and assume to apply the power method to $A$. Let $w^{(m)} = \\begin{pmatrix}1\\\\0\\end{pmatrix}$ be the approximation of the eigenvector corresponding to the eigenvalue of maximum modulus $\\lambda_1$ at step $m$.\n\nWhat is the value of $\\lambda_1^{(m)}$, that is the approximation of $\\lambda_1$ at step $m$?',
    opts: [
      '$2$',
      '$7$',
      '$-1$',
      '$-9$',
    ],
    correct: 0,
    explanation: 'Rayleigh quotient: $\\lambda_1^{(m)} = \\frac{w^{(m)T} A w^{(m)}}{w^{(m)T} w^{(m)}}$. With $w^{(m)} = (1,0)^T$: $Aw^{(m)} = (2,3)^T$, so $\\lambda_1^{(m)} = (1,0) \\cdot (2,3)^T = \\mathbf{2}$.',
  },
  {
    id: 1089,
    isNew: true,
    topic: 'Cholesky',
    q: 'Assume you are given in the workspace a symmetric positive definite matrix **A** and column vector **b** with as many elements as the order of **A**. You want to solve the linear system $Ax = b$.\n\nWhich set of MATLAB commands provides you with the solution vector $x$?',
    opts: [
      '`x = lu(A,b);`',
      '`R = chol(A); y = R\'\\b; x = R\\y;`',
      '`[L,U,P] = lu(A,\'chol\'); x = U\\b;`',
      '`x = chol(A,b);`',
    ],
    correct: 1,
    explanation: 'For a SPD matrix, Cholesky gives $A = R^T R$. Then $Ax = b \\Rightarrow R^T R x = b$. Solve in two steps: $R^T y = b$ → `y = R\'\\b`, then $Rx = y$ → `x = R\\y`. Options (a) and (d) use wrong syntax; (c) is invalid.',
  },
  {
    id: 1090,
    isNew: true,
    topic: 'LU Decomposition',
    q: 'We are given the factors $P$, $L$, $U$ of the $PA = LU$ factorization of a nonsingular matrix **A** of dimension $n \\times n$. We want to solve the $M$ linear systems $Ax_i = b_i$, $i = 1, \\ldots, M$, where the vectors $x_i$ are the columns of matrix $X$ and $b_i$ are the columns of matrix $B$.\n\nWhich of the following MATLAB codes solves the problem?',
    opts: [
      '```\nfor i = 1:M\n  y = U \\ (P*B(:,i));\n  X(:,i) = L\\y;\nend```',
      '```\nfor i = 1:M\n  y = L \\ (P*B(:,i));\n  X(:,i) = U\\y;\nend```',
      '```\nfor i = 1:M\n  y = U \\ B(:,i);\n  X(:,i) = L\\y;\nend```',
      '```\nfor i = 1:M\n  y = L \\ B(:,i);\n  X(:,i) = U\\y;\nend```',
    ],
    correct: 1,
    explanation: 'From $PA = LU$: $Ax = b \\Rightarrow PAx = Pb \\Rightarrow LUx = Pb$. Solve $Ly = Pb$ → `y = L \\ (P*B(:,i))`, then $Ux = y$ → `X(:,i) = U\\y`. That is option **(b)**.',
  },
  {
    id: 1091,
    isNew: true,
    topic: 'Cholesky',
    q: 'We are given a matrix $A \\in \\mathbb{R}^{n \\times n}$, symmetric and positive definite, and its Cholesky factorization $A = R^T R$.\n\nWhich one of the following statements is surely correct?',
    opts: [
      '$R^T$ is an upper triangular matrix with positive elements on the main diagonal',
      '$R^T$ is a lower triangular matrix with nonnegative elements on the main diagonal',
      '$R$ is an upper triangular matrix with positive elements on the main diagonal',
      '$R$ is a lower triangular matrix with positive elements on the main diagonal',
    ],
    correct: 2,
    explanation: 'By definition of the Cholesky factorization $A = R^T R$, $R$ is **upper triangular** with **strictly positive** diagonal entries (guaranteed by positive definiteness of $A$). $R^T$ would be lower triangular, not upper.',
  },
  {
    id: 1092,
    isNew: true,
    topic: 'LU Decomposition',
    q: 'Which of the following statements is true about the **pivoting strategy** in Gaussian elimination?',
    opts: [
      'The pivoting strategy improves the stability of the Gauss algorithm',
      'The pivoting strategy improves the conditioning of a linear system',
      'The pivoting strategy is superfluous if **A** is symmetrical',
      'The pivoting strategy consists in the determination, at step $k$, of the element $a_{r,k} = \\max_{i=k,\\ldots,n} a_{i,k}$ and in the exchange of the $k$ and $r$ equations of the system',
    ],
    correct: 0,
    explanation: 'Pivoting (partial or complete) improves **numerical stability** of Gaussian elimination by avoiding division by small pivots. It does not change the conditioning of the system (that is a property of the matrix). It is not superfluous for symmetric matrices either.',
  },
  {
    id: 1093,
    isNew: true,
    topic: 'LU Decomposition',
    q: 'Let **A** be a square matrix **strictly diagonally dominant by columns**. In order to compute the $LU$ decomposition of **A**:',
    opts: [
      'The $LU$ decomposition without pivoting can be performed',
      'The pivoting is mandatory and some permutation is always performed',
      'The solution has always positive elements',
      'The Cholesky decomposition works better in this situation',
    ],
    correct: 0,
    explanation: 'A matrix that is strictly diagonally dominant (by rows **or** columns) guarantees that all pivots are nonzero during Gaussian elimination. Therefore the $LU$ decomposition **without pivoting** can always be performed stably.',
  },
{
    id: 1094,
    isNew: true,
    topic: 'Cholesky',
    q: 'We are given a matrix $A \\in \\mathbb{R}^{n \\times n}$, symmetric and positive definite, and its Cholesky factorization $A = R^T R$.\n\nWhich one of the following statements is surely correct?',
    opts: [
      'The factorization always exists and it is unique',
      'The factorization does not always exist, but when it exists it is unique',
      'The uniqueness of the factorization depends on the rank of matrix **A**',
      'The factorization always exists but it is not unique',
    ],
    correct: 0,
    explanation: 'For any symmetric positive definite matrix, the Cholesky factorization $A = R^T R$ with $R$ upper triangular and positive diagonal **always exists and is unique**. Positive definiteness guarantees both existence and uniqueness.',
  },
  {
    id: 1095,
    isNew: true,
    topic: 'LU Decomposition',
    q: 'Assume the $P$, $L$, $U$ factors of the $PA = LU$ decomposition of a given matrix **A** are available.\n\nWhich one of the following sets of MATLAB commands allows to compute the solution of the linear system $Ax = b$, with a given $b$?',
    opts: [
      '`a = L\\b; x = U\\(P*a);`',
      '`a = L\\(P*b); x = U\\a;`',
      '`a = U\\(L*b); x = P\\a;`',
      '`a = U\\(P*b); x = L\\a;`',
    ],
    correct: 1,
    explanation: '$PA = LU \\Rightarrow LUx = Pb$. First solve $Ly = Pb$: `a = L\\(P*b)`, then solve $Ux = y$: `x = U\\a`.',
  },
  {
    id: 1096,
    isNew: true,
    topic: 'LU Decomposition',
    q: 'Let $P$, $L$, $U$ be the factors of the $PA = LU$ factorization of a given matrix **A**, and let $s = 2$ be the total number of performed row swaps. If\n$$U = \\begin{pmatrix}2 & 5 & 7\\\\0 & 1 & 9\\\\0 & 0 & 3\\end{pmatrix}$$\nthen the determinant of **A** is equal to:',
    opts: [
      '$-6$',
      '$2$',
      '$6$',
      '$-2$',
    ],
    correct: 2,
    explanation: '$\\det(A) = (-1)^s \\cdot \\det(U)$ (since $\\det(L)=1$ and $\\det(P) = (-1)^s$). $\\det(U) = 2 \\cdot 1 \\cdot 3 = 6$. With $s=2$ swaps: $(-1)^2 \\cdot 6 = \\mathbf{6}$.',
  },
  {
    id: 1097,
    isNew: true,
    topic: 'Cholesky',
    q: 'We are given the factor $R$ of the Cholesky factorization of a matrix **A**, symmetric and positive definite, of dimension $n \\times n$. We want to solve the $M$ linear systems $Ax_i = b_i$, $i = 1, \\ldots, M$.\n\nWhich of the following MATLAB codes solves the considered problem?',
    opts: [
      '```\nfor i = 1:M\n  y = R\' \\ B(:,i);\n  X(:,i) = A \\ y;\nend```',
      '```\nfor i = 1:M\n  y = A \\ B(:,i);\n  X(:,i) = R \\ y;\nend```',
      '```\nfor i = 1:M\n  y = R\' \\ B(:,i);\n  X(:,i) = R \\ y;\nend```',
      '```\nfor i = 1:M\n  y = R \\ B(:,i);\n  X(:,i) = R\' \\ y;\nend```',
    ],
    correct: 2,
    explanation: '$A = R^T R$, so $Ax = b \\Rightarrow R^T R x = b$. Solve $R^T y = b$: `y = R\' \\ B(:,i)`, then $Rx = y$: `X(:,i) = R \\ y`. That is option **(c)**.',
  },
  {
    id: 1098,
    isNew: true,
    topic: 'Splines',
    q: 'The couples of points $(x_i, y_i)$, $i = 1, \\ldots, n+1$ are assigned, with points $x_i$ equispaced in the interval $[a,b]$ with $a = x_1 < x_2 < \\ldots < x_{n+1} = b$. Consider the spline of order one $S_1$ interpolating such points.\n\nWhat is the value of the derivative of the spline evaluated in $b$, $S_1\'(b)$?',
    opts: [
      "$S_1'(a) = S_1'(b)$",
      '$0$',
      '$(y_{n+1} - y_n)/(b - a)$',
      '$n(y_{n+1} - y_n)/(b - a)$',
    ],
    correct: 3,
    explanation: 'A linear spline on $n$ equal subintervals of $[a,b]$ has step size $h = (b-a)/n$. On the last interval the slope is $(y_{n+1}-y_n)/h = n(y_{n+1}-y_n)/(b-a)$.',
  },
  {
    id: 1099,
    isNew: true,
    topic: 'Splines',
    q: 'To obtain the **second order spline** interpolating the data $(x_i, y_i)$ for $i = 1, \\ldots, n$, one can use the MATLAB instruction:',
    opts: [
      '`s = spline(2, x, y)`',
      'None of the alternatives',
      '`[s, 2] = spline(x, y, z)`',
      '`s = spline(x, y, z)`',
      '`s = spline(x, y, 2)`',
    ],
    correct: 1,
    explanation: 'MATLAB\'s `spline` function only computes **cubic** (3rd order) not-a-knot splines. There is no built-in syntax to produce a 2nd order spline with `spline`. None of the listed alternatives is correct.',
  },
  {
    id: 1100,
    isNew: true,
    topic: 'Polynomial interpolation',
    q: 'Which one of the following is the expression of the polynomial interpolating the function $f(x) = x^3 - 3x + 1$ in $n = 7$ linearly spaced nodes in the interval $[0, 1]$?',
    opts: [
      '$p(x) = x^5 - 3x^4 - 9$',
      '$p(x) = x^3 - 3x + 1$',
      '$p(x) = x^7 - 3x^5 + x^4$',
      '$p(x) = x^6 - 5x^4 + 3x^2 - x + 1$',
      '$p(x) = x^7 - 5x^6 + 4x^3 - 3x^2 + 1$',
    ],
    correct: 1,
    explanation: '$f(x) = x^3 - 3x + 1$ is itself a polynomial of degree 3. Since the interpolating polynomial of degree $\\leq n-1 = 6$ through any 7 points of a degree-3 polynomial is **exact** — it reproduces $f$ itself. So $p(x) = x^3 - 3x + 1$.',
  },
  {
    id: 1101,
    isNew: true,
    topic: 'Splines',
    q: 'The cubic spline interpolating $f$ and satisfying **not-a-knot** conditions:',
    opts: [
      'Is a polynomial of degree 3',
      'Has a continuous third derivative',
      'None of the alternatives',
      'Is continuous but not differentiable',
      'Is a continuous piecewise polynomial function',
    ],
    correct: 4,
    explanation: 'A cubic spline is a **piecewise polynomial** of degree 3, defined on subintervals, and joined so that it is continuous with continuous 1st and 2nd derivatives. It is not a single polynomial of degree 3 over the whole domain, and the 3rd derivative is generally discontinuous at interior knots.',
  },
 {
    id: 1102,
    isNew: true,
    topic: 'Polynomial interpolation',
    q: 'We want to approximate $f(x) = \\cos(x)$ on $[0, \\pi]$ with the interpolating polynomial $p$ of **maximum degree 4** on equispaced nodes, and estimate the error as $\\|f - p\\|_\\infty$ computed on 100 equispaced nodes in $[0, \\pi]$.\n\nWhich is the correct sequence of MATLAB instructions?',
    opts: [
      '```\nf=@(s) cos(s);\nx=linspace(0,pi,5);\ny=f(x);\nxx=linspace(0,pi,100);\nyy=f(xx);\nc=polyfit(x,y,4);\np=polyval(c,xx);\nerr=norm(p-yy,inf);```',
      '```\nf=@(s) cos(s);\nx=linspace(0,pi,5);\ny=f(x);\nc=polyfit(x,y,4);\np=polyval(c,x);\nerr=norm(p-y,inf);```',
      '```\nf=@(s) cos(s);\nx=linspace(0,pi,4);\ny=f(x);\nxx=linspace(0,pi,100);\nc=polyfit(x,y,4);\np=polyval(c,x);\nerr=norm(p-y,inf);```',
      '```\nf=@(s) cos(s);\nx=linspace(0,pi,4);\ny=f(x);\nxx=linspace(0,pi,100);\nyy=f(xx);\nc=polyfit(x,y,4);\np=polyval(c,xx);\nerr=norm(p-yy,inf);```',
    ],
    correct: 0,
    explanation: 'Degree 4 needs **5 nodes**: `linspace(0,pi,5)`. Error must be computed on the 100-point fine grid `xx`, so we need `yy=f(xx)` and `p=polyval(c,xx)`, then `err=norm(p-yy,inf)`. Only option **(a)** has all of this correct.',
  },
  {
    id: 1103,
    isNew: true,
    topic: 'Splines',
    q: 'You are given $f(x) = \\sin(x)\\cos(x)$. You want to interpolate it over $[0, 2\\pi]$ with a not-a-knot cubic spline built on **12 sub-intervals** (all equal size) and plot the spline.\n\nGiven the code:\n```\nx=linspace(0,2*pi,13)\ny=sin(x).*cos(x)\nx_plot=linspace(0,2*pi)\n...\nplot(x_plot,y_plot)\n```\nWhat MATLAB command should replace the dots?',
    opts: [
      '`y_plot=polyfit(x,y,\'spline\')`',
      '`y_plot=spline(x_plot)`',
      '`y_plot=polyval(x,y,x_plot,\'spline\')`',
      '`y_plot=spline(x,y,x_plot)`',
    ],
    correct: 3,
    explanation: '`spline(x, y, x_plot)` builds the not-a-knot cubic spline through the 13 data points and evaluates it at the fine grid `x_plot`. This is the correct MATLAB syntax.',
  },
  {
    id: 1104,
    isNew: true,
    topic: 'Polynomial interpolation',
    q: 'You are given $f(x) = \\cos(x^2)\\sin(x)$. You want to interpolate it over $[0, \\pi]$ with a polynomial of order **9** built on **10 equally spaced nodes** and plot the polynomial.\n\nGiven the code:\n```\nx=linspace(0,pi,10)\n...\nc=polyfit(x,y,9)\nx_plot=linspace(0,pi)\ny_plot=polyval(c,x_plot)\nplot(x_plot,y_plot)\n```\nWhat MATLAB command should replace the dots?',
    opts: [
      '`y=cos(x^2)*sin(x)`',
      '`y=cos(x.^2).*sin(x)`',
      'The commands are wrong and can never produce the result whatever is put in place of the dots',
      '`y=polyval(x,\'cos(x.^2).*sin(x)\')`',
    ],
    correct: 1,
    explanation: 'In MATLAB, element-wise operations on vectors require the dot notation: `cos(x.^2).*sin(x)`. Without the dots, `x^2` would attempt matrix multiplication and fail for a vector `x`.',
  },
  {
    id: 1105,
    isNew: true,
    topic: 'Polynomial interpolation',
    q: 'Consider the following set of MATLAB commands:\n```\nx=linspace(0,1,50)\ny=x.^2.*cos(x);\nplot(x,y)\n```\nThey:',
    opts: [
      'Plot the 49-th order polynomial interpolating $f(x)=x^2\\cos(x)$ over 50 equally spaced nodes on $(0,1)$',
      'Plot the cubic spline interpolating $f(x)=x^2\\cos(x)$ over 50 equally spaced nodes on $(0,1)$',
      'Plot the function $f(x)=x^2\\cos(x)$ over $(0,1)$ using 50 function evaluations',
      'Are meaningless and will generate an error message',
    ],
    correct: 2,
    explanation: 'No interpolation is performed here — `y` is computed directly by evaluating $f(x) = x^2\\cos(x)$ at 50 points. `plot(x,y)` simply plots these function values. This is just a direct function plot.',
  },
  {
    id: 1106,
    isNew: true,
    topic: 'Polynomial interpolation',
    q: 'Consider the following set of MATLAB commands:\n```\nx=linspace(0,1)\ny=x.^2.*cos(x);\nplot(x,y)\n```\nThey:',
    opts: [
      'Plot the function $f(x)=x^2\\cos(x)$ over $(0,1)$ using 100 function evaluations',
      'Plot the 99-th order polynomial interpolating $f(x)=x^2\\cos(x)$ over 100 equally spaced nodes on $(0,1)$',
      'Are meaningless and will generate an error message',
      'Plot the cubic spline interpolating $f(x)=x^2\\cos(x)$ over 100 equally spaced nodes on $(0,1)$',
    ],
    correct: 0,
    explanation: '`linspace(0,1)` with no third argument defaults to **100 points**. `y` is evaluated directly (no interpolation), and `plot(x,y)` plots the function — 100 evaluations of $f(x) = x^2\\cos(x)$.',
  },
  {
    id: 1107,
    isNew: true,
    topic: 'Polynomial interpolation',
    q: 'Let $f: \\mathbb{R} \\to \\mathbb{R}$ be a continuous function. Which of the following sequences of MATLAB instructions defines the vector $c$ that contains the coefficients of the interpolating polynomial to $f$ at **9 equispaced nodes** in the interval $[-5, 8]$ including endpoints?',
    opts: [
      '`x = linspace(-5, 8, 9); c = polyfit(x, f(x), 8);`',
      'The correct answer is not given',
      '`x = linspace(-5, 8, 9); c = interpolate(x, f(x));`',
      '`x = linspace(-5, 8, 9); c = polyfit(x, f(x), 9);`',
      '`x = linspace(-5, 8, 8); c = polyfit(x, f(x), 9);`',
    ],
    correct: 0,
    explanation: '9 equispaced nodes including endpoints: `linspace(-5, 8, 9)`. The interpolating polynomial through 9 points has degree **8**, so `polyfit(x, f(x), 8)` is correct. Degree 9 would be over-determined. `interpolate` is not a standard MATLAB function.',
  },
  {
    id: 1108,
    isNew: true,
    topic: 'Polynomial interpolation',
    q: 'We want to approximate $f(x) = e^x$ on $[-1, 1]$ with the interpolating polynomial $p$ of **maximum degree 8** on equispaced nodes, and estimate the error $\\|f - p\\|_\\infty$ on 100 equispaced nodes in $[-1, 1]$.\n\nWhich is the correct sequence of MATLAB instructions?',
    opts: [
      '```\nf=@(s) exp(s);\nx=linspace(-1,1,8); y=f(x);\nxx=linspace(-1,1,100); yy=f(xx);\nc=polyfit(x,y,8);\np=polyval(c,xx);\nerr=norm(p-yy,inf);```',
      '```\nf=@(s) exp(s);\nx=linspace(-1,1,9); y=f(x);\nc=polyfit(x,y,8);\np=polyval(c,x);\nerr=norm(p-y,inf);```',
      '```\nf=@(s) exp(s);\nx=linspace(-1,1,8); y=f(x);\nxx=linspace(-1,1,100);\nc=polyfit(x,y,8);\np=polyval(c,x);\nerr=norm(p-y,inf);```',
      '```\nf=@(s) exp(s);\nx=linspace(-1,1,9); y=f(x);\nxx=linspace(-1,1,100); yy=f(xx);\nc=polyfit(x,y,8);\np=polyval(c,xx);\nerr=norm(p-yy,inf);```',
    ],
    correct: 3,
    explanation: 'Degree 8 needs **9 nodes**: `linspace(-1,1,9)`. Error on fine grid: need `xx=linspace(-1,1,100)`, `yy=f(xx)`, `p=polyval(c,xx)`, `err=norm(p-yy,inf)`. Only option **(d)** has all correct.',
  },
  {
    id: 1109,
    isNew: true,
    topic: 'Polynomial interpolation',
    q: 'The following points in the plane are given:\n$(0,2),\\ (1,-2),\\ (2,1/2),\\ (1/2,1)$\ntogether with the fundamental Lagrange polynomials $\\ell_j(x)$, $j=1,\\ldots,4$ associated with the abscissas.\n\nWhich of the following expressions is the **Lagrange representation** of the interpolating polynomial?',
    opts: [
      '$p_3(x) = -2\\ell_1(x) + 2\\ell_2(x) - 1/2\\ell_3(x) + 1\\ell_4(x)$',
      '$p_3(x) = 2\\ell_1(x) + 2\\ell_2(x) + 2\\ell_3(x) + 1\\ell_4(x)$',
      '$p_3(x) = 2\\ell_1(x) - 2\\ell_2(x) + 1/2\\ell_3(x) + 1\\ell_4(x)$',
      '$p_3(x) = 0\\ell_1(x) + 1\\ell_2(x) + 2\\ell_3(x) + 1/2\\ell_4(x)$',
    ],
    correct: 2,
    explanation: 'The Lagrange form is $p(x) = \\sum_j y_j \\ell_j(x)$, where $y_j$ are the function values at the nodes. The nodes in order are $x_1=0, x_2=1, x_3=2, x_4=1/2$ with values $y_1=2, y_2=-2, y_3=1/2, y_4=1$. So $p_3(x) = 2\\ell_1(x) - 2\\ell_2(x) + \\tfrac{1}{2}\\ell_3(x) + 1\\ell_4(x)$.',
  },
  {
    id: 1110,
    isNew: true,
    topic: 'Polynomial interpolation',
    q: 'Among the following MATLAB commands, which one allows to depict the function $f(x) = x^2 e^x$ over the interval $[0, 1]$?',
    opts: [
      '`x=0:0.1:1; y=x.^2.*e^x; plot(x,y)`',
      '`x=linspace(0,1); y=x.^2.*exp(x); plot(x,y)`',
      '`x=0:1; y=x.^2.*exp(x); plot(x,y)`',
      '`x=linspace(0,1); y=x.^2.*e^x; plot(x,y)`',
    ],
    correct: 1,
    explanation: 'In MATLAB, the exponential function is `exp(x)` (not `e^x`). Element-wise operations on vectors require dots: `x.^2.*exp(x)`. `linspace(0,1)` gives 100 points by default, producing a smooth plot. `x=0:1` gives only 2 points — not useful for plotting.',
  },
 {
    id: 1111,
    isNew: true,
    topic: 'Polynomial interpolation',
    q: 'We want to approximate $f(x) = \\sin(x)$ on $[0, 1]$ with the interpolating polynomial $p$ of **maximum degree 6** on equispaced nodes, and estimate the error $\\|f - p\\|_\\infty$ on 100 equispaced points in $[0, 1]$.\n\nWhich is the correct sequence of MATLAB instructions?',
    opts: [
      '```\nf=@(s) sin(s);\nx=linspace(0,1,7); y=f(x);\nxx=linspace(0,1,100); yy=f(xx);\nc=polyfit(x,y,6);\np=polyval(c,xx);\nerr=norm(p-yy,inf);```',
      '```\nf=@(s) sin(s);\nx=linspace(0,1,5); y=f(x);\nxx=linspace(0,1,100);\nc=polyfit(x,y,6);\np=polyval(c,x);\nerr=norm(p-y,inf);```',
      '```\nf=@(s) sin(s);\nx=linspace(0,1,6); y=f(x);\nxx=linspace(0,1,100); yy=f(xx);\nc=polyfit(x,y,6);\np=polyval(c,xx);\nerr=norm(p-yy,inf);```',
      '```\nf=@(s) sin(s);\nx=linspace(0,1,6); y=f(x);\nxx=linspace(0,1,100);\nc=polyfit(x,y,6);\np=polyval(c,x);\nerr=norm(p-y,inf);```',
    ],
    correct: 0,
    explanation: 'Degree 6 needs **7 nodes**: `linspace(0,1,7)`. Error must be on the fine grid: `xx=linspace(0,1,100)`, `yy=f(xx)`, `p=polyval(c,xx)`, `err=norm(p-yy,inf)`. Only option **(a)** is fully correct.',
  },

  {
    id: 1112,
    isNew: true,
    topic: 'Splines',
    q: 'The couples of points $(x_i, y_i)$, $i = 1, \\ldots, n+1$ are assigned, with points $x_i$ equispaced in the interval $[a, b]$ with $a = x_1 < x_2 < \\ldots < x_{n+1} = b$. Consider the spline of order one $S_1$ interpolating such points.\n\nWhat is the value of the derivative of the spline evaluated in $b$, $S_1\'(b)$?',
    opts: [
      "$S_1'(a) = S_1'(b)$",
      '$0$',
      '$(y_{n+1} - y_n)/(b - a)$',
      '$n(y_{n+1} - y_n)/(b - a)$',
    ],
    correct: 3,
    explanation: 'A linear spline on $n$ equal subintervals of $[a,b]$ has step size $h = (b-a)/n$. On the last interval the slope is $(y_{n+1}-y_n)/h = n(y_{n+1}-y_n)/(b-a)$.',
  },
   {
    id: 1113,
    isNew: true,
    topic: 'Polynomial interpolation',
    q: 'The following points in the plane with coordinates $(0, 2)$, $(1, -2)$, $(2, 1/2)$, $(1/2, 1)$ are given.\n\nIn the Lagrange representation of the polynomial $p_3(x)$ interpolating the above points, which of the following expression denotes the Lagrange fundamental polynomial $\\ell_3(x)$ associated to the abscissa of the third point?',
    opts: [
      '$\\ell_3(x) = \\dfrac{(x-0)(x-2)(x-1/2)}{(2-0)(2-1)(2-1/2)}$',
      '$\\ell_3(x) = \\dfrac{(x+0)(x+1)(x+1/2)}{(2-0)(2-1)(2-1/2)}$',
      '$\\ell_3(x) = \\dfrac{(x-0)(x-1)(x-1/2)}{(2+0)(2+1)(2+1/2)}$',
      '$\\ell_3(x) = \\dfrac{(x-0)(x-1)(x-1/2)}{(2-0)(2-1)(2-1/2)}$',
    ],
    correct: 3,
    explanation: 'The Lagrange fundamental polynomial for the third node $x_3 = 2$ is $\\ell_3(x) = \\prod_{j \\neq 3} \\frac{x - x_j}{x_3 - x_j} = \\frac{(x-0)(x-1)(x-1/2)}{(2-0)(2-1)(2-1/2)}$.',
  },
  {
    id: 1114,
    isNew: true,
    topic: 'Splines',
    q: 'The couples of points $(x_i, y_i)$, $i = 1, \\ldots, n+1$ are assigned, with points $x_i$ equispaced in the interval $[a, b]$ with $a = x_1 < x_2 < \\ldots < x_{n+1} = b$. Consider the spline of order one $S_1$ interpolating such points.\n\nWhat is the value of the derivative of the spline evaluated in $a$, $S_1\'(a)$?',
    opts: [
      '$(y_2 - y_1)/(b - a)$ ',
      '$0$',
      '$n(y_2 - y_1)/(b - a)$',
      "$S_1'(a) = S_1'(b)$",
    ],
    correct: 2,
    explanation: 'A linear spline on $n$ equal subintervals of $[a,b]$ has step size $h = (b-a)/n$. On the first interval the slope is $(y_2 - y_1)/h = n(y_2 - y_1)/(b-a)$.',
  },
  {
    id: 1115,
    isNew: true,
    topic: 'Matrix operations',
    q: 'Let the matrix $A \\in \\mathbb{R}^{m,n}$ and the column vector $x \\in \\mathbb{R}^n$ be given.\n\nDenote by $y\\_5$ the fifth component of $y = Ax$, which one of the following MATLAB instructions computes $y\\_5$?',
    opts: [
      '`y_5=A(5,:)*x(5)`',
      '`y_5=A.*x(5)`',
      '`y_5=A(5,:)*x`',
      '`y_5=A(5,:).*x`',
    ],
    correct: 2,
    explanation: 'The fifth component of $y = Ax$ is the dot product of the fifth row of $A$ with the full vector $x$: `y_5 = A(5,:)*x`.',
  },
  {
    id: 1116,
    isNew: true,
    topic: 'Matrix operations',
    q: 'Let $A$ be a matrix with 3 columns. Which of the following MATLAB instructions returns the third column of $A$?',
    opts: [
      '`col(3,A)`',
      '`A(\'all\',3)`',
      '`col(A,3)`',
      '`A(:,end)`',
    ],
    correct: 3,
    explanation: '`A(:,end)` selects all rows of the last column of $A$. Since $A$ has 3 columns, `end` refers to column 3, so this returns the third column.',
  },
  {
    id: 1117,
    isNew: true,
    topic: 'Floating point',
    q: 'In exact arithmetic (base 10), the result of the multiplication $51.441 * 20.227$ represented in the normalized floating point notation is:',
    opts: [
      '$0.1040497107 * 10^4$',
      '$1.0405 * 10^5$',
      '$0.10405 * 10^3$',
      '$10.40497103 * 10^2$',
    ],
    correct: 0,
    explanation: '$51.441 \\times 20.227 = 1040.497107...$, which in normalized floating point notation is $0.1040497107 \\times 10^4$.',
  },
  {
    id: 1118,
    isNew: true,
    topic: 'Floating point',
    q: 'Consider a floating point arithmetic with $N = 10$, $t = 3$ digit reserved for the mantissa and rounding technique "rounding to even". Let $p$ be the mantissa and $\\bar{p}$ the corresponding machine mantissa. If $p = 0.24619$, then',
    opts: [
      '$\\bar{p} = 0.2462$',
      '$\\bar{p} = 0.2461$',
      '$\\bar{p} = 0.247$',
      '$\\bar{p} = 0.246$',
    ],
    correct: 3,
    explanation: 'With $t = 3$ digits and "round to even": $p = 0.24619$. The fourth digit is 1, which is less than 5, so we round down: $\\bar{p} = 0.246$.',
  },
  {
    id: 1119,
    isNew: true,
    topic: 'Floating point',
    q: 'Consider a floating point arithmetic with basis $N = 10$ and $t = 5$ digits for the mantissa.\n\nWhich of the following numbers, if added to $a = 0.45678$, produces numerical cancellation?',
    opts: [
      '$-0.4562312$',
      '$-0.456$',
      '$0.45623$',
      '$-0.45623e - 01$',
    ],
    correct: 0,
    explanation: 'Numerical cancellation occurs when two nearly equal numbers are subtracted. $-0.4562312$ is very close in magnitude to $a = 0.45678$, so their sum causes significant cancellation of significant digits.',
  },
  {
    id: 1120,
    isNew: true,
    topic: 'Matrix operations',
    q: 'Let the matrix $A \\in \\mathbb{R}^{m,n}$ and the column vector $x \\in \\mathbb{R}^n$ be given.\n\nDenote by $y\\_2$ the second component of $y = Ax$, which one of the following MATLAB instructions computes $y\\_2$?',
    opts: [
      '`y_2=A(2,:)*x(2)`',
      '`y_2=A.*x(2)`',
      '`y_2=A(2,:).*x`',
      '`y_2=A(2,:)*x`',
    ],
    correct: 3,
    explanation: 'The second component of $y = Ax$ is the dot product of the second row of $A$ with the full vector $x$: `y_2 = A(2,:)*x`.',
  },
  {
    id: 1121,
    isNew: true,
    topic: 'Matrix operations',
    q: 'Let the matrix $A \\in \\mathbb{R}^{m,n}$ and the column vector $x \\in \\mathbb{R}^n$ be given.\n\nDenote by $y\\_4$ the fourth component of $y = Ax$, which one of the following MATLAB instructions computes $y\\_4$?',
    opts: [
      '`y_4=A(4,:)*x(4)`',
      '`y_4=A.*x(4)`',
      '`y_4=A(4,:)*x`',
      '`y_4=A(4,:).*x`',
    ],
    correct: 2,
    explanation: 'The fourth component of $y = Ax$ is the dot product of the fourth row of $A$ with the full vector $x$: `y_4 = A(4,:)*x`.',
  },
  {
    id: 1122,
    isNew: true,
    topic: 'Matrix operations',
    q: 'Which of the following commands creates the linearly spaced vector of 10 elements between 0 and 1?',
    opts: [
      '`x = 0: 0.2: 1`',
      '`x = linspace(0,8,1)`',
      '`x = linspace(0,1,10)`',
      '`x = linspace(0,1,8)`',
      '`x = 0: 0.1: 1`',
    ],
    correct: 2,
    explanation: '`linspace(0,1,10)` creates exactly 10 linearly spaced points between 0 and 1 inclusive. `0:0.1:1` gives 11 points, and `0:0.2:1` gives 6 points.',
  },
  {
    id: 1123,
    isNew: true,
    topic: 'Polynomial interpolation',
    q: 'You are given the function $f(x) = \\cos(x^2)\\sin(x)$. You want to interpolate it over the interval $[0, \\pi]$ with a polynomial of order 9 built on 10 equally spaced nodes, and you want to plot the polynomial. What MATLAB command should you add, in place of the dots, to obtain such result?\n\n```\nx=linspace(0,pi,10)\n...\nc=polyfit(x,y,9)\nx_plot=linspace(0,pi)\ny_plot=polyval(c,x_plot)\nplot(x_plot,y_plot)\n```',
    opts: [
      '`y=cos(x^2)*sin(x)`',
      '`y=cos(x.^2).*sin(x)`',
      'The commands given above are wrong, they can never produce the result whatever I put in place of the dots',
      '`y=polyval(x,\'cos(x.^2).*sin(x)\')`',
    ],
    correct: 1,
    explanation: 'In MATLAB, element-wise operations on vectors require the dot notation: `cos(x.^2).*sin(x)`. Without the dots, `x^2` would attempt matrix multiplication and fail for a vector `x`.',
  },
 {
    id: 1124,
    isNew: true,
    topic: 'Polynomial interpolation',
    q: 'Consider the following set of MATLAB commands:\n```\nx=linspace(0,1)\ny=x.^2.*cos(x);\nplot(x,y)\n```\nThey:',
    opts: [
      'Plot the function $f(x) = x^2\\cos(x)$ over the interval $(0,1)$ using 100 function evaluations',
      'Plot the 99-th order polynomial interpolating $f(x) = x^2\\cos(x)$ over 100 equally spaced nodes on the interval $(0,1)$',
      'Are meaningless and will generate an error message',
      'Plot the cubic spline interpolating $f(x) = x^2\\cos(x)$ over 100 equally spaced nodes on the interval $(0,1)$',
    ],
    correct: 0,
    explanation: '`linspace(0,1)` with no third argument defaults to **100 points**. `y` is evaluated directly (no interpolation), and `plot(x,y)` plots the function — 100 evaluations of $f(x) = x^2\\cos(x)$.',
  },
  {
    id: 1125,
    isNew: true,
    topic: 'Splines',
    q: 'You are given the function $f(x) = \\log(x^2 + 1)$. You want to interpolate it over the interval $[-\\pi, \\pi]$ with a not-a-knot cubic spline built on 10 equal intervals (all with the same size) and you want to plot the spline. What MATLAB command should you add, in place of the dots, to obtain such result?\n\n```\nx=linspace(-pi,pi,11)\n...\nx_plot=linspace(-pi,pi)\ny_plot=spline(x,y,x_plot)\nplot(x_plot,y_plot)\n```',
    opts: [
      '`y=.log(x^2+1)`',
      '`y=log(x^2.+1)`',
      '`y=log(x^2+1)`',
      '`y=log(x.^2+1)`',
    ],
    correct: 3,
    explanation: 'In MATLAB, element-wise squaring of a vector requires the dot notation: `x.^2`. So the correct command is `y=log(x.^2+1)`. `log` in MATLAB computes the natural logarithm element-wise on vectors without needing a dot.',
  },

  {
    id: 1126,
    isNew: true,
    topic: 'QR factorization',
    q: 'We are given the factor $Q$ and $R$ of the QR factorization of a nonsingular matrix $A$ of dimensions $n \\times n$. We want to solve the $M$ linear systems $Ax_i = b_i$, $i = 1, \\ldots, M$, where the vectors $x_i$ are the columns of matrix $X$ and the vectors $b_i$ are the columns of matrix $B$. Which of the following MATLAB codes solves the considered problem?',
    opts: [
      '```\nfor i = 1:M\n  X(:,i) = R \\ (Q\'*B(:,i));\nend```',
      '```\nfor i = 1:M\n  X(:,i) = Q \\ (R\'*B(:,i));\nend```',
      '```\nfor i = 1:M\n  X(:,i) = A\\B(:,i);\nend```',
      '```\nfor i = 1:M\n  X(:,i) = (Q*R)\\B(:,i);\nend```',
    ],
    correct: 0,
    explanation: 'Since $A = QR$, solving $Ax = b$ means $QRx = b$, so $Rx = Q^T b$ (since $Q$ is orthogonal, $Q^{-1} = Q^T$). Thus `X(:,i) = R \\ (Q\'*B(:,i))` is correct.',
  },

  {
    id: 1127,
    isNew: true,
    topic: 'Splines',
    q: 'Consider the following set of Matlab commands:\n```\nx=linspace(-1,1,10);\nxx=linspace(-1,1);\ny=sin(pi*x);\nz=spline(x,y,xx);\n```\nWhat is their result?',
    opts: [
      'They compute and evaluate, at 100 equally spaced points in $[-1, 1]$, the not-a-knot spline interpolating the function $f(x) = \\sin(\\pi x)$ on 10 equally spaced points in $[-1, 1]$.',
      'They compute and evaluate, at 100 equally spaced points in $[-1, 1]$, the constrained cubic spline interpolating the function $f(x) = \\sin(\\pi x)$ on 10 equally spaced points in $[-1, 1]$.',
      'They compute the coefficients of the not-a-knot cubic spline by interpolating the function $f(x) = \\sin(\\pi x)$ into 10 equally spaced points in $[-1, 1]$.',
      'They compute the coefficients of the natural cubic spline by interpolating the function $f(x) = \\sin(\\pi x)$ into 10 equally spaced points in $[-1, 1]$.',
    ],
    correct: 0,
    explanation: '`spline(x,y,xx)` in MATLAB computes and evaluates the not-a-knot cubic spline at the points `xx`. Since `xx=linspace(-1,1)` has 100 points by default, it evaluates the spline at 100 equally spaced points.',
  },

  {
    id: 1128,
    isNew: true,
    topic: 'Eigenvalues',
    q: 'Let the matrix be given, and assume to apply the power method. Let be the approximation of the eigenvector corresponding to the eigenvalue of maximum modulus at step $m$.\n$$A = \\begin{pmatrix} 5 & 1 \\\\ 2 & 3 \\end{pmatrix}, \\quad Aw^{(m)} = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} \\lambda_1^m$$\nWhat is the value of $\\lambda_1^{(m)}$, that is the approximation of $\\lambda_1$ at step $m$?',
    opts: [
      '$-2$',
      '$6$',
      '$5$',
      '$0$',
    ],
    correct: 2,
    explanation: 'Using the Rayleigh quotient with $w^{(m)} = (1, 0)^T$: $\\lambda_1^{(m)} = \\frac{w^{(m)T} A w^{(m)}}{w^{(m)T} w^{(m)}} = \\frac{(1,0)\\begin{pmatrix}5&1\\\\2&3\\end{pmatrix}\\begin{pmatrix}1\\\\0\\end{pmatrix}}{(1,0)\\begin{pmatrix}1\\\\0\\end{pmatrix}} = \\frac{5}{1} = 5$.',
  },

  {
    id: 1129,
    isNew: true,
    topic: 'SVD',
    q: 'Given a matrix $A \\in R^{m,n}$, with $m \\neq n$, and its decomposition $U^T A V = S$, say which of the following statements is true:',
    opts: [
      '$S$, $U$ and $V$ are uniquely determined',
      '$S$ is uniquely determined',
      '$S$ is square and diagonal',
      '$S$ is orthogonal',
    ],
    correct: 1,
    explanation: 'In the SVD decomposition $U^T A V = S$, the matrix $S$ (containing the singular values) is uniquely determined — the singular values are unique. However $U$ and $V$ are not unique. Since $m \\neq n$, $S$ is not square.',
  },

  {
    id: 1130,
    isNew: true,
    topic: 'SVD',
    q: 'Assume that in Matlab you use the command `s=svd(A)`, with $A \\in \\mathbb{R}^{7 \\times 9}$, and you get the output `s = [5 3.1 1.45 1 0 0 0]`. What is the rank of the matrix $A$?',
    opts: [
      '$5$',
      '$1$',
      '$4$',
      '$7$',
    ],
    correct: 2,
    explanation: 'The rank equals the number of nonzero singular values. From `s = [5 3.1 1.45 1 0 0 0]`, there are 4 nonzero singular values, so $\\text{rank}(A) = 4$.',
  },

  {
    id: 1131,
    isNew: true,
    topic: 'Matrix operations',
    q: 'Let $A$ be a matrix with 5 columns. Which of the following MATLAB instructions returns the fifth column of $A$?',
    opts: [
      '`col(5,A)`',
      '`A(:,end)`',
      '`col(A,5)`',
      '`A(\'all\',5)`',
    ],
    correct: 1,
    explanation: '`A(:,end)` selects all rows of the last column of $A$. Since $A$ has 5 columns, `end` refers to column 5.',
  },

  {
    id: 1132,
    isNew: true,
    topic: 'LU factorization',
    q: 'Suppose the matrix\n$$A = \\begin{pmatrix} 1 & 3 & -2 \\\\ 0 & 0 & 1 \\\\ 0 & -1 & 3 \\end{pmatrix}$$\nis factorized as\n$$A = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 1 & 0 \\end{pmatrix} \\begin{pmatrix} 1 & 3 & -2 \\\\ 0 & -1 & 3 \\\\ 0 & 0 & 1 \\end{pmatrix}.$$\nWhat type of factorization does this represent?',
    opts: [
      'An SVD factorization',
      'A QR factorization',
      'An LU factorization',
      'A Choleski factorization',
    ],
    correct: 1,
    explanation: 'The first matrix is a permutation matrix $P$ (rows of identity reordered) and the second is upper triangular $U$. This is a QR factorization — specifically $A = P^T U$, which corresponds to an LU with pivoting. The correct answer shown is A QR factorization.',
  },

  {
    id: 1133,
    isNew: true,
    topic: 'Floating point',
    q: 'Consider a floating point arithmetic with basis $N = 10$ and $t = 5$ digits for the mantissa. Which of the following numbers, if added to $a = 0.45678$, produces numerical cancellation?',
    opts: [
      '$-0.456$',
      '$-0.4562312$',
      '$-0.45623e-01$',
      '$0.45623$',
    ],
    correct: 1,
    explanation: 'Numerical cancellation occurs when two nearly equal numbers are subtracted. $-0.4562312$ is very close in magnitude to $a = 0.45678$, so their sum causes significant cancellation of significant digits.',
  },

  {
    id: 1134,
    isNew: true,
    topic: 'Matrix operations',
    q: 'Among the following Matlab commands, which one allows to depict the function $f(x) = x^2 e^x$ over the interval $[0, 1]$?',
    opts: [
      '`x=linspace(0,1); y=x.^2.*e^x; plot(x,y)`',
      '`x=0:1; y=x.^2 .*exp(x); plot(x,y)`',
      '`x=linspace(0,1); y=x.^2.*exp(x); plot(x,y)`',
      '`x=0:0.1:1; y=x.^2.*e^x; plot(x,y)`',
    ],
    correct: 2,
    explanation: '`linspace(0,1)` creates 100 points by default, `x.^2` performs element-wise squaring, and `exp(x)` is the correct MATLAB function for $e^x$. The `.*` operator applies element-wise multiplication.',
  },

  {
    id: 1135,
    isNew: true,
    topic: 'Matrix operations',
    q: 'Let the matrix $A \\in R^{m,n}$ and the column vector $x \\in R^n$ be given.\n\nDenote by $y\\_3$ the third component of $y = Ax$, which one of the following MATLAB instructions computes $y\\_3$?',
    opts: [
      '`y_3=A(3,:).*x`',
      '`y_3=A(3,:).*x(3)`',
      '`y_3=A.*x(3)`',
      '`y_3=A(3,:)*x`',
    ],
    correct: 3,
    explanation: 'The third component of $y = Ax$ is the dot product of the third row of $A$ with the full vector $x$: `y_3 = A(3,:)*x`.',
  },

  {
    id: 1136,
    isNew: true,
    topic: 'Eigenvalues',
    q: 'Let the matrix\n$$A = \\begin{pmatrix} 4 & 1 \\\\ 5 & 6 \\end{pmatrix}$$\nbe given, and assume to apply the power method to $A$. Let $w^{(m)} = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$ be the approximation of the eigenvector corresponding to the eigenvalue of maximum modulus $\\lambda_1$ at step $m$.\n\nWhat is the value of $\\lambda_1^{(m)}$, that is the approximation of $\\lambda_1$ at step $m$?',
    opts: [
      '$7$',
      '$16$',
      '$4$',
    ],
    correct: 2,
    explanation: 'Using the Rayleigh quotient with $w^{(m)} = (1,0)^T$: $\\lambda_1^{(m)} = \\frac{w^{(m)T} A w^{(m)}}{w^{(m)T} w^{(m)}} = (1,0)\\begin{pmatrix}4\\\\5\\end{pmatrix} / 1 = 4$.',
  },

  {
    id: 1137,
    isNew: true,
    topic: 'Eigenvalues',
    q: 'Given a matrix $A$ of dimension $n \\times n$, assume one applies to $A$ the inverse power method, with the aim of finding the eigenvalue $\\lambda$ closest to $p = 3$ and the corresponding eigenvector $x$. Let `wk` be a MATLAB variable containing the approximation of $x$ at the $k$-th iteration of the method.\n\nWhich one of the following MATLAB instructions creates a variable `lambdak` containing the approximation of $\\lambda$ at step $k$?',
    opts: [
      '`zk = (A - 3*eye(n))\\wk; lambdak = 3 - 1/(wk\'*zk);`',
      '`zk = (A + 3*eye(n))\\wk; lambdak = 3 - 1/(wk\'*zk);`',
      '`zk = (A - 3*eye(n))\\wk; lambdak = 3 + 1/(wk\'*zk);`',
      '`zk = (A + 3*eye(n))\\wk; lambdak = 3 + 1/(wk\'*zk);`',
    ],
    correct: 2,
    explanation: 'The inverse power method shifted by $p=3$ solves $(A - 3I)z_k = w_k$, giving `zk = (A - 3*eye(n))\\wk`. The eigenvalue approximation is $\\lambda_k = p + 1/(w_k^T z_k)$, so `lambdak = 3 + 1/(wk\'*zk)`.',
  },

  {
    id: 1138,
    isNew: true,
    topic: 'LU factorization',
    q: 'Assume the $P$, $L$, $U$ factors of the $PA = LU$ decomposition of a given matrix $A$ are available.\n\nWhich one of the following sets of Matlab commands allows to compute the solution of the linear system $Ax = b$, with a given $b$?',
    opts: [
      '`a = L\\b; x = U\\(P*a);`',
      '`a = U\\(L*b); x = P\\a;`',
      '`a = U\\(P*b); x = L\\a;`',
      '`a = L\\(P*b); x = U\\a;`',
    ],
    correct: 3,
    explanation: 'From $PA = LU$, solving $Ax = b$ becomes $LUx = Pb$. First solve $La = Pb$: `a = L\\(P*b)`, then solve $Ux = a$: `x = U\\a`.',
  },

  {
    id: 1139,
    isNew: true,
    topic: 'Polynomial interpolation',
    q: 'We want to approximate the function $f(x) = e^x$ on the interval $[-1, 1]$ with the corresponding interpolating polynomial $p$ of maximum degree **8** on equispaced nodes, and we want to estimate the interpolation error, by computing the infinite norm of the difference between $f$ and $p$ in **100** equispaced nodes in $[-1, 1]$. The correct sequence of MATLAB instructions is:',
    opts: [
      '```\nf=@(s) exp(s);\nx=linspace(-1,1,8);\ny=f(x);\nxx=linspace(-1,1,100);\nyy=f(xx);\nc=polyfit(x,y,8);\np=polyval(c,xx);\nerr=norm(p-yy,inf);```',
      '```\nf=@(s) exp(s);\nx=linspace(-1,1,8);\ny=f(x);\nxx=linspace(-1,1,100);\nyy=f(xx);\nc=polyfit(x,y,8);\np=polyval(c,xx);\nerr=norm(p-yy,inf);```',
      '```\nf=@(s) exp(s);\nx=linspace(-1,1,9);\ny=f(x);\nxx=linspace(-1,1,100);\nyy=f(xx);\nc=polyfit(x,y,8);\np=polyval(c,xx);\nerr=norm(p-yy,inf);```',
      '```\nf=@(s) exp(s);\nx=linspace(-1,1,9);\ny=f(x);\nxx=linspace(-1,1,100);\nyy=f(xx);\nc=polyfit(x,y,8);\np=polyval(c,xx);\nerr=norm(p-yy,inf);```',
    ],
    correct: 2,
    explanation: 'Degree 8 needs **9 nodes**: `linspace(-1,1,9)`. Error must be computed on the fine grid `xx` with `yy=f(xx)` and `err=norm(p-yy,inf)`.',
  },

  {
    id: 1140,
    isNew: true,
    topic: 'SVD',
    q: 'Given a matrix $A \\in R^{m,n}$, with $m \\neq n$, and its decomposition $U^T A V = S$, say which of the following statements is true:',
    opts: [
      '$U$ and $V$ are uniquely determined',
      '$S$ is square',
      '$U$ and $V$ are orthogonal',
      '$S$ is square and diagonal',
    ],
    correct: 2,
    explanation: 'In the SVD, $U$ and $V$ are orthogonal matrices by definition. Since $m \\neq n$, $S$ is not square — it is rectangular with singular values on the main diagonal. $U$ and $V$ are not unique.',
  },

  {
    id: 1141,
    isNew: true,
    topic: 'Choleski factorization',
    q: 'We are given a matrix $A \\in R^{n,n}$, symmetric and positive definite, and its Choleski factorization $A = R^T R$. Which one of the following statements is surely correct?',
    opts: [
      '$R$ is an upper triangular matrix with nonnegative elements on the main diagonal',
      '$R^T$ is a lower triangular matrix with positive elements on the main diagonal',
      '$R^T$ is a lower triangular matrix with nonnegative elements on the main diagonal',
      '$R$ is a lower triangular matrix with positive elements on the main diagonal',
    ],
    correct: 1,
    explanation: 'In the Choleski factorization $A = R^T R$, $R$ is upper triangular with **positive** diagonal elements (since $A$ is positive definite). Therefore $R^T$ is lower triangular with positive elements on the main diagonal.',
  },
  {
  id: 1142,
  isNew: true,
  topic: 'Cholesky Decomposition',

  q: 'We are given a matrix $A \\in R^{n,n}$, symmetric and positive definite, and its Choleski factorization $A = R^T R$. Which one of the following statements is surely correct?',

  opts: [
    'The computational cost of the factorization is essentially $n^3/3$',
    'The computational cost of the factorization is essentially $n^3$',
    'The computational cost of the factorization is essentially $n^3/6$',
    'The computational cost of the factorization is essentially $2n^3/3$',
  ],

  correct: 2,

  explanation: 'The computational cost of the factorization is essentially $n^3/6$.',
},
{
  id: 1143,
  isNew: true,
  topic: 'Lagrange Interpolation',

  q: 'The following points in the plane with coordinates $(0,2)$, $(1,-2)$, $(2,1/2)$, $(1/2,1)$ are given.\n\nIn the Lagrange representation of the polynomial $p_3(x)$ interpolating the above points, which of the following expression denotes the Lagrange fundamental polynomial $\\ell_3(x)$ associated to the abscissa of the third point?',

  opts: [
    '$\\ell_3(x)=\\dfrac{(x-0)(x-1)(x-1/2)}{(2+0)(2+1)(2+1/2)}$',
    '$\\ell_3(x)=\\dfrac{(x+0)(x+1)(x+1/2)}{(2-0)(2-1)(2-1/2)}$',
    '$\\ell_3(x)=\\dfrac{(x-0)(x-1)(x-1/2)}{(2-0)(2-1)(2-1/2)}$',
    '$\\ell_3(x)=\\dfrac{(x-0)(x-2)(x-1/2)}{(2-0)(2-1)(2-1/2)}$',
  ],

  correct: 2,

  explanation: '$\\ell_3(x)=\\dfrac{(x-0)(x-1)(x-1/2)}{(2-0)(2-1)(2-1/2)}$.',
},
{
  id: 1144,
  isNew: true,
  topic: 'Eigenvalues',

  q: 'Which of the following MATLAB instructions calculates the spectral radius $\\rho$ of a square matrix $A$?',

  opts: [
    'max(eig(A))',
    'max(abs(eig(A)))',
    'min(abs(eig(A)))',
    'min(eig(A))',
  ],

  correct: 1,

  explanation: 'The spectral radius is $\\rho(A)=\\max |\\lambda_i|$, therefore the correct MATLAB instruction is `max(abs(eig(A)))`.',
},

];


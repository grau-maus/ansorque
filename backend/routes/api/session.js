// NPM PACKAGES
const express = require('express');
const asyncHandler = require('express-async-handler');

// LOCAL IMPORTS
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


// SESSION ROUTES:----------------------------------------------------------------
// Log in
router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);


// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);
// SESSION ROUTES:----------------------------------------------------------------




// BROWSER CONSOLE CODE TO TEST ROUTES:--------------------------------------------
// MAKE SURE TO GET THE 'XSRF-TOKEN' AND REPLACE `<value of XSRF-TOKEN cookie>`
// USER LOGIN VIA USERNAME:
// fetch('/api/session', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//   },
//   body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
// }).then(res => res.json()).then(data => console.log(data));

// USER LOGIN VIA EMAIL:
// fetch('/api/session', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//   },
//   body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
// }).then(res => res.json()).then(data => console.log(data));

// USER LOGIN WITH INVALID CREDENTIALS:
// fetch('/api/session', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//   },
//   body: JSON.stringify({ credential: 'Demo-lition', password: 'Hello World!' })
// }).then(res => res.json()).then(data => console.log(data));

// USER LOGOUT:
// fetch('/api/session', {
//   method: 'DELETE',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//   }
// }).then(res => res.json()).then(data => console.log(data));
// BROWSER CONSOLE CODE TO TEST ROUTE:--------------------------------------------



module.exports = router;

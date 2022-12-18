// NPM PACKAGES
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

// LOCAL IMPORTS
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();




// CUSTOM MIDDLEWARE:-------------------------------------------------------------
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];
// CUSTOM MIDDLEWARE:-------------------------------------------------------------




// USERS ROUTES:----------------------------------------------------------------
// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }),
);
// USERS ROUTES:----------------------------------------------------------------




// BROWSER CONSOLE CODE TO TEST ROUTES:--------------------------------------------
// MAKE SURE TO GET THE 'XSRF-TOKEN' AND REPLACE `<value of XSRF-TOKEN cookie>`
// SIGNING UP AS A NEW USER:
// fetch('/api/users', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//   },
//   body: JSON.stringify({
//     email: 'spidey@spider.man',
//     username: 'Spidey',
//     password: 'password'
//   })
// }).then(res => res.json()).then(data => console.log(data));

// SIGNING UP AS A NEW USER WITH AN EXISTING EMAIL:
// fetch('/api/users', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//   },
//   body: JSON.stringify({
//     email: 'demo@user.io',
//     username: 'NEW-USER',
//     password: 'password'
//   })
// }).then(res => res.json()).then(data => console.log(data));

// SIGNING UP AS A NEW USER WITH AN EXISTING USERNAME:
// fetch('/api/users', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//   },
//   body: JSON.stringify({
//     email: 'demo5555@user.io',
//     username: 'Demo-lition',
//     password: 'password'
//   })
// }).then(res => res.json()).then(data => console.log(data));

// SIGNUP AS A NEW USER WITH AN EMPTY PASSWORD FIELD:
// fetch('/api/users', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//   },
//   body: JSON.stringify({
//     email: 'spidey@spider.man',
//     username: 'Spidey',
//     password: ''
//   })
// }).then(res => res.json()).then(data => console.log(data));
// BROWSER CONSOLE CODE TO TEST ROUTE:--------------------------------------------







module.exports = router;

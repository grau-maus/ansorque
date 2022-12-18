const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;



// SETS THE JWT COOKIE AFTER A USER IS LOGGED IN OR SIGNED UP.
// TAKES THE RESPONSE (res) AND SESSION USER (user) AND GENERATES A JWT USING THE IMPORTED SECRET VIA "const { jwtConfig } = require('../config');"
const setTokenCookie = (res, user) => {
  // CREATES THE TOKEN
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) }, // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // SETS THE TOKEN COOKIE
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

// RESTORES THE SESSION USER BASED ON THE CONTENTS OF THE JWT COOKIE
const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

// RETURN AN ERROR IF THERE IS NO CURRENT USER.
// EXPRESS MIDDLEWARE. NOTICE THE ARRAY CONTAINING FUNCTIONS.
const requireAuth = [
  restoreUser,
  function (req, res, next) {
    if (req.user) return next();

    const err = new Error('Unauthorized');

    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;

    return next(err);
  },
];




module.exports = {
  setTokenCookie,
  restoreUser,
  requireAuth
};

const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const questionsRouter = require('./questions.js');
const answersRouter = require('./answers.js');


router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/questions', questionsRouter);

router.use('/answers', answersRouter);





// API TEST ROUTES:-------------------------------------------------------------------------
// ROUTE ACCEPTS REQUESTS WITH THE URL PATH OF '/api/test' WITH THE HTTP VERB OF 'POST'.
// SENDS JSON RESPONSE OF THE CONTENTS OF THE REQUEST BODY.
// ALSO USED FOR FRONTEND TESTING TO CHECK CSRF FUNCTIONALITY.
// router.post('/test', function (req, res) {
//   res.json({ requestBody: req.body })
// });


// GET /api/set-token-cookie
// const asyncHandler = require('express-async-handler');
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     },
//   })
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));


// GET /api/restore-user
// const { restoreUser } = require('../../utils/auth.js');
// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


// GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );
// API TEST ROUTES:-------------------------------------------------------------------------







module.exports = router;

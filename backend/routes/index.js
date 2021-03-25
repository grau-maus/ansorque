const express = require('express');
const router = express.Router();

// API:------------------------------
const apiRouter = require('./api');
router.use('/api', apiRouter);
// API:------------------------------


// INITIAL TEST ROUTE:
// router.get('/hello/world', function (req, res) {
//   // SET A COOKIE ON THE RESPONSE WITH THE NAME OF 'XSRF-TOKEN' TO THE VALUE OF THE 'req.csrfToken' METHOD'S RETURN
//   res.cookie('XSRF-TOKEN', req.csrfToken());

//   // SEND THE TEXT 'Hello World!' AS THE RESPONSE'S BODY
//   res.send('Hello World!');
// });

module.exports = router;

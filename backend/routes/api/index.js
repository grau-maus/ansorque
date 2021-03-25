const router = require('express').Router();




// API TEST ROUTE.
// ROUTE ACCEPTS REQUESTS WITH THE URL PATH OF '/api/test' WITH THE HTTP VERB OF 'POST'.
// SENDS JSON RESPONSE OF THE CONTENTS OF THE REQUEST BODY.
router.post('/test', function (req, res) {
  res.json({ requestBody: req.body })
});










module.exports = router;

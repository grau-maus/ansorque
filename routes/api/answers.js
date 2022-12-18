// NPM PACKAGES
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

// LOCAL IMPORTS
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Question, Answer, User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();




router.get(
  '/',
  asyncHandler(async (req, res) => {
    const answers = await Answer.findAll({
      where: { questionId: 1 },
      include: [User]
    });

    return res.json({
      answers
    });
  })
);







module.exports = router;

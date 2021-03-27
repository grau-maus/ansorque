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
    const questions = await Question.findAll({
      include: [Answer, User]
    });

    return res.json({
      questions
    });
  })
);







module.exports = router;

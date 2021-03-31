// NPM PACKAGES
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const Sequelize = require('sequelize');

// LOCAL IMPORTS
const Op = Sequelize.Op;
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

// ROUTE FOR HANDLING SEARCH QUERIES
router.get(
  '/:query',
  asyncHandler(async (req, res) => {
    const query = req.params.query;
    const questions = await Question.findAll({
      where: {
        title: {
          [Op.iLike]: `%${query}%`
        }
      }
    });

    return res.json({ questions });
  })
);

// ROUTE FOR HANDLING SINGLE QUESTION PAGE
router.get(
  '/single/:questionUrl',
  asyncHandler(async (req, res) => {
    const questionUrl = req.params.questionUrl;
    let question = await Question.findOne({
      where: {
        questionUrl
      },
      include: [User, {
        model: Answer,
        include: [User]
      }]
    });

    if (!question) {
      return res.json({ question: 'error' });
    } else {
      return res.json({ question });
    }
  })
);





module.exports = router;

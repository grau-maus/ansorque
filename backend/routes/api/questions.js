// NPM PACKAGES
const express = require('express');
const { nanoid } = require('nanoid');
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
      include: [User, {
        model: Answer,
        include: [User]
      }],
      where: {
        id: {
          [Op.between]: [1, 100]
        }
      }
    });

    if (questions.length < 1) {
      questions = ['no results'];

      return res.json({
        questions
      });
    } else {
      return res.json({
        questions
      });
    }
  })
);

router.get(
  '/:nextPage',
  asyncHandler(async (req, res, next) => {
    try {
      const nextPage = parseInt(req.params.nextPage, 10);
      const questions = await Question.findAll({
        include: [User, {
          model: Answer,
          include: [User]
        }],
        where: {
          id: {
            [Op.between]: [nextPage + 1, nextPage + 100]
          }
        }
      });

      if (questions.length < 1) {
        questions = ['no results'];

        return res.json({
          questions
        });
      } else {
        return res.json({
          questions
        });
      }
    } catch (e) {

      next(e);
    }
  })
);

router.get(
  '/search/:query',
  asyncHandler(async (req, res) => {
    const query = req.params.query;
    let questions = await Question.findAll({
      include: [User, {
        model: Answer,
        include: [User]
      }],
      where: {
        title: {
          [Op.iLike]: `%${query}%`
        }
      },
      limit: 100
    });

    if (questions.length < 1) {
      questions = ['no results'];

      return res.json({
        questions
      });
    } else {
      return res.json({
        questions
      });
    }
  })
);

router.get(
  '/search/:query/:nextPage',
  asyncHandler(async (req, res) => {
    const query = req.params.query;
    const nextPage = parseInt(req.params.nextPage, 10);
    let questions = await Question.findAll({
      include: [User, {
        model: Answer,
        include: [User]
      }],
      where: {
        title: {
          [Op.iLike]: `%${query}%`
        },
        id: {
          [Op.between]: [nextPage + 1, nextPage + 100]
        }
      },
      limit: 100
    });

    if (questions.length < 1) {
      questions = ['no results'];

      return res.json({
        questions
      });
    } else {
      return res.json({
        questions
      });
    }
  })
);

// requireAuth validation to parse request and be able
// to access current logged in user via req.user
// available attributes: [id, username, email, createdAt, updatedAt]
router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { content } = req.body;
    const question = await Question.create({
      questionUrl: nanoid(),
      title: content,
      userId: req.user.id
    });

    return res.json({
      question
    });
  }));



module.exports = router;

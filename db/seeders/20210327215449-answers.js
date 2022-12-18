"use strict";
const txtgen = require("txtgen");
const { Random } = require("random-js");
const { Answer } = require("../models");
const random = new Random();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const answerCount = await Answer.count();

    if (!answerCount) {
      const answers = [];

      for (let i = 0; i < 9000; i++) {
        const randomContent = random.integer(0, 1)
          ? txtgen.sentence()
          : txtgen.paragraph();

        answers.push({
          content: randomContent,
          userId: random.integer(1, 50),
          questionId: random.integer(1, 950),
        });
      }

      return queryInterface.bulkInsert("Answers", answers, {});
    }
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
    return queryInterface.bulkDelete("Answers", null, {});
  },
};

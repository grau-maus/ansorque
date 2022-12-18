"use strict";
const { nanoid } = require("nanoid");
const { Random } = require("random-js");
const { Question } = require("../models");
const random = new Random();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const numQuestions = await Question.count();
    const questions = [];

    if (!numQuestions) {
      for (let i = 0; i < 950; i++) {
        questions.push({
          questionUrl: nanoid(),
          title: "What are magnets??",
          userId: random.integer(1, 50),
        });
      }

      return queryInterface.bulkInsert("Questions", questions, {});
    }
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
    return queryInterface.bulkDelete("Questions", null, {});
  },
};

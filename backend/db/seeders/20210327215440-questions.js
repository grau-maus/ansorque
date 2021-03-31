'use strict';
const { nanoid } = require('nanoid');
const randomQuestion = require('random-question');
const { Random } = require('random-js');
const random = new Random();

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
      */

    let questions = [];

    for (let i = 0; i < 500; i++) {
      questions.push({
        questionUrl: nanoid(),
        title: randomQuestion.randomQuestion(),
        userId: random.integer(1, 450)
      });
    }

    return queryInterface.bulkInsert('Questions', questions, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
    return queryInterface.bulkDelete('Questions', null, {});
  }
};

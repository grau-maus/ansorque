'use strict';
const faker = require('faker');
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
    let answers = [];

    for (let i = 0; i < 1500; i++) {
      answers.push({
        content: faker.lorem.sentence(),
        userId: random.integer(1, 450),
        questionId: random.integer(1, 498)
      });
    }

    return queryInterface.bulkInsert('Answers', answers, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
    return queryInterface.bulkDelete('Answers', null, {});
  }
};

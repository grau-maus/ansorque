"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoUser = await User.findByPk(1);

    if (!demoUser || demoUser.username !== "Demo-lition") {
      let fakeUsers = [];

      for (let i = 0; i < 49; i++) {
        fakeUsers.push({
          email: faker.internet.email(),
          username: faker.internet.userName(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        });
      }

      return queryInterface.bulkInsert(
        "Users",
        [
          {
            email: "demo@user.io",
            username: "Demo-lition",
            hashedPassword: bcrypt.hashSync("password"),
          },
          ...fakeUsers,
        ],
        {}
      );
    }
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
    return queryInterface.bulkDelete("Users", null, {});

    //   const Op = Sequelize.Op;
    //   return queryInterface.bulkDelete('Users', {
    //     username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    //   }, {});
  },
};

'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      email: 'john.doe@email.com',
      username: 'John Doe',
      roles: JSON.stringify(["ROLE_USER"]),
      password: await bcrypt.hash('password', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      email: 'john.doe2@email.com',
      username: 'John Doe2',
      roles: JSON.stringify(["ROLE_USER"]),
      password: await bcrypt.hash('password', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      email: 'moderator@email.com',
      username: 'Moderator',
      roles: JSON.stringify(["ROLE_MODERATOR"]),
      password: await bcrypt.hash('password', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};

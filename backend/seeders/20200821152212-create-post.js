'use strict';

const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await db.User.findAll();
    const posts = [];
    for (const user of users) {
      for (let i = 0; i < 2; i++) {
        posts.push({
          content: 'Hello',
          ownerId: user.id,
          createdAt: new Date(new Date().setDate(new Date().getDate() - user.id)),
          updatedAt: new Date(new Date().setDate(new Date().getDate() - user.id)),
        })
      }
    }
    await queryInterface.bulkInsert('posts', posts, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('posts', null, {});
  }
};

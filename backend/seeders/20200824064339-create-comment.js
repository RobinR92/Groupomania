'use strict';

const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await db.User.findAll();
    const posts = await db.Post.findAll();
    const comments = [];
    for (let post of posts) {
      for (let user of users) {
        comments.push({
          message: 'Hello',
          ownerId: user.id,
          postId: post.id,
          createdAt: new Date(new Date().setDate(new Date().getDate() - user.id)),
          updatedAt: new Date(new Date().setDate(new Date().getDate() - user.id)),
        });
      }
    }
    await queryInterface.bulkInsert('comments', comments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});
  }
};

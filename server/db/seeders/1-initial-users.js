'use strict';

const { User} = require('../models');
const { hashSync } = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        name: 'Admin',
        email: 'admin@mail.com',
        password: hashSync('Admin', 10),
        isAdmin: true,
        role: 'Администратор',
        avatarField: '',
      }
      
    ]);

  },

  async down(queryInterface, Sequelize) {
   
    await User.destroy({
      where: {
        id: { [Sequelize.Op.gt]: 0 },
      },
    });

  },
};

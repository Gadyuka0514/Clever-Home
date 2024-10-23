'use strict';

const {  House } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await House.bulkCreate([
      {
        houseName: 'Мой дом - моя крепость!',
        userId: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
   
    await House.destroy({
      where: {
        id: { [Sequelize.Op.gt]: 0 },
      },
    });

  },
};

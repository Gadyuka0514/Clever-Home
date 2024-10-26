'use strict';

const { Room} = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await Room.bulkCreate([
     {
       roomName: 'Прихожая',
       isActive: true,
       state: 'Активно',
       useCaseId: null,
       houseId: 1,
     },
     {
       roomName: 'Гостиная',
       isActive: true,
       state: 'Активно',
       useCaseId: null,
       houseId: 1,
     },
     {
       roomName: 'Спальня',
       isActive: true,
       state: 'Активно',
       useCaseId: null,
       houseId: 1,
     },
     {
       roomName: 'Детская',
       isActive: true,
       state: 'Активно',
       useCaseId: null,
       houseId: 1,
     },
     {
       roomName: 'Кухня',
       isActive: true,
       state: 'Активно',
       useCaseId: null,
       houseId: 1,
     },
     {
       roomName: 'Ванная комната',
       isActive: true,
       state: 'Активно',
       useCaseId: null,
       houseId: 1,
     },
     {
       roomName: 'Гардероб',
       isActive: true,
       state: 'Активно',
       useCaseId: null,
       houseId: 1,
     },
   ]);
  },

  async down (queryInterface, Sequelize) {
    await Room.destroy({
      where: {
        id: { [Sequelize.Op.gt]: 0 },
      },
    });
  }
};

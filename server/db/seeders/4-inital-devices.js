'use strict';

const { Device } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Device.bulkCreate([
      {
        deviceName: 'Yeelight Ceiling Light',
        roomValue: 'Прихожая',
        roomNativeValue: 1,
        isActive: true,
        state: 'Активно',
        useCaseId: null,
      },
      {
        deviceName: 'Yeelight Ceiling Light',
        roomValue: 'Гостиная',
        roomNativeValue: 2,
        isActive: true,
        state: 'Активно',
        useCaseId: null,
      },
      {
        deviceName: 'Яндекс ТВ Станция Про с Алисой',
        roomValue: 'Гостиная',
        roomNativeValue: 2,
        isActive: true,
        state: 'Активно',
        useCaseId: null,
      },
      {
        deviceName: 'Сплит-система Viomi Cross',
        roomValue: 'Гостиная',
        roomNativeValue: 2,
        isActive: true,
        state: 'Активно',
        useCaseId: null,
      },
      {
        deviceName: 'Сплит-система Viomi Cross',
        roomValue: 'Гостиная',
        roomNativeValue: 2,
        isActive: true,
        state: 'Активно',
        useCaseId: null,
      },
      {
        deviceName: 'Умный электрический чайник Viomi',
        roomValue: 'Кухня',
        roomNativeValue: 5,
        isActive: true,
        state: 'Активно',
        useCaseId: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Device.destroy({
      where: {
        id: { [Sequelize.Op.gt]: 0 },
      },
    });
  },
};

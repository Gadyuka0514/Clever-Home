'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      deviceName: {
        type: Sequelize.STRING,
      },
      roomValue: {
        type: Sequelize.STRING,
      },
      roomNativeValue: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Rooms',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      state: {
        type: Sequelize.STRING,
        defaultValue: 'Активно',
      },
      useCaseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UseCases',
          key: 'id',
        },
        allowNull: true,
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Devices');
  }
};
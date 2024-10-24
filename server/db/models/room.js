'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate({ House, Device, UseCase, Event }) {
      this.belongsTo(House, { foreignKey: 'houseId' });
      this.hasMany(Device, { foreignKey: 'roomNativeValue' });
      this.belongsTo(UseCase, { foreignKey: 'useCaseId' });
      this.hasMany(Event, { foreignKey: 'roomId' });
    }
  }
  Room.init(
    {
      roomName: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      state: DataTypes.STRING,
      useCaseId: DataTypes.INTEGER,
      houseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Room',
    },
  );
  return Room;
};
'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    static associate({Room, UseCase, Event}) {
      this.belongsTo(Room, { foreignKey: 'roomNativeValue' });
      this.belongsTo(UseCase, { foreignKey: 'useCaseId' });
      this.hasMany(Event, { foreignKey: 'deviceId' });
    }
  }
  Device.init({
    deviceName: DataTypes.STRING,
    roomValue: DataTypes.STRING,
    roomNativeValue: DataTypes.INTEGER,    
    isActive: DataTypes.BOOLEAN,
    state: DataTypes.STRING,
    useCaseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Device',
  });
  return Device;
};
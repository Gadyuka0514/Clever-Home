'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Device.init({
    DeviceName: DataTypes.STRING,
    RoomValue: DataTypes.STRING,
    RoomNativeValue: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    State: DataTypes.STRING,
    UseCaseID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Device',
  });
  return Device;
};
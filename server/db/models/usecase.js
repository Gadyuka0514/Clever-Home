'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UseCase extends Model {
    static associate({Room, Device}) {
      this.hasMany(Room, {foreignKey: 'useCaseId'});
      this.hasMany(Device, { foreignKey: 'useCaseId' });
    }
  }
  UseCase.init({
    useCaseName: DataTypes.STRING,
    description: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UseCase',
  });
  return UseCase;
};
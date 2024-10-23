'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UseCase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UseCase.init({
    UseCaseName: DataTypes.STRING,
    Description: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    State: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UseCase',
  });
  return UseCase;
};
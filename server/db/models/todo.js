'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    static associate({House}) {
      this.belongsTo(House, {foreignKey: 'houseId'})
    }
  }
  ToDo.init(
    {
      description: DataTypes.STRING,
      houseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ToDo',
    },
  );
  return ToDo;
};
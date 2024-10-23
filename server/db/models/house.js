'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  House.init(
    {
      houseName: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'House',
    },
  );
  return House;
};

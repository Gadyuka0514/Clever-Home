'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    static associate({ User, ToDo, Event }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.hasMany(ToDo, { foreignKey: 'houseId' });
      this.hasMany(Event, { foreignKey: 'roomId' });
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

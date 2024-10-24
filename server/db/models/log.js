'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    static associate({Event}) {
      this.belongsTo(Event, { foreignKey: 'eventId' });
    }
  }
  Log.init({
    eventId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Log',
  });
  return Log;
};
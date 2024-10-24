'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate({User, House, Room, Device, Log}
    ) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(House, { foreignKey: 'houseId' });
      this.belongsTo(Room, { foreignKey: 'roomId' });
      this.belongsTo(Device, { foreignKey: 'deviceId' });
      this.hasMany(Log, { foreignKey: 'eventId' });
    }
  }
  Event.init({
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    deviceId: DataTypes.INTEGER,
    houseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
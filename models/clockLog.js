const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');

ClockLog = sequelize.define('clockLog', {
  username: Sequelize.STRING,
  timeClockedIn: Sequelize.STRING,
  timeClockedOut: Sequelize.STRING,
  hoursWorked: Sequelize.INTEGER,
})

module.exports = (sequelize, DataTypes) => {
  return ClockLog;
}

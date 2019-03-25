const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');

ClockLog = sequelize.define('clockLog', {
  username: Sequelize.STRING,
  timeClockedIn: Sequelize.STRING,
  timeClockedOut: Sequelize.STRING,
  hoursWorked: Sequelize.INTEGER,
  latitudeClockedIn: Sequelize.STRING,
  longitudeClockedIn: Sequelize.STRING,
  latitudeClockedOut: Sequelize.STRING,
  longitudeClockedOut: Sequelize.STRING,
  ipClockedIn: Sequelize.STRING,
  ipClockedOut: Sequelize.STRING
})

module.exports = (sequelize, DataTypes) => {
  return ClockLog;
}

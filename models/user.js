const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');

User = sequelize.define('user', {
  username: { type: Sequelize.STRING, unique: true },
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  password: Sequelize.STRING,
  rewardpoints: Sequelize.INTEGER,
  rewardBalance: Sequelize.DOUBLE,
  accountType: Sequelize.INTEGER,
  addressId: Sequelize.INTEGER,
  email: Sequelize.STRING,
  status: Sequelize.INTEGER,
  minutesIn: Sequelize.DOUBLE,
  hoursIn: Sequelize.DOUBLE,
  minutesOut: Sequelize.DOUBLE,
  hoursOut: Sequelize.DOUBLE,
  hoursWorked: Sequelize.INTEGER,
  totalHoursWorked: Sequelize.INTEGER,
  hourlyRate: Sequelize.DOUBLE,
  stripe_id: { type: Sequelize.STRING, primaryKey: true },
})

module.exports = (sequelize, DataTypes) => {
  return User;
}

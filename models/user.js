const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');

User = sequelize.define('user', {
  username: { type: Sequelize.STRING, unique: true },
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  password: Sequelize.STRING,
  rewardpoints: Sequelize.INTEGER,
  accountType: Sequelize.INTEGER,
  addressId: Sequelize.INTEGER,
  hoursWorked: Sequelize.INTEGER,
  status: Sequelize.INTEGER,
  totalHoursWorked: Sequelize.INTEGER,
  email: Sequelize.STRING,
  stripe_id: { type: Sequelize.STRING, primaryKey: true },
})

module.exports = (sequelize, DataTypes) => {
  return User;
}

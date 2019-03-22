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
  email: Sequelize.STRING,
  status: Sequelize.INTEGER,
  hoursWorked: Sequelize.INTEGER,
  totalHoursWorked: Sequelize.INTEGER,
  stripe_id: { type: Sequelize.STRING, primaryKey: true },
})

module.exports = (sequelize, DataTypes) => {
  return User;
}

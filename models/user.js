const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');

User = sequelize.define('user', {
  username: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  password: Sequelize.STRING,
  rewardpoints: Sequelize.INTEGER,
  accountType: Sequelize.INTEGER,
  addressId: Sequelize.INTEGER,
  email: Sequelize.STRING,
  stripe_id: Sequelize.STRING,
})

module.exports = (sequelize, DataTypes) => {
  return User;
}

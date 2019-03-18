const Sequelize = require('sequelize');
const sequelize = require('./sequelizeConf.js');

User = sequelize.define('user', {

  username: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  password: Sequelize.STRING,
  rewardpoints: Sequelize.INTEGER,
  accountType: Sequelize.INTEGER,
  addressId: Sequelize.INTEGER

})

User.prototype.addPoints = function (points) {
  console.log("adding points to " + this.username)
  this.rewardpoints += points;
}

module.exports = (sequelize, DataTypes) => {
  return User;
}



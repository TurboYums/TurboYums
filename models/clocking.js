const Sequelize = require('sequelize');
const sequelize = require('./sequelizeConf.js');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('clocking', {

    username: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    password: Sequelize.STRING,
    rewardpoints: Sequelize.INTEGER,
    accountType: Sequelize.INTEGER,
    addressId: Sequelize.INTEGER
  
	/*"Clock Table"
	Foreign Key to User
	Time stamp in
	Time stamp out
	*/
  })
}

const Sequelize = require('sequelize');
const sequelize = require('./sequelizeConf.js');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('clocking', {

    username: Sequelize.STRING,
    timeIn: Sequelize.STRING,
    timeOut: Sequelize.STRING,
    location: Sequelize.STRING,
    status: Sequelize.STRING,
    hoursWorked: Sequelize.DOUBLE,
    wage: Sequelize.DOUBLE,
    expectedPay: Sequelize.DOUBLE
	  
	/*"Clock Table"
	Foreign Key to User
	Time stamp in
	Time stamp out
	*/
  })
}

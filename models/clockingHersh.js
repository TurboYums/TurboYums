//Hersh Shrivastava
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

var employee = {
    username: Sequelize.STRING,
    timeIn: Sequelize.STRING,
    timeOut: Sequelize.STRING,
    location: Sequelize.STRING,
    status: Sequelize.STRING,
    hoursWorked: Sequelize.DOUBLE,
    wage: Sequelize.DOUBLE,
    expectedPay: Sequelize.DOUBLE,
    
}
employee.hoursWorked = function(){
    hoursWorked = (this.timeOut - this.timeIn);
    return hoursWorked;
}
employee.salary = function(){
    if (this.status=="part-time"){
        this.expectedPay= this.expectedPay+ 
        (this.hoursWorked * this.wage);
    }
    else if (this.status == "full-time"){
        this.expectedPay = 52 * 5 * this.hoursWorked * this.wage;
    }

    return this.expectedPay;
}


//I don't know what I'm doing, sorry.


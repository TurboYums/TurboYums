const Sequelize = require('sequelize');
const sequelize = require('./sequelizeConf.js');

Clocking = sequelize.define('clocking', {

    username: Sequelize.STRING,
    time: Sequelize.STRING,
    location: Sequelize.STRING,
    hoursWorked: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
    totalHoursWorked: Sequelize.INTEGER
  })

  module.exports = (sequelize, DataTypes) => {
    return Clocking;
  }

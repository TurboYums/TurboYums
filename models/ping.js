const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');

Ping = sequelize.define('ping', {
  from: Sequelize.STRING,
  description: Sequelize.STRING,
})

module.exports = (sequelize, DataTypes) => {
  return Ping;
}
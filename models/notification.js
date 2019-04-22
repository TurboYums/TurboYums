const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');

Notification = sequelize.define('notification', {
  from: Sequelize.STRING,
  description: Sequelize.STRING,
})

module.exports = (sequelize, DataTypes) => {
  return Notification;
}
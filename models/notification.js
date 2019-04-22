const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');

Notifications = sequelize.define('notifications', {
  from: Sequelize.STRING,
  description: Sequelize.STRING,
})

module.exports = (sequelize, DataTypes) => {
  return Notifications;
}
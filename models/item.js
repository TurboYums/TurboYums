const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');

Item = sequelize.define('item', {
  itemName: Sequelize.STRING,
  itemPrice: Sequelize.DOUBLE,
  ingredient: Sequelize.STRING,
  description: Sequelize.STRING,
  rating: Sequelize.INTEGER
})

module.exports = (sequelize, DataTypes) => {
  return Item;
}
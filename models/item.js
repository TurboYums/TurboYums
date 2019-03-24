const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');

Item = sequelize.define('item', {
  itemName: { type: Sequelize.STRING, unique: true },
  itemPrice: Sequelize.DOUBLE,
  ingredient: Sequelize.STRING,
  description: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  category: Sequelize.STRING
})

module.exports = (sequelize, DataTypes) => {
  return Item;
}
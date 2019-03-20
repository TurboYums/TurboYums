const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');
const Order = sequelize.import('../models/order.js');

Item = sequelize.define('item', {
  itemName: Sequelize.STRING,
  itemPrice: Sequelize.DOUBLE,
  ingredient: Sequelize.STRING,
  description: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  foodID: Sequelize.DOUBLE,
  itemQuantity: Sequelize.INTEGER
})
Item.belongsToMany(Order, { through: 'OrderItem' });
module.exports = (sequelize, DataTypes) => {
  return Item;
}
const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');
const Item = sequelize.import('../models/item.js');

Order = sequelize.define('order', {
  totalPrice: Sequelize.DOUBLE,
  specialReuest: Sequelize.STRING
})

Order.belongsToMany(Item, { through: 'OrderItem' });
module.exports = (sequelize, DataTypes) => {
  return Order;
}
const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');

const Item = sequelize.import('../models/item.js');
const OrderItem = sequelize.import('../models/orderitem.js');

Order = sequelize.define('order', {
  totalPrice: Sequelize.DOUBLE,
  specialRequest: Sequelize.STRING,
  status: Sequelize.STRING
})

Order.belongsTo(User);
Order.belongsToMany(Item, { through: {model: OrderItem, unique: false}});
module.exports = (sequelize, DataTypes) => {
  return Order;
}

const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');

const Item = sequelize.import('../models/item.js');
const OrderItem = sequelize.define('order_item'); 

Order = sequelize.define('order', {
  totalPrice: Sequelize.DOUBLE,
  specialReuest: Sequelize.STRING
})
Order.belongsTo(User);
Order.belongsToMany(Item, { through: OrderItem });
module.exports = (sequelize, DataTypes) => {
  return Order;
}

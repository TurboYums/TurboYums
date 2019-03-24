const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');
const Order = sequelize.import('../models/order.js');

Item = sequelize.define('item', {
  itemName: Sequelize.STRING,
  itemPrice: Sequelize.DOUBLE,
  ingredient: Sequelize.STRING,
  description: Sequelize.STRING,
<<<<<<< HEAD
  rating: Sequelize.INTEGER,
  foodID: Sequelize.DOUBLE,
  itemQuantity: Sequelize.INTEGER
})
Item.belongsToMany(Order, { through: 'OrderItem' });
=======
  rating: Sequelize.INTEGER
})

>>>>>>> c70180b3139ae14e347389fee7a009f8c6a99a85
module.exports = (sequelize, DataTypes) => {
  return Item;
}
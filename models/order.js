const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');
<<<<<<< HEAD
const Item = sequelize.import('../models/item.js');

=======

const Item = sequelize.import('../models/item.js');
const OrderItem = sequelize.define('order_item'); 

>>>>>>> c70180b3139ae14e347389fee7a009f8c6a99a85
Order = sequelize.define('order', {
  totalPrice: Sequelize.DOUBLE,
  specialReuest: Sequelize.STRING
})
<<<<<<< HEAD

Order.belongsToMany(Item, { through: 'OrderItem' });
module.exports = (sequelize, DataTypes) => {
  return Order;
}
=======
Order.belongsTo(User);
Order.belongsToMany(Item, { through: OrderItem });
module.exports = (sequelize, DataTypes) => {
  return Order;
}
>>>>>>> c70180b3139ae14e347389fee7a009f8c6a99a85

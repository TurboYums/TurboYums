const api = require('./api.js');
const sequelize = require('../models/sequelizeConf.js');
const Order = sequelize.import('../models/order.js');
sequelize.sync();

api.post('/api/order/create', (req, res) => {
  newOrder = Order.create({
        totalPrice: Sequelize.DOUBLE,
        orderedItems: Sequelize.Item,
        specialReuest: Sequelize.STRING
  })
})
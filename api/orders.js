const api = require('./api.js');
const sequelize = require('../models/sequelize.js');
const Order = sequelize.import('../models/order.js');

api.post('/api/order/create', (req, res) => {
  Order.create({
        totalPrice: req.body.totalPrice,
        orderedItems: req.body.orderedItems,
        specialReuest: req.body.specialRequest
  }).then(newOrder =>{
    res.send(newOrder);
  })
})

api.post('/api/order/add', (req, res) => {
  newOrder = Order.create({
        totalPrice: req.body.totalPrice,
        orderedItems: Sequelize.Item,
        specialReuest: Sequelize.STRING
  })
})
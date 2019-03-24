const api = require('./api.js');
const sequelize = require('../models/sequelize.js');

const Order = sequelize.import('../models/order.js');
const Item = sequelize.import('../models/item.js');

api.post('/api/order/create', (req, res) => {
  Order.create({
    totalPrice: req.body.totalPrice,
    specialRequest: req.body.specialRequest,
    userId: req.body.userId 
  }).then(newOrder => {
    res.send(newOrder);
  })
})

api.post('/api/order/add', (req, res) => {
  Order.findOne({ where: { id: req.body.orderId } }).then(order => {
    Item.findOne({ where: { id: req.body.itemId } }).then(item => {
      console.log(order);
      console.log(item);
      order.addItem(item);
      order.increment('totalPrice', {by:item.itemPrice});
      res.send({ text: `Item Added:  ${item.itemName}` });
    })
  })
})
// remove an item from order
/*api.post('/api/order/remove', (req, res) => {
  Order.findOne({ where: { id: req.body.orderId } }).then(order => {
    Item.findOne({ where: { id: req.body.itemId } }).then(item => {
      console.log(order);
      console.log(item);
      order.removeItem(item);
      order.decrement('totalPrice', {by:item.itemPrice});
    })
  })
})*/

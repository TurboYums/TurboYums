const api = require('./api.js');
const sequelize = require('../models/sequelize.js');

const Order = sequelize.import('../models/order.js');
const Item = sequelize.import('../models/item.js');
const OrderItem = sequelize.import('../models/orderitem.js');

api.post('/api/order/create', (req, res) => {
  Order.create({
    totalPrice: req.body.totalPrice,
    specialRequest: req.body.specialRequest,
    userId: req.body.userId,
    status: 'ordering',
    active: 0
  }).then(newOrder => {
    res.send({ order: newOrder });
  })
})

api.post('/api/order/add', (req, res) => {
  Order.findOne({ where: { id: req.body.orderId } }).then(order => {
    Item.findOne({ where: { id: req.body.itemId } }).then(item => {
      order.increment('totalPrice', { by: item.itemPrice }).then(incorder => {
        OrderItem.create({
          orderId: incorder.id,
          itemId: item.id
        }).then(() => {
          incorder.getItems().then(items => {
            res.send({ order: incorder, items: items })
          })
        })
      })
    })
  })
})

api.post('/api/order/getOrders', (req, res) => {
  Order.findAll({ where: { active: 1 } }).then(orders => {
      res.send({ orders: orders})
  })
})

api.post('/api/order/getItems', (req, res) => {
  Order.findOne({ where: { id: req.body.orderId } }).then(order => {
    order.getItems().then(items => {
      res.send({ order: order, items: items })
    })
  })
})

api.post('/api/order/remove', (req, res) => {
  OrderItem.removeAttribute(req.body.OrderItemId).then( ()=> {
    res.send({sucess: true})
  })
})

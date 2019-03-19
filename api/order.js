const api = require('./api.js');
const sequelize = require('../models/sequelizeConf.js');
const Item = sequelize.import('../models/order.js');
sequelize.sync();

api.post('/api/order/create', (req, res) => {
  newOrder = Item.create({
        totalPrice: Sequelize.DOUBLE,
        orderedItems: Sequelize.Item,
        specialReuest: Sequelize.STRING
  })
})
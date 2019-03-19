const api = require('./api.js');
const sequelize = require('../models/sequelizeConf.js');
const Item = sequelize.import('../models/item.js');
sequelize.sync();

api.post('/items/create', (req, res) => {
  newItem = Item.create({
    itemName: req.body.itemName,
    itemPrice: req.body.itemPrice,
    ingredient: req.body.ingredient,
    description: req.body.description,
    rating: req.body.rating,
	foodID: req.body.foodId,
    itemQuantity: req.body.itemQuantity
  })
  res.send({ text: `Created Item: ${req.body.itemName}` });
})

  
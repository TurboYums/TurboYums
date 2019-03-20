const api = require('./api.js');
const sequelize = require('../models/sequelize.js');
const Item = sequelize.import('../models/item.js');

api.post('/api/items/create', (req, res) => {
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


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
  })
  res.send({ text: `Created Item: ${req.body.itemName}`});
})

api.get('/api/items/get', (req,res)=>{
  item = Item.findOne({where: { itemName: req.body.itemName }}) 
  res.send(item.itemId) 
})
//filter
/*api.post('/api/items/filter', (req, res) => {
    Item.findAll({ where: { id: req.body.itemId } }).then(item => {
      console.log(item);
    })
})*/

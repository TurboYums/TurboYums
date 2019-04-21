const api = require('./api.js');
const sequelize = require('../models/sequelize.js');
const Item = sequelize.import('../models/item.js');
const googleTranslate = require('google-translate')(api.google_translate_api_key);

api.post('/api/items/create', (req, res) => {
  Item.create({
    itemName: req.body.itemName,
    category: req.body.category,
    itemPrice: req.body.itemPrice,
    ingredient: req.body.ingredient,
    description: req.body.description,
    rating: req.body.rating,
  }).then(newItem => {
    res.send({ 
      creationSuccess: true,
      text: `Created Item: ${newItem.username}`,
      item: newItem 
    });
  })
})

api.post('/api/items/remove', (req, res) => {
  Item.destroy({
    where: {
      id: req.body.id
    }
  }),then (deletedItem => {
    res.send({item: deletedItem});
  })
})

api.post('/api/items/edit', (req, res) => {
  Item.findOne({where: {id: req.body.id}
  }),then (deletedItem => {
    res.send({item: deletedItem});
  })
})

api.post('/api/items/getAll', (req, res) => {
  Item.findAll({group: ['category', 'id']}).then(items => {
    if(req.body.translate == true){
      googleTranslate.translate(JSON.stringify(items), req.body.translate_target, function(err, translation) {
        res.send(err);
        //res.send(translation.translatedText);
      });
    }
    //res.send({items: items})
  })
})


//filter
/*api.post('/api/items/filter', (req, res) => {
    Item.findAll({ where: { id: req.body.itemId } }).then(item => {
      console.log(item);
    })
})*/

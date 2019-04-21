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
      itemName: req.body.itemName
    }
  }).then (deletedItem => {
    res.send({
      creationSuccess: true,
      text: `Deleted Item: ${deletedItem}`,
      item: deletedItem
    });
  })
})

api.post('/api/items/editName', (req, res) => {
  Item.findOne({where: {itemName: req.body.itemName}
  }).then (item => {
    item.update({
      itemName: req.body.updatedName
    })
    res.send({
      item: item,
      nameChange: true
    });

  })
})

api.post('/api/items/editPrice', (req, res) => {
  Item.findOne({where: {itemName: req.body.itemName}
  }).then (item => {
    item.update({
      itemPrice: req.body.updatedPrice
    })
    res.send({
      item: item,
      priceChange: true
    });

  })
})

api.post('/api/items/editDescription', (req, res) => {
  Item.findOne({where: {itemName: req.body.itemName}
  }).then (item => {
    item.update({
      description: req.body.updatedDesc
    })
    res.send({
      item: item,
      descChange: true
    });

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

const api = require('./api.js');
const sequelize = require('../models/sequelize.js');
const Item = sequelize.import('../models/item.js');
const { Translate } = require('@google-cloud/translate');
const projectId = 'YOUR_PROJECT_ID';
const translate = new Translate({
  projectId: projectId,
});


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
  }).then(deletedItem => {
    res.send({
      creationSuccess: true,
      text: `Deleted Item: ${deletedItem}`,
      item: deletedItem
    });
  })
})

api.post('/api/items/editName', (req, res) => {
  Item.findOne({
    where: { itemName: req.body.itemName }
  }).then(item => {
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
  Item.findOne({
    where: { itemName: req.body.itemName }
  }).then(item => {
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
  Item.findOne({
    where: { itemName: req.body.itemName }
  }).then(item => {
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
  Item.findAll({ group: ['category', 'id'] }).then(items => {
    if (req.body.translate == true) {
      translate
        .translate(JSON.stringify(items), req.body.target)
        .then(results => {
          const translation = results[0];
          console.log(translation);
          console.log(`Translation: ${JSON.parse(translation)}`);
          res.send({ items: translation.replace("\\", "") })
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
    } else {
      res.send({ items: items });
    }
  })
})


//filter
/*api.post('/api/items/filter', (req, res) => {
    Item.findAll({ where: { id: req.body.itemId } }).then(item => {
      console.log(item);
    })
})*/

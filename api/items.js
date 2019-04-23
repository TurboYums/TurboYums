const api = require('./api.js');
const sequelize = require('../models/sequelize.js');
const Item = sequelize.import('../models/item.js');

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

api.get('/api/items/getAll', (req, res) => {
  Item.findAll({group: ['category', 'id']}).then(items => {
    res.send({items: items})
  })
})

api.post('/api/items/filterCheese',(req,res)=> {
  const opN = sequelize.Op.notLike;
  const opA = sequelize.Op.any;
  filters= req.body.filters
  Item.findAll({where:{
    ingredient:{
      [opN]:'%cheese%'
    }
  }, group:['category','id']}).then(items=>{
    res.send({items:items})
  })
}) 


api.post('/api/items/filterItem',(req,res)=> {
  const opN = sequelize.Op.notLike;
  const opA = sequelize.Op.any;
  filters= req.body.filters
  Item.findAll({where:{
    ingredient:{
      [opN]:{
        [opA]:req.body.filters
      }
    }
  }, group:['category','id']}).then(items=>{
    res.send({items:items})
  })
}) 

api.post('/api/items/filter',(req,res)=> {
  const opN = sequelize.Op.notLike;
  const opA = sequelize.Op.any;
  filters= req.body.filters
  var query = "SELECT * FROM turboyums.items WHERE"
  // WHERE ingredient NOT LIKE '%basil%'
  //   AND ingredient NOT LIKE '%nuts%'
  //   AND ingredient NOT LIKE '%soy%' "
  if(filters.length>0){
    for(var index in filters){
      if(index==0){
        query+= " ingredient NOT LIKE "+" \'%"+filters[index]+"%\'";
      }else{
        query+= " AND ingredient NOT LIKE "+" \'%"+filters[index]+"%\'";
      }
    }
    query+"GROUP BY category, id;"
    sequelize.query(query).then(items=>{
      res.send({items:items})
    })
  }else{ //no filters
    Item.findAll({group: ['category', 'id']}).then(items => {
      res.send({items: items})
    })
  }
}) 


//filter
/*api.post('/api/items/filter', (req, res) => {
    Item.findAll({ where: { id: req.body.itemId } }).then(item => {
      console.log(item);
    })
})*/

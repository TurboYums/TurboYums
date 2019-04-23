const api = require('./api.js');
const sequelize = require('../models/sequelize.js');
const Ping = sequelize.import('../models/ping.js');


api.post('/api/pings/create', (req, res) => {
  Ping.create({
    from: req.body.from,
    description: req.body.description,
  }).then(newPing => {
    res.send({
      creationSuccess: true,
      text: `Created Ping`,
      Ping: newPing
    });
  })
})

api.post('/api/pings/clear', (req, res) => {
 Ping.destroy({
    where: { description: req.body.description }
    }).then(deletedPing => { 
    res.send({
      deletionSuccess: true,
      ping: deletedPing
    });

  })
})

api.post('/api/pings/getAll', (req, res) => {
  Ping.findAll({ group: ['from', 'id'] }).then(pings => {
   /* if (req.body.translate == true) {
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
    } else {*/
      res.send({ pings: pings });
    //}
  })
})

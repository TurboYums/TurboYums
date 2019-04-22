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

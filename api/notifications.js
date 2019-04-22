const api = require('./api.js');
const sequelize = require('../models/sequelize.js');
const Notification = sequelize.import('../models/notification.js');


api.post('/api/notifications/create', (req, res) => {
  Notification.create({
    from: req.body.from,
    description: req.body.description,
  }).then(newPing => {
    res.send({
      creationSuccess: true,
      text: `Created Notification: ${newPing.description}`,
      Ping: newPing
    });
  })
})

api.post('/api/notifications/clear', (req, res) => {
  Notification.destroy({
    where: { description: req.body.description }
    }).then(deletedPing => { 
    res.send({
      deletionSuccess: true,
      notification: deletedPing
    });

  })
})

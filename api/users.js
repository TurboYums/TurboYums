const api = require('./api.js');
const sequelize = require('../models/sequelize.js');
const User = sequelize.import('../models/user.js');

const stripe = require('stripe')(config.stripe.STRIPE_SECRET_KEY);

api.post('/api/users/create', (req, res) => {
  stripe.customers.create({
    email: req.body.email,
  }).then(customer => {
    User.create({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      accountType: req.body.accountType,
      rewardpoints: 0,
      email: req.body.email,
      stripe_id: `${customer.id}`
    }).then(newUser => {
      res.send({ text: `Created User:  ${newUser.username}` });
    })
    
  })
})

api.post('/api/users/addpoints', (req, res) => {
  User.findOne({ where: { username: req.body.username } }).then(user => {
    console.log("adding points to " + user);
    user.increment('rewardpoints', { by: req.body.rewardpoints });

    user.reload().then(() => {
      res.send({ text: `Gave user: ${req.body.username} , ${user.rewardpoints}` });
    })

  })

})
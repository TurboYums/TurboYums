const config = require('../config.json');

const api = require('./api.js');
const sequelize = require('../models/sequelize.js');

const stripe = require('stripe')(config.stripe.STRIPE_SECRET_KEY);

const Source = sequelize.import('../models/source.js');

api.post('/api/sources/create', (req, res) => {
  console.log('here 11')
  stripe.tokens.create({
    card: {
      number: req.body.number || '4242424242424242',
      exp_month: req.body.exp_month || 12,
      exp_year: req.body.exp_year || 2020,
      cvc: req.body.cvc || '123'
    }
  }, function (err, token) {
    console.log(req.body.user)
    stripe.customers.createSource(
      req.body.user.stripe_id,
      { source: token.id },
      function (err, card) {
        console.log('here 24')
        Source.create({
          stripe_id: card.id,
          user_stripe_id: req.body.user.stripe_id,

          type: req.body.type,
          firstname: req.body.user.firstname,
          lastname: req.body.user.lastname,
          billingAddress: req.body.billingAddress,
          cvv: req.body.cvc,
          expDate: req.body.expDate,
        }).then(newSource => {
          res.send({source: newSource});
        })
      }
    )
  })
})

api.post('/api/sources/get', (req, res) => {
  Source.findAll({ where: { user_stripe_id: req.body.user.stripe_id } }).then(sources => {
    res.send({sources: sources});;
  })
})

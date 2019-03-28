const config = require('../config.json');

const api = require('./api.js');
const sequelize = require('../models/sequelize.js');

const stripe = require('stripe')(config.stripe.STRIPE_SECRET_KEY);

const Source = sequelize.import('../models/source.js');

api.post('/api/sources/create', (req, res) => {
  stripe.tokens.create({
    card: {
      number: req.body.number || '4242424242424242',
      exp_month: req.body.exp_month || 12,
      exp_year: req.body.exp_year || 2020,
      cvc: req.body.cvc || '123'
    }
  }, function (err, token) {
    stripe.customers.createSource(
      req.body.user.stripe_id,
      { source: token.id },
      function (err, card) {
        Source.create({
          stripe_id: card.id,
          user_stripe_id: req.body.user.stripe_id,
          type: req.body.type,
          firstname: req.body.user.firstname,
          lastname: req.body.user.lastname,
          billingAddress: req.body.billingAddress,
          cvv: req.body.cvc,
          expDate: req.body.expDate,
          last4: req.body.number.substr(req.body.number.length - 4)
        }).then(newSource => {
          res.send({source: newSource});
        }).catch( function(err) {
          res.send({error: err});
        })
      }
    )
    res.send({source: token, error: err});
  })
})

api.post('/api/sources/get', (req, res) => {
  Source.findAll({ where: { user_stripe_id: req.body.user.stripe_id } }).then(sources => {
    res.send({sources: sources});;
  })
})

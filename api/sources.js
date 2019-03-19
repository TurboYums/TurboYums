const config = require('../config.json');

const api = require('./api.js');
const sequelize = require('../models/sequelize.js');

const stripe = require('stripe')(config.stripe.STRIPE_SECRET_KEY);

const Source = sequelize.import('../models/source.js');

api.post('/api/sources/create', (req, res) => {

  stripe.tokens.create({
    card: {
      number: '4242424242424242',
      exp_month: 12,
      exp_year: 2020,
      cvc: '123'
    }
  }, function (err, token) {
    stripe.customers.createSource(
      req.body.user_stripe_id,
      { source: token.id },
      function (err, card) {
        Source.create({
          stripe_id: card.id,
          user_stripe_id: req.body.user_stripe_id,

          type: req.body.type,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          billingAddress: req.body.billingAddress,
          cvv: req.body.cvv,
          expDate: req.body.expDate,
        }).then(newSource => {
          res.send({ text: `Payment method created, payment method: ` + newSource.stripe_id });
        })
      }
    )
  })
})

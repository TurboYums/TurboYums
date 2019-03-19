const config = require('../config.json');

const api = require('./api.js');
const sequelize = require('../models/sequelize.js');

const stripe = require('stripe')(config.stripe.STRIPE_SECRET_KEY);

const Source = sequelize.import('../models/source.js');

api.post('/sources/create', (req, res) => {
  stripe.customers.createSource(req.body.user_stripe_id, {
    source: req.body.source_stripe_id
  })

  Source.create({
      source_stripe_id: req.body.stripe_id,
      user_stripe_id: req.body.user_stripe_id,

      type: req.body.type,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      billingAddress: req.body.billingAddress,
      cvv: req.body.cvv,
      expDate: req.body.expDate,
  }).then(newSource => {
    res.send({ text: `Payment method created, payment method: ` + newSource.source_stripe_id });
  })

})

api.post('/api/payemnts/doPayments', (req, res) => {
  return stripe.charges
    .create({
      amount: req.body.amount, // Unit: cents
      currency: 'usd',
      source: req.body.tokenId,
      description: 'Test payment',
    }).then(result => res.status(200).json(result));
});

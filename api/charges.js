const config = require('../config.json');

const api = require('./api.js');
const sequelize = require('../models/sequelize.js');

const stripe = require('stripe')(config.stripe.YOUR_STRIPE_SECRET_KEY);

const Charge = sequelize.import('../models/charge.js');

api.post('/api/charges/create', (req, res) => {
  stripe.charges.create({
    amount: req.body.amount, // Unit: cents
    currency: req.body.currency,
    source: req.body.source_stripe_id,
    description: req.body.description,
  }).then(newCharge => {
    newCharge = Charge.create({
      stripe_id: req.body.stripe_id,
      amount: req.body.amount,
      balance_transaction: req.body.balance_transaction,
      captured: req.body.captured,
      created: req.body.created,
      currency: req.body.currency,
      customer: req.body.customer,
      description: req.body.description,
      failure_code: req.body.failure_code,
      failure_message: req.body.failure_message,
      livemode: req.body.livemode,
      order: req.body.order,
      outcome: req.body.outcome,
      paid: req.body.paid,
      receipt_email: req.body.receipt_email,
      receipt_number: req.body.receipt_number,
      receipt_url: req.body.receipt_url,
      review: req.body.review,
      source_transfer: req.body.source_transfer,
      statement_descriptor: req.body.statement_descriptor,
      status: req.body.status,
      source_stripe_id: req.body.source_stripe
    })
    res.status(200).json(newCharge)
  }
  );
})


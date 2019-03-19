api = require('./api/api.js');
const YOUR_STRIPE_SECRET_KEY = 'sk_test_cW9V3gjCQODa4sMNLTDRSO6G000Qzn0zv2';
const stripe = require('stripe')(YOUR_STRIPE_SECRET_KEY);
const Charge = sequelize.import('../models/charge.js');
sequelize.sync();


api.post('/api/charges/create', (req, res) => {
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
    paid: req.body,paid,
    receipt_email: req.body.receipt_email,
    receipt_number: req.body,receipt_number,
    receipt_url: req.body.receipt_url,
    review: req.body.review,
    source_transfer: req.body.source_transfer,
    statement_descriptor: req.body.statement_descriptor,
    status: req.body.status,
  })
  res.send({ text: `New charge created ` + newCharge.id });
})


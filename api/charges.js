const config = require('../config.json');

const api = require('./api.js');
const sequelize = require('../models/sequelize.js');

const stripe = require('stripe')(config.stripe.STRIPE_SECRET_KEY);

const Charge = sequelize.import('../models/charge.js');
const User = sequelize.import('../models/user.js');
const Order = sequelize.import('../models/order.js');

api.post('/api/charges/create', (req, res) => {
  Order.findOne({ where: { id: req.body.order_id } }).then(order => {
  if(order && order.status != "ordering"){
    res.send({err: "Order has already been paid for."})
    return;
  }
  const charge = stripe.charges.create({
    amount: req.body.amount, // Unit: cents
    currency: req.body.currency,
    source: req.body.token,
    description: req.body.description,
    customer: req.body.customer
  }, function (err, newCharge) {
    Charge.create({
      stripe_id: newCharge.id,
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
      order: req.body.order_id,
      outcome: req.body.outcome,
      paid: req.body.paid,
      receipt_email: req.body.receipt_email,
      receipt_number: req.body.receipt_number,
      receipt_url: req.body.receipt_url,
      review: req.body.review,
      source_transfer: req.body.source_transfer,
      statement_descriptor: req.body.statement_descriptor,
      status: req.body.status,
      source_stripe_id: req.body.source_stripe_id,
      customer: req.body.customer
    }).then(newChargeModel => {
      console.log("searching for " + req.body.customer);
      User.findOne({ where: { stripe_id: req.body.customer } }).then(user => {
        console.log("adding points to " + user.stripe_id);
        earnedRewards = config.rewards.rewardEarnedPerTransaction + Math.floor(config.rewards.rewardEarnedPerDollarSpent * newChargeModel.amount * 100);
        user.increment('rewardpoints', { by: earnedRewards });
        user.reload().then(() => {
            if (user.rewardpoints >= config.requiredCountForReward) {
              user.increment('rewardBalance', { by: config.rewards.rewardValue });
              user.rewardpoints = 0;
              user.save().then(() => {
                order.status = "Paid";
                order.active = 1;
                order.save().then( () => {
                  res.send({ user: user, charge: newChargeModel });
                });
              });
            } else {
              order.status = "Paid";
              order.active = 1;
              order.save().then(() => {
                res.send({ user: user, charge: newChargeModel });
              });
            }
          })
        })
      })
    })
  }
  )
});
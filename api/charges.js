const config = require('../config.json');

const api = require('./api.js');
const sequelize = require('../models/sequelize.js');

const stripe = require('stripe')(config.stripe.STRIPE_SECRET_KEY);

const Charge = sequelize.import('../models/charge.js');
const User = sequelize.import('../models/user.js');

api.post('/api/charges/create', (req, res) => {
  
    console.log(token);
    console.log(err);
    const charge = stripe.charges.create({
      amount: req.body.amount, // Unit: cents
      currency: req.body.currency,
      source: token.id,
      description: req.body.description,
      //customer: req.body.customer
    }, function (err, newCharge) {
      console.log(err);
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
        source_stripe_id: req.body.source_stripe_id,
        customer: req.body.customer
      }).then(newChargeModel => {
        console.log("seraching for " + req.body.customer);
        User.findOne({ where: { stripe_id: req.body.customer } }).then(user => {
          console.log("adding points to " + user.stripe_id);
          user.increment('rewardpoints', { by: 1 });
          user.reload().then(() => {
            res.send({ text: `Gave user: ${req.body.username} , ${user.rewardpoints}` });
          })
        })
      })
    }
    );
  });
  
 
})


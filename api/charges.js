api = require('./api/api.js');
const YOUR_STRIPE_SECRET_KEY = 'sk_test_cW9V3gjCQODa4sMNLTDRSO6G000Qzn0zv2';
const stripe = require('stripe')(YOUR_STRIPE_SECRET_KEY);
const Charge = sequelize.import('../models/charge.js');
sequelize.sync();


api.post('/api/charges/create', (req, res) => {
    newCharge = Charge.create({
      type: req.body.type,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      billingAddress: req.body.billingAddress,
      cvv: req.body.cvv,
      expDate:req.body.expDate,
      userId: req.body.userId
    })
    res.send({ text: `Payment method created, payment method: ` + newPaymentMethod.ID});
  })


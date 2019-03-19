api = require('./api/api.js');
const YOUR_STRIPE_SECRET_KEY = 'sk_test_cW9V3gjCQODa4sMNLTDRSO6G000Qzn0zv2';
const stripe = require('stripe')(YOUR_STRIPE_SECRET_KEY);

api.post('/api/payemnts/doPayments', (req, res) => {
  return stripe.charges
    .create({
      amount: req.body.amount, // Unit: cents
      currency: 'usd',
      source: req.body.tokenId,
      description: 'Test payment',
    }).then(result => res.status(200).json(result));
});

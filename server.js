const api = require('./api/api.js');
const sequelize = require('./models/sequelizeConf.js');
const User = sequelize.import('./models/user.js');
const users = require('./api/users.js');
const port = process.env.port || 5000;

sequelize.sync();


api.post('/paymentMethod/create', (req, res) => {
  newPaymentMethod = paymentMethod.create({
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


api.listen(port, () => console.log(`Listening on port ${port}`));

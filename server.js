const api = require('./api/api.js');
const sequelize = require('./models/sequelizeConf.js');
<<<<<<< HEAD
const users = require('./api/users.js');
const charges = require('./api/charges.js');
const sources = require('./api/sources.js');

=======
const User = sequelize.import('./models/user.js');
var bodyParser = require('body-parser');
const Item = sequelize.import('./models/item.js');
sequelize.sync();

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));


api.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

const users = require('./api/users.js');
const items = require('./api/items.js');
const port = process.env.port || 5000;


sequelize.sync();
>>>>>>> master

const port = process.env.port || 5000;

<<<<<<< HEAD
sequelize.sync();
=======
api.post('/paymentMethod/create', (req, res) => {
  newPaymentMethod = paymentMethod.create({
    type: req.body.type,
    firstname: req.body.firstname,
    lastname: req.body.lastname,

    password: req.body.password,
    accountType: req.body.accountType,

    billingAddress: req.body.billingAddress,
    cvv: req.body.cvv,
    expDate:req.body.expDate,
    userId: req.body.userId

  })
  res.send({ text: `Payment method created, payment method: ` + newPaymentMethod.ID});
})
>>>>>>> master


api.listen(port, () => console.log(`Listening on port ${port}`));

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const sequelize = require('./models/sequelizeConf.js');
const User = sequelize.import('./models/user.js');
sequelize.sync();

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});



app.post('/users/create', (req, res) => {
  newUser = User.create({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    accountType: req.body.accountType,
    rewardpoints: 0
  })
  res.send({ text: `Created User: ` + newUser.username });
})

app.post('/users/addpoints', (req, res) => {
  User.findOne({ where: { username: req.body.username } }).then(user => {
    console.log("adding points to " + user);
    user.increment('rewardpoints', {by: req.body.rewardpoints});
    
    user.reload().then(() => {
      res.send({ text: `Gave user: ${req.body.username} , ${user.rewardpoints}` });
    })
    
  })

 
})

app.post('/paymentMethod/create', (req, res) => {
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


app.listen(port, () => console.log(`Listening on port ${port}`));

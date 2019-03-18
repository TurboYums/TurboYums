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


app.post('/api/world', (req, res) => {
  res.send({ text: `I received your POST request. This is what you sent me: ${req.body.text}` });
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
    console.log("adding points to " + this.user)
    user.addPoints(req.body.points);
  })

  res.send({ text: `Created User: ${req.body.username}` });
})

app.listen(port, () => console.log(`Listening on port ${port}`));

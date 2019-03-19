const api = require('./api.js');
const sequelize = require('../models/sequelizeConf.js');
const User = sequelize.import('../models/user.js');
sequelize.sync();

api.post('/api/users/create', (req, res) => {
  newUser = User.create({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    accountType: req.body.accountType,
    rewardpoints: 0,
    hoursWorked: 0,
    status: 0,
    totalHoursWorked: 0
  })
  res.send({ text: `Created User:  ${req.body.username}` });
})

api.post('/api/users/addpoints', (req, res) => {
  User.findOne({ where: { username: req.body.username } }).then(user => {
    console.log("adding points to " + user);
    user.increment('rewardpoints', { by: req.body.rewardpoints });

    user.reload().then(() => {
      res.send({ text: `Gave user: ${req.body.username} , ${user.rewardpoints}` });
    })

  })

})

api.post('/api/users/addhours', (req, res) => {
  User.findOne({ where: { username: req.body.username } }).then(user => {
    console.log("adding hours to " + user);
    user.increment('totalHoursWorked', { by: req.body.hoursWorked });
    user.hoursWorked = req.body.hoursWorked;
    user.save().then(() => {
      user.reload().then(() => {
        res.send({ text: `Gave user: ${req.body.username} , ${user.hoursWorked}` });
      })
    });
  })
})

api.post('/api/users/clockIn', (req, res) => {
  User.findOne({ where: { username: req.body.username } }).then(user => {
    console.log("clocking in " + user);
    user.status = '1';
    user.save().then(() => {
      user.reload().then(() => {
        res.send({ text: `Clocked in: ${req.body.username} , ${user.status}` });
      })
    });
  })
})

api.post('/api/users/clockOut', (req, res) => {
  User.findOne({ where: { username: req.body.username } }).then(user => {
    console.log("clocking out " + user);
    user.status = '0';
    user.save().then(() => {
      user.reload().then(() => {
        res.send({ text: `Clocked out: ${req.body.username} , ${user.status}` });
      })
    });
  })
})



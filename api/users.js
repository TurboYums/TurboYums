const api = require('./api.js');
const sequelize = require('../models/sequelize.js');
const User = sequelize.import('../models/user.js');
const config = require('../config.json');
const stripe = require('stripe')(config.stripe.STRIPE_SECRET_KEY);
const bcrypt = require('bcrypt');

api.post('/api/users/create', (req, res) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    stripe.customers.create({
      email: req.body.email,
    }).then(customer => {
      User.create({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hash,
        accountType: req.body.accountType,
        rewardpoints: 0,
        email: req.body.email,
        stripe_id: `${customer.id}`,
        status: 0,
        hoursWorked: 0,
        totalHoursWorked: 0
      }).then(newUser => {
        res.send({ text: `Created User:  ${newUser.username}` });
      })
    })
  })
})

api.post('/api/users/login', (req, res) => {
  User.findOne({ where: { username: req.body.username } }).then(user => {
    bcrypt.compare(req.body.password, user.password, function (err, success) {
      if (success) {
        console.log(user + 'signed in successfully');
        res.send({
          user: user,
          loginValid: true
        })
      } else {
        console.log(user + 'failed');
        res.send({
          loginValid: false
        })
      }
    });
  })
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
    if(!user.status){
      user.status = 1;
      user.save().then(() => {
        user.reload().then(() => {
          res.send({
            user: user,
            clockInSuccess: true
          })
        })
      });  
    } else{
      user.save().then(() => {
        user.reload().then(() => {
          res.send({
            user: user,
            clockInSuccess: false
          })
        })
      });
      
    }
  })
})

api.post('/api/users/clockOut', (req, res) => {
  User.findOne({ where: { username: req.body.username } }).then(user => {
    if(user.status){
      user.status = 0;
      user.save().then(() => {
        user.reload().then(() => {
          res.send({
            user: user,
            clockOutSuccess: true
          })
        })
      });  
    } else{
      user.save().then(() => {
        user.reload().then(() => {
          res.send({
            user: user,
            clockOutSuccess: false
          })
        })
      });
      
    }
  })
})


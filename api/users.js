const api = require('./api.js');
const sequelize = require('../models/sequelize.js');
const User = sequelize.import('../models/user.js');
const ClockLog = sequelize.import('../models/clockLog.js');
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
        hourlyRate: req.body.hourlyRate,
        rewardpoints: 0,
        email: req.body.email,
        stripe_id: `${customer.id}`,
        status: 0,
        hoursWorked: 0,
        totalHoursWorked: 0,
        minutesIn: 0,
        hoursIn: 0,
        minutesOut: 0,
        hoursOut: 0
      }).then(newUser => {
        res.send({ 
          creationSuccess: true,
          text: `Created User:  ${newUser.username}`,
          user: newUser
        });
      }).catch( function (err) {
        res.send({ 
          creationSuccess: false,
          error: err,
        });
      });
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

api.post('/api/users/getEmployees', (req, res) => {
  User.findAll({ where: { accountType: 1 } }).then(users => {
   res.send({employees: users});
  })
})

today = new Date();
var minutesIn;
var hoursIn;
var minutesOut;
var hoursOut;

api.post('/api/users/clockIn', (req, res) => {
  User.findOne({ where: { username: req.body.username } }).then(user => {
    today = new Date();
    if (!user.status) {
      user.status = 1;
      user.minutesIn = today.getMinutes();
      user.hoursIn = today.getHours();
      console.log(user.hoursIn, user.minutesIn);

      var today = new Date();
      var currDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var currTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var fullTime = currDate + ' ' + currTime;
      ClockLog.create({
        username: user.username,
        timeClockedIn: fullTime,
        timeClockedOut: "0",
        hoursWorked: 0,
        latitudeClockedIn: req.body.latitude,
        longitudeClockedIn: req.body.longitude,
        ipClockedIn: req.ip.replace('::ffff:', '')
      })
      
      user.save().then(() => {
        user.reload().then(() => {
          res.send({
            user: user,
            clockInSuccess: true
          })
        })
      });

    } else {
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
  var employee = req.body.username;
  User.findOne({ where: { username: req.body.username } }).then(user => {

    if (user.status) {
      user.status = 0;
      today2 = new Date();
      user.minutesOut = today2.getMinutes();
      user.hoursOut = today2.getHours();
      var currDate2 = today2.getFullYear()+'-'+(today2.getMonth()+1)+'-'+today2.getDate();
      var currTime2 = today2.getHours() + ":" + today2.getMinutes() + ":" + today2.getSeconds();
      var fullTime2 = currDate2 + ' ' + currTime2;
        console.log(user.hoursIn, user.minutesIn, user.hoursOut, user.minutesOut);
      if (user.minutesIn > user.minutesOut) {
        minutesIn = 60 - user.minutesIn;
        totalMinutes = (minutesIn + user.minutesOut) / 60;
        totalHours = user.hoursOut - (user.hoursIn + 1);
        hoursWorked = totalHours + totalMinutes;
      } else {
        totalMinutes = (user.minutesOut - user.minutesIn) / 60;
        totalHours = user.hoursOut - user.hoursIn;
        hoursWorked = totalHours + totalMinutes;
      }
      ClockLog.findOne({ where: { username: employee, timeClockedOut: 0} }).then(clockLog => {
        clockLog.hoursWorked = hoursWorked;
        clockLog.timeClockedOut = fullTime2;
        clockLog.ipClockedOut = req.ip.replace('::ffff:', '')
        clockLog.latitudeClockedOut = req.body.latitude,
        clockLog.longitudeClockedOut = req.body.longitude,
        clockLog.save().then(() =>{clockLog.reload()});
      })
      user.hoursWorked = hoursWorked;
      user.increment('totalHoursWorked', { by: user.hoursWorked });
      user.save().then(() => {
        user.reload().then(() => {
          res.send({
            user: user,
            sessionHours: user.hoursWorked,
            totalHours: user.totalHoursWorked,
            clockOutSuccess: true
          })
        })
      });

  
    } else {
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


api.post('/api/users/export_payroll', (req, res) => {
  var mailOptions = {
    from: 'TurboYums',
    to: req.body.email,
    subject: 'Payroll',
    text: 'Attached is this weeks payroll\n'
  }
  User.findAll({ where: { accountType: 1 } }).then(users => {
    let payroll = 'employee,employee_id,hoursWorked,hourlyRate,totalGrossPay\n'
    for(let employee of users){
      payroll += employee.firstname + " " + employee.lastname +", "+ employee.stripe_id+", "+employee.hoursWorked+", "+employee.hourlyRate+", "+employee.hoursWorked*employee.hourlyRate+"\n"  
    }
    mailOptions.attachments = [
      {
        filename: 'payroll.csv',
        content: payroll
      }
    ]
    api.transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    }); 
    res.send({payroll: payroll});
   })
})

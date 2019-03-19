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
      rewardpoints: 0
    })
    res.send({ text: `Created User:  ${newUser.username}`});
  })
  
  api.post('/api/users/addpoints', (req, res) => {
    User.findOne({ where: { username: req.body.username } }).then(user => {
      console.log("adding points to " + user);
      user.increment('rewardpoints', {by: req.body.rewardpoints});
      
      user.reload().then(() => {
        res.send({ text: `Gave user: ${req.body.username} , ${user.rewardpoints}` });
      })
      
    })
  
   
  })
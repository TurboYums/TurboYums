const api = require('./clocking.js');
const sequelize = require('../models/sequelizeConf.js');
const Clocking = sequelize.import('../models/clocking.js');
sequelize.sync();

api.post('/api/clocking/create', (req, res) => {
    newClocking = Clocking.create({
        username: req.body.username,
        time: req.body.time,
        location: req.body.location,
        hoursWorked: req.body.hoursWorked,
        status: req.body.status,
        totalHoursWorked: req.body.totalHoursWorked
    })
    res.send({ text: `Clocked In Employee:  ${newClocking.username}`});
  })

api.post('/api/clocking/addhours', (req, res) => {
    Clocking.findOne({ where: { username: req.body.username } }).then(clocking => {
      console.log("adding hours to " + clocking);
      clocking.increment('totalHoursWorked', {by: req.body.hoursWorked});
      
      clocking.reload().then(() => {
        res.send({ text: `Gave user: ${req.body.username} , ${clocking.totalHoursWorked}` });
      })
    })
  })
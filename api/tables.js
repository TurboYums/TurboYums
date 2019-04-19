const api = require('./api.js');
const sequelize = require('../models/sequelize.js');

const Table = sequelize.import('../models/table.js');

api.post('/api/tables/create', (req, res) => {
    Tabke.create({
        tableID: req.body.tableID,
        status: 0
    }).then(newTable => {
        res.send({ table: newTable });
    })
})


api.get('/api/tables/getAll', (req, res) => {
    Table.findAll({ group: ['tableID', 'status'] }).then(tables => {
        res.send({ tables: tables })
    })
})

api.post('/api/tables/changeStatus'), (req, res) => {
    Table.findOne({ where: { tableID: req.body.tableID } }).then(table => {
        table.status = req.body.status;
    })
}
const api = require('./api.js');
const sequelize = require('../models/sequelize.js');
const Table = sequelize.import('../models/table.js');

api.post('/api/tables/create', (req, res) => {
    Table.create({
        tableID: req.body.tableID,
        status: 0
    }).then(newTable => {
        res.send({ table: newTable });
    }).catch(function(err) {
        // print the error details
        console.log(err);
    });
})




api.get('/api/tables/getAll', (req, res) => {
    Table.findAll().then(tables => {
        res.send({ tables: tables })
    })
})


/*
api.post('/api/tables/changeStatus'), (req, res) => {
    Table.findOne({ where: { tableID: req.body.tableID } }).then(table => {
        if (table.status == 0 || table.status == 1 || table.status == 2) {
            if (table.status == 0) {
                table.status = 1;
            }
            else if (table.status == 1) {
                table.status = 2;
            }
            else if (table.status == 2) {
                table.status = 0;
            }

            user.save().then(() => {
                user.reload().then(() => {
                    res.send({
                        table: table,
                        statusChange: true
                    })
                })
            });
        }
        else {
            user.save().then(() => {
                user.reload().then(() => {
                    res.send({
                        table: table,
                        statusChange: false
                    })
                })
            });

        }
    })
}

*/
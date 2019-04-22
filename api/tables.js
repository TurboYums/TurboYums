const api = require('./api.js');
const sequelize = require('../models/sequelize.js');
const Table = sequelize.import('../models/table.js');

api.post('/api/tables/create', (req, res) => {
    Table.create({
        status: 'green'
    }).then(newTable => {
        res.send({ table: newTable });
    }).catch(function(err) {
        // print the error details
        console.log(err);
    });
})


api.post('/api/tables/getAll', (req, res) => {
    Table.findAll({order:[['id', 'ASC']]}).then(tables => {
        res.send({ tables: tables })
    }).catch(function(err) {
        // print the error details
        console.log(err);
    });
})



api.post('/api/tables/changeStatus', (req, res) => {
    //console.log(req.body.table_id);
   // console.log("hello michelle");
    Table.findOne({ where: { id: req.body.table_id } }).then(table => {
        //console.log(table.id);
        if (table.status == "green" || table.status == "red" || table.status == "coral") {
            if (table.status == 'green') {
                table.status = 'red';
                table.orderId=req.body.orderId;
            }
            else if (table.status == 'red') {
                table.status = 'coral';
            }
            else if (table.status == 'coral') {
                table.status = 'green';
            }

            table.save().then(() => {
                table.reload().then(() => {
                    res.send({
                        table: table,
                        statusChange: true
                    })
                })
            });
        }
        else {
            table.save().then(() => {
                table.reload().then(() => {
                    res.send({
                        table: table,
                        statusChange: false
                    })
                })
            });

        }
    })
})
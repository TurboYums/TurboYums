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

//to put in App.js, onButtonPress function
table1Select = () => {
    fetch(API_URL + 'api/users/changeStatus', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tableID: currentTable.tableID,
            status: currentTable.status
        }),
    }).then((res) => res.json()).then(resJson => {
        if (resJson.table.status == 0) {
            if (this.state.table1 == 'coral') {
                this.setState({ table1: 'green' })
                Alert.alert("Table is now clean.");
            }
        } else if (resJson.table.status == 1) {
            if (this.state.table1 == 'green') {
                this.setState({ table1: 'red' })
                Alert.alert("Selected valid table with table ID, " + currentTable.tableID + ".");
            }
        } else if (resJson.table.status == 2) {
            if (this.state.table1 == 'red') {
                this.setState({ table1: 'coral' })
                Alert.alert("Table with table ID, " + currenTable.tableID + ", is dirty.");
            }
        }
    });
}
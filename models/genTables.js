const sequelize = require('./sequelize.js');
const Item = sequelize.import('./table.js');

Table.create({
    tableID: 1,
    status: 0
  })

  Table.create({
    tableID: 2,
    status: 0
  })

  Table.create({
    tableID: 3,
    status: 0
  })

  Table.create({
    tableID: 4,
    status: 0
  })

  Table.create({
    tableID: 5,
    status: 0
  })

  Table.create({
    tableID: 6,
    status: 0
  })

  Table.create({
    tableID: 7,
    status: 0
  })

  Table.create({
    tableID: 8,
    status: 0
  })

  Table.create({
    tableID: 9,
    status: 0
  })

  Table.create({
    tableID: 10,
    status: 0
  })

  Table.create({
    tableID: 11,
    status: 0
  })
  .then(function(user) {
    // you can now access the newly created task via the variable task
    console.log('success');
})
.catch(function(err) {
    // print the error details
    console.log(err);
});
  Table.create({
    tableID: 12,
    status: 0
  })
.then(function(user) {
    // you can now access the newly created task via the variable task
    console.log('success');
})
.catch(function(err) {
    // print the error details
    console.log(err);
});

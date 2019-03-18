const Sequelize = require('sequelize'); //do not need to change this right now
const sequelize = new Sequelize({
  database: 'turboyums',
  host: '192.168.99.100', //might need to change this to my machine
  username: 'root',
  password: 'password',
  dialect: 'mysql',
  port: '3306'
});

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('paymentMethod', {
  
      type: Sequelize.INTEGER, //CHANGE FIELDS, take them from the google doc
      firstname: Sequelize.STRING,
      lastname: Sequelize.STRING,
      billingAddress: Sequelize.Address, //not sure how to use the address class here
      cvv: Sequelize.INTEGER,
      expDate: Sequelize.DATE, //need to make this work for a date
      userId: Sequelize.STRING
    
    })
}
  
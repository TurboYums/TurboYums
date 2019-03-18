const Sequelize = require('sequelize');
const sequelize = require('./sequelizeConf.js');


    paymentMethod = sequelize.define('paymentMethod', {
  
      type: Sequelize.INTEGER, 
      firstname: Sequelize.STRING,
      lastname: Sequelize.STRING,
      billingAddress: Sequelize.STRING, 
      cvv: Sequelize.INTEGER,
      expDate: Sequelize.DATE,
      userId: Sequelize.STRING
    
    })
    module.exports = (sequelize, DataTypes) => {
      return paymentMethod;
    }

User.prototype.editPayment = function () {

}
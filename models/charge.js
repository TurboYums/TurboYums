const Sequelize = require('sequelize');
const sequelize = require('./sequelizeConf.js');


Charge = sequelize.define('charge', {

  id: Sequelize.STRING,
  amount: Sequelize.INTEGER,
  balance_transaction: Sequelize.STRING,
  captured: Sequelize.BOOLEAN,
  created: Sequelize.DATE,
  currency: Sequelize.INTEGER,
  customer: Sequlize.STRING,
  description: Sequelize.STRING,
  failure_code: Sequelize.STRING,
  failure_message: Sequelize.STRING,
  livemode: Sequelize.BOOLEAN,
  order: Sequelize.STRING,
  outcome: Sequelize.STRING,
  paid: Sequelize.BOOLEAN,
  receipt_email: Sequelize.STRING,
  receipt_number: Sequelize.STRING,
  receipt_url: Sequelize.STRING,
  review: Sequelize.STRING,
  source_transfer: Sequelize.STRING,
  statement_descriptor: Sequelize.STRING,
  status: Sequelize.STRING,
})
Charge.hasOne(Source);

module.exports = (sequelize, DataTypes) => {
  return Charge;
}
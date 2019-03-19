const Sequelize = require('sequelize');
const sequelize = require('./sequelizeConf.js');


Source = sequelize.define('source', {

  type: Sequelize.INTEGER,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  id: Sequelize.STRING,
  address_city: Sequelize.STRING,
  address_country: Sequelize.STRING,
  address_line1: Sequelize.STRING,
  address_line2: Sequelize.STRING,
  address_state: Sequelize.STRING,
  address_zip: Sequelize.STRING,
  address_zip_check: Sequelize.STRING,
  brand: Sequelize.STRING,
  country: Sequelize.STRING,
  customer: Sequelize.STRING,
  cvc_check: Sequelize.STRING,
  dynamic_last4: Sequelize.STRING,
  exp_month: Sequelize.STRING,
  exp_year: Sequelize.STRING,
  fingerprint: Sequelize.STRING,
  funding: Sequelize.STRING,
  last4: Sequelize.STRING,
  name: Sequelize.STRING,
  tokenization_method: Sequelize.STRING,

})
Source.hasOne(User);

module.exports = (sequelize, DataTypes) => {
  return Source;
}
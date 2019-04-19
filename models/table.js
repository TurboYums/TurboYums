const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');

Table = sequelize.define('table', {
  tableID: Sequelize.DOUBLE,
  status: Sequelize.INT
})

Table.belongsTo(Order);
module.exports = (sequelize, DataTypes) => {
  return Table;
}

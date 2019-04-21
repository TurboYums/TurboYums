const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');

Table = sequelize.define('table', {
  //tableID: Sequelize.DOUBLE,
  //tableID: { type: Sequelize.DOUBLE, unique: true },
  status: Sequelize.STRING
})

Table.belongsTo(Order);
module.exports = (sequelize, DataTypes) => {
  return Table;
}

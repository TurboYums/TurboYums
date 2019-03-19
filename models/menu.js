const Sequelize = require('sequelize');
const sequelize = require('./sequelizeConf.js');

 Menu = sequelize.define('item', {
    
       
    })
	
module.exports = (sequelize, DataTypes) => {
  return Menu;
}
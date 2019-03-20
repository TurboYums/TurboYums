const Sequelize = require('sequelize');
const sequelize = require('./sequelizeConf.js');

 Item = sequelize.define('item', {
    
        itemName: Sequelize.STRING,
        itemPrice: Sequelize.DOUBLE,
        ingredient: Sequelize.STRING,
        description: Sequelize.STRING,
        rating: Sequelize.INTEGER,
        foodID: Sequelize.DOUBLE,
        itemQuantity: Sequelize.INTEGER
    })
	
module.exports = (sequelize, DataTypes) => {
  return Item;
}
item.belongsToMany(ingredient);
ingredient.belongsToMany(item);
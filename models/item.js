const Sequelize = require('sequelize');
const sequelize = require('./sequelizeConf.js');

module.exports = (sequelize, DataTypes)=>
{
    return sequelize.define('item',
    {
        itemName: Sequelize.STRING,
        itemPrice: Sequalize.DOUBLE,
        ingredient: Sequalize.STRING,
        description: Sequalize.STRING,
        rating: Sequalize.INTEGER,
        foodId: Sequalize.DOUBLE,
        itemQuantity: Sequalize.INTEGER
    })
}
item.belongsToMany(ingredient);
ingredient.belongsToMany(item);
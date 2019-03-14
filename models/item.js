const sequelize = require('sequelize');
const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes)=>
{
    return sequelize.define('item',
    {
        itemName: Sequelize.STRING,
        itemPrice: Sequalize.DOUBLE,
        ingredient: Sequalize.STRING,
        description: Sequalize.STRING,
        rating: Sequalize.INTEGER,
        foodId: Sequalize.DOUBLE
    })
    
    
}
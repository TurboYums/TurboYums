const Sequelize = require('sequelize');
const sequelize = require('./sequelizeConf.js');

module.exports = (sequelize, DataTypes)=>
{
    return sequelize.define('order',
    {
        totalPrice: Sequelize.DOUBLE,
        orderedItems: Sequelize.STRING,
        specialReuest: Sequelize.STRING
    })
}
item.belongsToMany(orderedItems);
orderedItems.belongsToMany(item);
const Sequelize = require('sequelize');
const sequelize = require('./sequelizeConf.js');

Order = sequelize.define('order',
    {
        totalPrice: Sequelize.DOUBLE,
        orderedItems: Sequelize.STRING,
        specialReuest: Sequelize.STRING
    })

module.exports = (sequelize, DataTypes) => {
    return Order;
}
item.belongsToMany(orderedItems);
orderedItems.belongsToMany(item);
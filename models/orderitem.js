const Sequelize = require('sequelize');
const sequelize = require('./sequelize.js');

const OrderItem = sequelize.define('order_item', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
});

module.exports = (sequelize, DataTypes) => {
    return OrderItem;
}

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  database: 'db',
  host: '192.168.99.100',
  username: 'user',
  password: 'password',
  dialect: 'mysql',
  port: '3306'
});

const User = sequelize.define('user', {

  title: Sequelize.STRING,
  username: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  password: Sequelize.STRING,
  rewardpoints: Sequelize.INTEGER,
  accountType: Sequelize.INTEGER,
  addressId: Sequelize.INTEGER

})

User.sync()



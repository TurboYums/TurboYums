//Import our general api and sequelize
const api = require('./api/api.js');
const sequelize = require('./models/sequelize.js');

//import api elements
const users = require('./api/users.js');
const charges = require('./api/charges.js');
const sources = require('./api/sources.js');
const items = require('./api/items.js').then;
const orders = require('./api/orders.js');
const tables = require('./api/tables.js');
//sync sequelize
sequelize.sync();
if (process.env.NODE_ENV != "test") {
    const genItems = require('./models/genItems.js');
    const genTables = require('./models/genTables.js');
}

api.listen(api.port, () => console.log(`Listening on port ${api.port}`));

module.exports = api

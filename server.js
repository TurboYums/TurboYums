//Import our general api and sequelize
const api = require('./api/api.js');
const sequelize = require('./models/sequelize.js');

//import api elements
const users = require('./api/users.js');
const charges = require('./api/charges.js');
const sources = require('./api/sources.js');
const items = require('./api/items.js')

//sync sequelize
sequelize.sync();

api.listen(api.port, () => console.log(`Listening on port ${api.port}`));

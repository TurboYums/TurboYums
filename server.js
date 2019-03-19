const api = require('./api/api.js');
const sequelize = require('./models/sequelizeConf.js');
const users = require('./api/users.js');
const charges = require('./api/charges.js');
const sources = require('./api/sources.js');


const port = process.env.port || 5000;

sequelize.sync();


api.listen(port, () => console.log(`Listening on port ${port}`));

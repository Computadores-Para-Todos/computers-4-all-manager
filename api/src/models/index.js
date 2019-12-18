const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { DB_USERNAME, DB_PASSWORD, DATABASE, DB_HOST, DB_TIMEZONE } = process.env;

const config = {
  dialect: 'mysql',
  dialectOptions: {
    timezone: DB_TIMEZONE
  },
  host: DB_HOST,
  operatorsAliases: 0,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true
  }
};

const db = {};
const sequelize = new Sequelize(DATABASE, DB_USERNAME, DB_PASSWORD, config);

sequelize
  .authenticate()
  .then(() => console.log( 'Connection has been established successfully.'))
  .catch(err => console.log('Unable to connect to the database:', err));

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

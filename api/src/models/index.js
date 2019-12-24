import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const basename = path.basename(__filename);

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
const { DB_USERNAME, DB_PASSWORD, DATABASE, DB_HOST, DB_TIMEZONE } = process.env;

export const sequelize = new Sequelize(DATABASE, DB_USERNAME, DB_PASSWORD, config);

sequelize.sync();

/**
 * Connect to the database
 * @returns {Promise}
 */
export function connect() {
  return sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.log('Unable to connect to the database:', err));
}

// export all models
export { userModel } from './UserModel';

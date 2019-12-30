import Sequelize from 'sequelize';
// models
import UserModel from './UserModel';
import StatusModel from './StatusModel';

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

export const sequelize = new Sequelize(DATABASE, DB_USERNAME, DB_PASSWORD, config);

const models = [UserModel, StatusModel];
// Inicializa modelos
models.forEach(model => model.init(sequelize, Sequelize));
// Executa método associate, se existir, para criar relacionamentos
models
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

sequelize.sync();

/**
 * Connect to the database
 * @returns {Promise} connection
 */
export function connect() {
  return sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.log('Unable to connect to the database:', err));
}

// Export Models
export { UserModel as User, StatusModel as Status };

import Sequelize from 'sequelize';
// models
import User from './UserModel';
import Status from './StatusModel';
import Donator from './DonatorModel';
import Device from './DeviceModel';
import Activity from './ActivityModel';
import Comment from './CommentModel';

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

// Inicializa modelos - INSERIR NOVOS MODELOS AQUI
const models = [User, Status, Donator, Device, Activity, Comment];
models.forEach(model => model.init(sequelize));
// Executa método associate, se existir, para criar relacionamentos
models
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate());

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
export { User, Status, Donator, Device, Activity, Comment };

module.exports = {
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT+3'
  },
  host: '127.0.0.1',
  username: 'root',
  password: 'pc4all',
  database: 'computer4all',
  operatorsAliases: 0,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true
  }
};

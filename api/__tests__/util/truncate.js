import { sequelize as connection } from '../../src/models/index';

/**
 * Desabilita as validações de chaves estrangeiras e deleta todo conteudo do sqlite
 * @returns {Promise} Uma nova promise
 */
export default function truncate() {
  return Promise.all([
    connection.query('PRAGMA foreign_keys = OFF', null, {
      raw: true
    }),
    ...Object.keys(connection.models).map(key => {
      return connection.models[key].destroy({
        truncate: true,
        force: true
      });
    }),
    connection.query('PRAGMA foreign_keys = ON', null, {
      raw: true
    })
  ]);
}

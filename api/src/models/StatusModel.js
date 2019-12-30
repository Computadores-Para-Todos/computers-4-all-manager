import { Model, Op } from 'sequelize';
import { encrypt } from '../utils';

/**
 * Model de usuário
 * @exports
 * @class UserModel
 * @augments {Model}
 * @see https://codewithhugo.com/using-es6-classes-for-sequelize-4-models/
 */
export default class StatusModel extends Model {
  // Cria instância do model
  static init(sequelize, { STRING, ENUM }) {
    return super.init(
      {
        title: {
          type: STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Título obrigatório'
            }
          }
        },
        use: {
          type: ENUM('device', 'donation'),
          allowNull: false
        }
      },
      {
        modelName: 'Status',
        sequelize
      }
    );
  }
}

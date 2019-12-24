import { Model, Op } from 'sequelize';
import { encrypt } from '../utils';

/**
 * Model de usuário
 * @export
 * @class UserModel
 * @augments {Model}
 * @see https://codewithhugo.com/using-es6-classes-for-sequelize-4-models/
 */
export default class UserModel extends Model {
  /**
   * Atualiza a data do último acesso
   * @static
   * @param {number} id ID do usuário
   * @returns {Promise} query
   * @memberof UserModel
   */
  static async updateLastAccess(id) {
    // data de hoje, às 0H
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);

    console.log('lastaccess');
    return await this.update(
      { lastaccess: new Date() },
      {
        where: {
          id,
          [Op.or]: [
            { lastaccess: { [Op.lt]: now } },
            { lastaccess: { [Op.eq]: null } }
          ]
        }
      }
    );
  }

  // Cria instância do model
  static init(sequelize, DataTypes) {
    const { STRING, INTEGER, DATE, DATEONLY } = DataTypes;
    return super.init(
      {
        thumb: STRING,
        name: STRING,
        document: STRING,
        genre: INTEGER,
        birthday: DATEONLY,
        phone: STRING,
        email: {
          type: STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        password: {
          type: STRING,
          allowNull: false,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Senha obrigatória'
            },
            len: {
              args: [6, 300],
              msg: 'A senha deve conter no mínimo 6 caracteres'
            }
          },
          set(val) {
            if (val && val.length >= 6) this.setDataValue('password', encrypt(val));
            else this.setDataValue('a');
          }
        },
        lastaccess: DATE,
        role: {
          type: STRING,
          allowNull: false
        },
        status: {
          type: STRING,
          defaultValue: 'active'
        }
      },
      {
        modelName: 'User',
        sequelize
      }
    );
  }
}

import { Model, Op, STRING, VIRTUAL, DATEONLY, DATE, ENUM } from 'sequelize';
import { encrypt } from '../utils';

/**
 * Model de usuário
 * @exports
 * @class UserModel
 * @augments {Model}
 * @see https://codewithhugo.com/using-es6-classes-for-sequelize-4-models/
 */
export default class User extends Model {
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
  static init(sequelize) {
    super.init(
      {
        thumb: STRING,
        name: STRING,
        document: STRING,
        gender: ENUM('male', 'female'),
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
        password: VIRTUAL,
        password_hash: STRING,
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
      { sequelize }
    );

    this.addHook('beforeSave', user => {
      if (user.password) {
        user.password_hash = encrypt(user.password);
      }
    });

    return this;
  }
}

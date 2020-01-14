import { Model, Op, STRING, ENUM } from 'sequelize';
import { encrypt } from '../utils';

/**
 * Model de usuário
 * @exports
 * @class UserModel
 * @augments {Model}
 * @see https://codewithhugo.com/using-es6-classes-for-sequelize-4-models/
 */
export default class Donator extends Model {
  // Cria instância do model
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: STRING,
          allowNull: false
        },
        email: {
          type: STRING,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        document: {
          type: STRING,
          allowNull: false,
          unique: true
        },
        phone: STRING,
        notify_by: ENUM('email', 'whatsapp', 'phone'),
        type: ENUM('person', 'company', 'institution'),
        address_line_1: STRING,
        address_line_2: STRING,
        address_city: STRING,
        address_state: STRING,
        address_country: {
          type: STRING,
          defaultValue: 'Brazil'
        }
      },
      { sequelize }
    );
  }
}

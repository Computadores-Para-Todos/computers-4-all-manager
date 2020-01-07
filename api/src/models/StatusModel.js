import { Model, STRING, ENUM } from 'sequelize';

/**
 * Model de usuário
 * @exports
 * @class UserModel
 * @augments {Model}
 * @see https://codewithhugo.com/using-es6-classes-for-sequelize-4-models/
 */
export default class Status extends Model {
  // Cria instância do model
  static init(sequelize) {
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
      { sequelize }
    );
  }
}

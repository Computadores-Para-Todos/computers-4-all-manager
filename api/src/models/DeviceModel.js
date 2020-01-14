import { Model, Op, STRING, ENUM } from 'sequelize';
import { encrypt } from '../utils';
import { User, Status } from '.';

/**
 * Model de usuário
 * @exports
 * @class UserModel
 * @augments {Model}
 * @see https://codewithhugo.com/using-es6-classes-for-sequelize-4-models/
 */
export default class Device extends Model {
  // Cria instância do model
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: STRING,
          allowNull: false
        },
        type: {
          type: ENUM('computer', 'display', 'printer'),
          allowNull: false
        }
      },
      { sequelize }
    );
  }

  /**
   * Cria relacionamentos
   * @static
   * @memberof Device
   * @returns {void}
   */
  static associate() {
    // User relation
    this.belongsTo(User, {
      foreignKey: { allowNull: false },
      onDelete: 'cascade'
    });
    // Status relation
    this.belongsTo(Status, {
      foreignKey: { allowNull: false },
      onDelete: 'cascade'
    });
  }
}

import { Model, Op, STRING, ENUM } from 'sequelize';
import { encrypt } from '../utils';
import { User, Status, Device } from '.';

/**
 * Model de usuário
 * @exports
 * @class UserModel
 * @augments {Model}
 * @see https://codewithhugo.com/using-es6-classes-for-sequelize-4-models/
 */
export default class Activity extends Model {
  // Cria instância do model
  static init(sequelize) {
    return super.init(
      {
        activity: {
          type: ENUM('status', 'user'),
          allowNull: false,
          validate: {
            // Valida se a chave estrangeira da respectiva atividade foi informada
            validActivity(value) {
              if (
                (value === 'status' && !this.StatusId) ||
                (value === 'user' && !this.UserId)
              )
                throw new Error(`${value}Id não foi informado`);
            }
          }
        }
      },
      { sequelize, updatedAt: false }
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
    this.belongsTo(User);
    // Status relation
    this.belongsTo(Status);
    // Device relation
    this.belongsTo(Device, {
      foreignKey: { allowNull: false },
      onDelete: 'cascade'
    });
  }
}

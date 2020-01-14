import { Model, STRING, INTEGER, ENUM } from 'sequelize';
import { Devices, Donator, Status } from '.';

export default class Donation extends Model {
  // Cria instância do model
  static init(sequelize) {
    return super.init(
      {
        quantity: INTEGER,
        description: STRING,
        collect_type: ENUM('fetch', 'give'),
        collect_time: STRING
      },
      { sequelize }
    );
  }

  static associate() {
    this.Donator = this.belongsTo(Donator, {
      as: 'donator'
    });
    this.Status = this.belongsTo(Status, {
      as: 'status'
    });
  }
}

import { encrypt } from '../utils';

export default (sequelize, DataTypes) => {
  const { STRING, INTEGER, DATE, DATEONLY } = DataTypes;
  const User = sequelize.define('User', {
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
      validate: {
        notEmpty: {
          message: 'Senha obrigatória'
        },
        len: {
          args: [6, 300],
          message: 'A senha deve conter no mínimo 6 caracteres'
        }
      },
      set(val) {
        if (val && val.length >= 6) this.setDataValue('password', encrypt(val));
        else this.setDataValue('');
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
  });

  return User;
};

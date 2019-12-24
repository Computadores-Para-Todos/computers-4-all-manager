const { encrypt, encryptCompare } = require('../utils');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    thumb: DataTypes.STRING,
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    document: DataTypes.STRING,
    genre: DataTypes.INTEGER,
    birthday: DataTypes.DATEONLY,
    phone: DataTypes.STRING,
    cell: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
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
        this.setDataValue('password', val);
        if (val) this.setDataValue('password', encrypt(val));
      }
    },
    // registragion: DataTypes.DATE,
    // lastupdate: DataTypes.DATE,
    lastaccess: DataTypes.DATE,
    role: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    blocking_reason: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    }
    // },
    // {
    //   hooks: {
    //     beforeSave: async user => {
    //       if (user.password) {
    //         user.password_hash = await bcrypt.hash(user.password, 8);
    //       }
    //     }
    //   }
    // }
  });

  return User;
};

const bcrypt = require('bcryptjs');

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
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(val, salt);
        this.setDataValue('password', hash);
      }
    },
    // registragion: DataTypes.DATE,
    // lastupdate: DataTypes.DATE,
    lastaccess: DataTypes.DATE,
    role: DataTypes.INTEGER,
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

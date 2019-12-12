// const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    thumb: DataTypes.STRING,
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    document: DataTypes.STRING,
    genre: DataTypes.INTEGER,
    birthday: DataTypes.DATEONLY,
    phone: DataTypes.STRING,
    cell: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    // registragion: DataTypes.DATE,
    // lastupdate: DataTypes.DATE,
    lastaccess: DataTypes.DATE,
    role: DataTypes.INTEGER,
    blocking_reason: DataTypes.STRING,
    status: DataTypes.STRING
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

  return Users;
};

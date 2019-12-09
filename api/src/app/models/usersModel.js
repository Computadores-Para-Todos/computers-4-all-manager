const sequelize = require('sequilize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('users', {
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: sequelize.INTEGER
    },
    user_thumb: {},
    user_name: {},
    user_lastname: {},
    user_document: {},
    user_gemre: {},
    user_databirth: {},
    user_phone: {},
    user_cell: {},
    user_email: {},
    user_password: {},
    user_pwd: {},
    user_registragion: {},
    user_lastupdate: {},
    user_lastacess: {},
    user_login: {},
    user_level: {},
    user_blocking_reason: {}
  });
};

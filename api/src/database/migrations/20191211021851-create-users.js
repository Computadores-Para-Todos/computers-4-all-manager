'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      thumb: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      document: {
        allowNull: false,
        type: Sequelize.STRING
      },
      genre: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      birthday: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING
      },
      cell: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastaccess: {
        allowNull: false,
        type: Sequelize.DATE
      },
      role: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER
      },
      blocking_reason: {
        allowNull: true,
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        defaultValue: 'inative',
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};

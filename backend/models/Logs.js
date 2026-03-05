const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Logs = sequelize.define(
  'Logs',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    module_name: {
      type: DataTypes.ENUM('category_generator', 'proposal_generator'),
      allowNull: false,
    },
    prompt: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    response: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('success', 'error'),
      defaultValue: 'success',
    },
    error_message: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  },
  { timestamps: true, tableName: 'logs' }
);

module.exports = Logs;

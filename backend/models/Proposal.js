const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Proposal = sequelize.define(
  'Proposal',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    business_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    budget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    event: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recommended_products: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    budget_allocation: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    estimated_cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    impact_summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: 'proposals' }
);

module.exports = Proposal;

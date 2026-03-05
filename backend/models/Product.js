const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    primary_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seo_tags: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    sustainability_filters: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
  },
  { timestamps: true, tableName: 'products' }
);

module.exports = Product;

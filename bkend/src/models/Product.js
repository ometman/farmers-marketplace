// models/Product.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Product',
  timestamps: true,
});

// Define the relationship (important!)
// Product.belongsTo(User, { 
//   foreignKey: 'farmer_id', as: 'farmer' 
// }); // A product belongs to a farmer
// User.hasMany(Product, { 
//   foreignKey: 'farmer_id', as: 'products' 
// }); // A farmer has many products

module.exports = Product;
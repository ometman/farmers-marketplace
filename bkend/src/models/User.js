// models/User.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('farmer', 'buyer', 'admin'),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  timestamps: true,
  underscored: true,
});

// User.hasMany(Product, { 
//   foreignKey: 'farmer_id', as: 'products' 
// }); // A farmer has many products


module.exports = User;
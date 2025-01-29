// models/Order.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
// const Product = require('./Product');

class Order extends Model {}

Order.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending',
  },
}, {
  sequelize,
  modelName: 'Order',
  timestamps: true,
  underscored: true,
});

// Define Relationships (important!)
// Order.belongsTo(User, { 
//   foreignKey: 'buyer_id', as: 'buyer' 
// }); // Order belongs to buyer
// User.hasMany(Order, { 
//   foreignKey: 'buyer_id', as: 'orders' 
// }); // Buyer has many orders

// Order.belongsTo(Product, { 
//   foreignKey: 'product_id', as: 'product' 
// }); // Order belongs to product
// Product.hasMany(Order, { 
//   foreignKey: 'product_id', as: 'orders' 
// }); // Product has many orders

module.exports = Order;

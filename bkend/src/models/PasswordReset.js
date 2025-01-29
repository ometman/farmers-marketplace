// models/PasswordReset.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const PasswordReset = sequelize.define('PasswordReset', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: User, key: 'id' },
        onDelete: 'CASCADE',
    },
    reset_token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiry_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'password_resets',
    timestamps: true,
    underscored: true,
});

PasswordReset.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(PasswordReset, { foreignKey: 'user_id', as: 'password_resets' });

module.exports = PasswordReset;
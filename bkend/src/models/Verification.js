// models/Verification.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Verification = sequelize.define('Verification', {
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
    verification_type: {
        type: DataTypes.ENUM('email', 'phone', 'id'),
        allowNull: false,
    },
    verification_status: {
        type: DataTypes.ENUM('pending', 'verified', 'rejected'),
        defaultValue: 'pending',
    },
    verification_token: {
        type: DataTypes.STRING,
    },
    verified_at: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'verifications',
    timestamps: true,
    underscored: true,
});

Verification.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Verification, { foreignKey: 'user_id', as: 'verifications' });

module.exports = Verification;
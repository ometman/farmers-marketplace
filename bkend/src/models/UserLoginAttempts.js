// models/UserLoginAttempt.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const UserLoginAttempt = sequelize.define('UserLoginAttempt', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    ip_address: {
        type: DataTypes.STRING,
        allowNull: false, // IP address should not be null
    },
    user_agent: { // Add user agent for more context
        type: DataTypes.STRING,
    },
    login_status: { // Add login status (success/failure)
        type: DataTypes.ENUM('success', 'failure'),
        allowNull: false,
    },
    attempt_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'user_login_attempts',
    timestamps: true, // Timestamps are generally useful for auditing
    underscored: true,
    indexes: [ // Add an index for efficient querying
        {
            fields: ['user_id', 'attempt_time'], // Index on user and time
        },
    ],
});

UserLoginAttempt.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(UserLoginAttempt, { foreignKey: 'user_id', as: 'loginAttempts' });

module.exports = UserLoginAttempt;
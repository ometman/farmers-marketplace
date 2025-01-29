// models/EmailVerificationToken.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const EmailVerificationToken = sequelize.define('EmailVerificationToken', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: { model: User, key: 'id' },
        onDelete: 'CASCADE',
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    expiry_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'email_verification_tokens',
    timestamps: true,
    underscored: true,
});

EmailVerificationToken.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasOne(EmailVerificationToken, { foreignKey: 'user_id', as: 'emailVerificationToken' });

module.exports = EmailVerificationToken;
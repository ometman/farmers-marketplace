// models/UserProfile.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const UserProfile = sequelize.define('UserProfile', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true, // One-to-one
        references: { model: User, key: 'id' },
        onDelete: 'CASCADE',
    },
    bio: {
        type: DataTypes.TEXT,
    },
    profile_picture_url: {
        type: DataTypes.STRING,
    },
    website: {
        type: DataTypes.STRING,
    },
    social_media_links: {
        type: DataTypes.JSONB, // Store as JSON
    },
}, {
    tableName: 'user_profiles',
    timestamps: true,
    underscored: true,
});

UserProfile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasOne(UserProfile, { foreignKey: 'user_id', as: 'profile' }); // One-to-one


module.exports = UserProfile;
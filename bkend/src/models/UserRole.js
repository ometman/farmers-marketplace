// models/UserRole.js (Join Table - users_user_roles)
// This model is usually not directly used, but Sequelize needs it for the association.
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserRole = sequelize.define('UserRole', {
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' }, // Use string for table name here
        primaryKey: true, // composite key
    },
    role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'user_roles', key: 'id' }, // Use string for table name here
        primaryKey: true, // composite key
    },
}, {
    tableName: 'users_user_roles',
    timestamps: false, // No timestamps needed for join table
    underscored: true,
});


module.exports = UserRole;
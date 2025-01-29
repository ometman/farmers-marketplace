// models/Role.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'user_roles',  // Or just 'roles'
    timestamps: true,
    underscored: true,
});

// Add the association to users (Many-to-many)
Role.belongsToMany(User, {
    through: 'users_user_roles',
    foreignKey: 'role_id',
    otherKey: 'user_id',
    as: 'users',
});

Role.hasMany(Permission, { foreignKey: 'role_id', as: 'permissions'});

module.exports = Role;
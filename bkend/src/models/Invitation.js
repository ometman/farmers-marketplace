// models/Invitation.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Optional: if the invitation is for a specific user

const Invitation = sequelize.define('Invitation', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    inviter_id: { // ID of the user who sent the invitation
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: User, key: 'id' },
        onDelete: 'CASCADE',
    },
    email: { // Email address of the invitee
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
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
    accepted: { // Whether the invitation has been accepted
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    invited_user_id: { // Optional: ID of the user after accepting (if the invitation is for a specific user)
        type: DataTypes.UUID,
        references: { model: User, key: 'id' },
    },
}, {
    tableName: 'invitations',
    timestamps: true,
    underscored: true,
});

Invitation.belongsTo(User, { foreignKey: 'inviter_id', as: 'inviter' }); // Inviter
Invitation.belongsTo(User, { foreignKey: 'invited_user_id', as: 'invitedUser' }); // Invited user (optional)


module.exports = Invitation;
'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userModel = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(password) {
                const hashPass = bcrypt.hashSync(password, 5);
                this.setDataValue('password', hashPass);
            },
        },
        last_login_datetime_utc: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Server_DateTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Status: {
            type: DataTypes.ENUM('Active', 'Inactive', 'Deleted', 'Expired'),
            allowNull: true,
            defaultValue: 'Inactive'
        },
        role: {
            type: DataTypes.ENUM("admin", "user"),
            required: true,
            defaultValue: 'user'

        },
        token: {
            type: DataTypes.VIRTUAL,
            get() {
                return jwt.sign({ userID: this.id, role: this.role }, process.env.SECRET);
            },
        },
        Date_Of_Birth: {
            type: DataTypes.STRING,
        },
        Gender: {
            type: DataTypes.ENUM('male', 'female'),
        },
        email: {
            type: DataTypes.STRING,
            validate: { isEmail: true },
            allowNull: false,
        },
        Hero: {
            type: DataTypes.STRING,
        },
        Profile: {
            type: DataTypes.STRING,
        },
    });

    User.addHook('beforeCreate', (user) => {
        user.Server_DateTime = new Date();
    });

    User.addHook('beforeUpdate', (user) => {
        user.Server_DateTime = new Date();
    });

    return User;
};

module.exports = userModel;

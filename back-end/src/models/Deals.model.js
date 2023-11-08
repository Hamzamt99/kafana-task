'use strict';

const dealsModel = (sequelize, DataTypes) => {
    const Deals = sequelize.define('deals', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Description: {
            type: DataTypes.STRING,
        },
        Amount: {
            type: DataTypes.INTEGER,
        },
        Currency: {
            type: DataTypes.STRING,
        },
        Server_DateTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Status: {
            type: DataTypes.ENUM('Active', 'Inactive', 'Deleted', 'Expired'),
            allowNull: true,
            defaultValue: 'Inactive'
        },
        image: {
            type: DataTypes.STRING,
        },
    });

    Deals.addHook('beforeCreate', (deal) => {
        deal.Server_DateTime = new Date();
    });

    Deals.addHook('beforeUpdate', (deal) => {
        deal.Server_DateTime = new Date();
    });

    return Deals;
};

module.exports = dealsModel;

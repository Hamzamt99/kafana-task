'use strict';

const claimedModel = (sequelize, DataTypes) => {
    const claimedDeals = sequelize.define('claimed', {
        User_ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Deal_ID: {
            type: DataTypes.INTEGER,
            allowNull: false
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
    });

    claimedDeals.addHook('beforeCreate', (claimed) => {
        claimed.Server_DateTime = new Date();
    });

    claimedDeals.addHook('beforeUpdate', (claimed) => {
        claimed.Server_DateTime = new Date();
    });

    return claimedDeals;
};

module.exports = claimedModel;

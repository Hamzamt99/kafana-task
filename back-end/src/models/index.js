'use strict'

// imports
const { Sequelize, DataTypes } = require("sequelize");
const Collection = require("../collection/Collection");

// check if the enviorment is a test or production if test run the sqlite else run postgresql
const DATABASE_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATA_BASE_URL;

// sequelize options 
let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
} : {}

// create new instance from sequlize and send the database and the options as parameters
let sequelize = new Sequelize(DATABASE_URI, sequelizeOptions)

// import the models
const users = require('./Users.model');
const deals = require('./Deals.model')
const claimedDeals = require('./Claimed.model')

// connect the models to sequelize by send the database and data types as parameters 
let usersModel = users(sequelize, DataTypes)
let dealsModel = deals(sequelize, DataTypes)
let claimedModel = claimedDeals(sequelize, DataTypes)

// tables relations one to many (user one to many with claimed deals table)
usersModel.hasMany(claimedModel, { foreignKey: "User_ID", sourceKey: "id" });
claimedModel.belongsTo(usersModel, { foreignKey: "User_ID", targetKey: "id" });

// tables relations one to many (deals one to many with claimedModel deals table)
dealsModel.hasMany(claimedModel, { foreignKey: "Deal_ID", sourceKey: "id" });
claimedModel.belongsTo(dealsModel, { foreignKey: "Deal_ID", targetKey: "id" });

// create new instance from collection class 
let user = new Collection(usersModel)
let deal = new Collection(dealsModel)
let claimed = new Collection(claimedModel)

// import the models and the database (models with the new instance and the models without class collection)
module.exports = {
    db: sequelize,
    usersModel,
    user,
    deal,
    dealsModel,
    claimed,
    claimedModel
}
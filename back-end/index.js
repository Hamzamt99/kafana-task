'use strict'

// require 
require('dotenv').config()
const port = process.env.PORT || 3001

// call the start function to run the server
const { start } = require('./src/server')

// call the data base and use it
const { db } = require('./src/models')

db.sync().then(() => {
    start(port)
}).catch(error => console.log(error)) 
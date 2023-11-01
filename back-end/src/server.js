'use strict'

// require 
const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes')
const app = express()

// use in all endpoints 
app.use(express.json());
app.use(cors())
app.use(authRoutes)
// create function for listening for the server 
function start(port) {
    app.listen(port, () => console.log('the server is runing on port', port))
}

module.exports = {
    start,
    app
}
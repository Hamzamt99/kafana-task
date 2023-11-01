'use strict'

const express = require('express')
const models = require('../models')
const authRoutes = express.Router()


authRoutes.post("/signup", async (req, res) => {
    try {
        const obj = req.body
        if (obj) {
            const email = obj.email
            const validEmail = await models.usersModel.findOne({ where: { email } })
            if (!validEmail) {
                const createUser = await models.usersModel.create(obj);
                res.status(200).json(createUser);
            } else {
                res.status(500).json('email already in use')
            }
        }
    } catch (err) {
        res.status(500).json(err.message)
    } 
});

module.exports = authRoutes
'use strict'

const { user } = require("../../models");
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const obj = req.body
        const id = req.params.id
        if (id) {
            const users = await user.read(id)
            if (users) {
                await users.update({ password: obj.newPassword });
                console.log('Password updated successfully.');
                next();
            } else next('user not found')
        } else {
            res.status(401).send('not authorized')
        }
    } catch (e) {
        res.status(401).json(e.message);
    }
}
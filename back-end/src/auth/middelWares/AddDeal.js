'use strict'

const { deal } = require("../../models")

module.exports = async (req, res, next) => {
        const getUser = await user.read(id)
        req.data = getUser
        next()
}
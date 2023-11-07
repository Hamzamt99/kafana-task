'use strict'

const { user } = require("../../models")

module.exports = async (req, res, next) => {
    const users = req.users
    if (users) {
        const id = users.userID
        const getUser = await user.read(id)
        req.data = getUser
        next()
    } else next('something went wrong')

}
"use strict";
const { user } = require("../../models");

module.exports = async (req, res, next) => {
    try {
        const users = req.users
        if (users) {
            const id = users.userID
            const getUser = await user.read(id)
            const data = getUser;
            const body = req.body;
            if (body) {
                if (body.email) {
                    const updateEmail = await user.find(body.email);
                    updateEmail === null
                        ? await data.update({ eamil: body.email })
                        : res.status(500).json("email is already exits");
                }
                await data.update({ name: body.name });
                await data.update({ phone: body.phone });
                await data.update({ Date_Of_Birth: body.Date_Of_Birth });
            }
        }
        next();
    } catch (err) {
        next(err);
    }
};

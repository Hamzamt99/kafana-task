'use strict'

//imports 
const express = require('express')
const models = require('../models')
const authRoutes = express.Router()
const login = require('../auth/middelWares/Login')
const isAuth = require('../auth/middelWares/BearerToken')
const { user } = require('../models')
const changePass = require('../auth/middelWares/changePass')
const forgetPassword = require('../auth/middelWares/nodeMiler')
const updateProfile = require('../auth/middelWares/updateProfile')
const { uploadProfile, profileUpload } = require('../auth/middelWares/multer')
const userProfile = require('../auth/middelWares/userProfile')

// sign up route or endpoint
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

// update user data 
authRoutes.patch('/user', isAuth, async (req, res) => {
    try {
        const body = req.body;
        const id = req.users.userID
        if (body) {
            const updateUser = await user.update(id, body);
            res.status(200).json(updateUser);
        } else {
            res.status(400).json('Invalid request - missing request body');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e.message);
    }
});



// login route or endpoint
authRoutes.post('/login', login, async (req, res) => {
    res.status(200).json(req.user)
})

// home route or endpoint
authRoutes.get('/home', isAuth, async (req, res) => {
    res.status(200).json('welcome home')
})

// send reset link to the email 
authRoutes.post('/forgetPassword', forgetPassword, (req, res) => {
    res.status(200).json('email has been sent')
})

// update the password
authRoutes.post('/resetPassword/:id', changePass, (req, res) => {
    res.status(200).json('password changed successfully')
})

// update the password
authRoutes.get('/resetPassword/:id', (req, res) => {
    res.status(200).json('change password')
})

authRoutes.get('/profile', isAuth, async (req, res) => {
    try {
        let id = req.users.userID
        if (id) {
            const userData = await user.read(id)
            res.status(200).json({
                name: userData.name,
                phone: userData.phone,
                Date_Of_Birth: userData.Date_Of_Birth,
                email: userData.email,
                Status: userData.Status,
                heroImage: userData.Hero,
                profileImage: userData.Profile
            })
        }
    } catch (e) {

    }
})

authRoutes.patch('/profile', isAuth, updateProfile, (req, res) => res.status(200).json('profile Updated')
)

authRoutes.post('/profileImage', isAuth, userProfile, profileUpload.single('image'), uploadProfile, async (req, res) => {
    try {
        const data = req.data;
        await data.update({ Profile: req.image });
        res.status(200).json('image uploaded')
    } catch (err) {
        res.status(500).json(err);
    }
})

authRoutes.post('/heroImage', isAuth, userProfile, profileUpload.single('image'), uploadProfile, async (req, res) => {
    try {
        const data = req.data;

        await data.update({ Hero: req.image });
        res.status(200).json('image uploaded')
    } catch (err) {
        res.status(500).json(err);
    }
})
module.exports = authRoutes
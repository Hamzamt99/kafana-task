'use strict';

// imports
const nodemailer = require('nodemailer');
const { user } = require('../../models');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const LINK = process.env.LINK
require('dotenv').config();

// call the email and the pass from dotenv
const users = process.env.EMAIL;
const pass = process.env.PASS;

// declare the transporter structer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: users,
        pass: pass
    }
});

// create the middleware to send the link to the email
module.exports = async (req, res, next) => {
    try {
        // take the email from the body
        const email = req.body.email;
        // check if the email is exists in database
        const find = await user.find(email);
        if (find) {
            req.users = find;
            // create a token contain the id to send it to user with the link in the params to update the password
            const token = jwt.sign({ id: find.id }, secret);
            // option of the email structer
            const mailOptions = {
                from: `"Kafana tech" <${users}>`,
                to: email,
                subject: 'Reset Password',
                text: `Here is the link: ${LINK}/resetPassword`,
                html: `Link to reset your password: <p> \n Click <a href="${LINK}/resetPassword/${token}">here</a> to access the link.</p>`
            };
            // send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    res.status(500).send('Error sending email: ' + error.message);
                } else {
                    next();
                }
            });
        } else {
            res.status(404).send('Email not found');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error: ' + error.message);
    }
};

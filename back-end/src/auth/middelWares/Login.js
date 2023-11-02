'use strict'

//imports
const base = require('base-64')
const bcrypt = require('bcrypt')
const { user } = require('../../models')

module.exports = async (req, res, next) => {
     // check if the headers contain the username and the password
     if (req.headers.authorization) {
          // split the the headers get the basic and the data in array and remove the basic and keep the data
          const header = req.headers.authorization.split(' ').pop()
          // decode the data to be readable 
          const decode = base.decode(header)
          // split the and decode the data and store them in email and pass variables 
          const [email, password] = decode.split(":")
          // check if the email is exists
          const validUser = await user.find(email)
          if (validUser !== null) {
               // check if the password is correct
               const validPass = await bcrypt.compare(password, validUser.password)
               if (validPass) {
                    // send the data in request 
                    req.user = validUser
                    next()
               } else {
                    res.status(401).json('Invalid password');
               }
          }
          else {
               res.status(401).json('Invalid email');
          }
     }
     else {
          res.status(401).json('please enter the full data');
     }
}
const jwt = require('jsonwebtoken')
const { user } = require('../../models')

module.exports = async (req, res, next) => {
     try {
          // declare the secert to verify the token
          let Secret = process.env.SECRET || '123'
          // take the token from the headers and split it to return an array to remove the bearer 
          const header = req.headers.authorization.split(" ").pop()
          // verify the token using verify method to check if the token signature is valid or not 
          const validBearer = jwt.verify(header, Secret)
          // check the token data is corrcet by searching for the id if exists
          const getUser = await user.read(validBearer.id)
          if (getUser) {
               // send the data in the req
               req.users = validBearer
               next()
          } else {
               next('invalid token')
          }
     } catch (err) {
          next(err)
     }
}
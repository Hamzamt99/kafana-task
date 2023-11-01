const jwt = require('jsonwebtoken')
const { user } = require('../../models')

module.exports = async (req, res, next) => {
     try {
          let Secret = process.env.SECRET || '123'
          const header = req.headers.authorization.split(" ").pop()
          const validBearer = jwt.verify(header, Secret)
          const getUser = await user.read(validBearer.id)
          if (getUser) {
               req.users = validBearer
               next()
          } else {
               next('invalid token')
          }
     } catch (err) {
          next(err)
     }
}
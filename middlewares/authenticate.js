const jwt = require('jsonwebtoken')

const { User } = require('../models')

const { requestError } = require('../helpers')

const { SECRET_KEY } = process.env

const authenticate = async (req, _, next) => {
  const { authorization = '' } = req.headers
  const [bearer, token] = authorization.split(' ')

  if (bearer !== 'Bearer') next(requestError(401, 'Not authorized'))
  try {
    jwt.verify(token, SECRET_KEY)
    const user = await User.findOne({ token })

    if (!user) next(requestError(401, 'Not authorized'))

    req.user = user
    next()
  } catch (error) {
    next(requestError(401, error.message))
  }
}

module.exports = authenticate

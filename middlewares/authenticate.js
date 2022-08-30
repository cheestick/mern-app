const jwt = require('jsonwebtoken')

const { User } = require('../models')

const { requestError } = require('../helpers')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers
  const [bearer, token] = authorization.split(' ')

  if (bearer !== 'Bearer') next(requestError(401, 'Unauthorized'))

  try {
    jwt.verify(token, SECRET_KEY)
    const user = await User.findById({ token })

    if (!user) next(requestError(401, 'Unauthorized'))

    req.user = user
    next()
  } catch (error) {
    next(requestError(401, error.message))
  }
}

module.exports = authenticate

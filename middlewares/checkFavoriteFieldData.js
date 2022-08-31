const { requestError } = require('../helpers')

const checkFavoriteFieldData = (req, _, next) => {
  const { favorite = null } = req.body
  favorite ?? next(requestError(400, 'missing field favorite'))

  next()
}

module.exports = checkFavoriteFieldData

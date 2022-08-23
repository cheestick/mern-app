const { requestError } = require('../helpers')

const checkFavoriteFieldData = (req, _, next) => {
  if (Object.keys(req.body).length === 0 || !req.body.favorite)
    next(requestError(400, 'missing field favorite'))

  next()
}

module.exports = checkFavoriteFieldData

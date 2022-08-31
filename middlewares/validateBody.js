const { requestError } = require('../helpers')

const validateBody = (schema) => (req, _, next) => {
  const { error } = schema.validate(req.body)
  error && next(requestError(400, error.message))

  next()
}

module.exports = validateBody

const { isValidObjectId } = require('mongoose')

const { requestError } = require('../helpers')

const validateId = (req, _, next) => {
  const { contactId } = req.params
  const isCorrectId = isValidObjectId(contactId)

  if (!isCorrectId) next(requestError(404, `${contactId} has incorrect format`))

  next()
}

module.exports = validateId

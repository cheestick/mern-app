const hasConflict = ({ name, code }) =>
  name === 'MongoServerError' && code === 11000

const handleSchemaValidationErorrs = (error, _, next) => {
  error.status = hasConflict(error) ? 409 : 400
  next()
}

module.exports = handleSchemaValidationErorrs

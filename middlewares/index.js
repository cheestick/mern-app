const errorBoundary = require('./errorBoudary')
const validateContactData = require('./validateContactData')
const checkRequiredContactFields = require('./checkRequiredContactFields')
const checkEmptyContactUpdateData = require('./checkEmptyContactUpdateData')
const validateId = require('./validateId')
const checkFavoriteFieldData = require('./checkFavoriteFieldData')

module.exports = {
  errorBoundary,
  checkRequiredContactFields,
  checkEmptyContactUpdateData,
  validateContactData,
  validateId,
  checkFavoriteFieldData,
}

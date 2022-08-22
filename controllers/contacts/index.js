const getAllContacts = require('./getAllContacts')
const getContactById = require('./getContactById')
const addContact = require('./addContact')
const removeContactById = require('./removeContactById')
const updateContactById = require('./updateContactById')
const updateFavoriteById = require('./updateFavoriteById')

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContactById,
  updateContactById,
  updateFavoriteById,
}

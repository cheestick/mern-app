const express = require('express')

const {
  contactsCtrl: {
    getAllContacts,
    getContactById,
    addContact,
    removeContactById,
    updateContactById,
    updateFavoriteById,
  },
} = require('../../controllers')

const {
  errorBoundary,
  checkRequiredContactFields,
  checkEmptyContactUpdateData,
  checkFavoriteFieldData,
  validateContactData,
  validateId,
} = require('../../middlewares')

const {
  schemas: { updateFavoriteSchema, fullInfo },
} = require('../../models')

const router = express.Router()

router.get('/', errorBoundary(getAllContacts))

router.get('/:contactId', validateId, errorBoundary(getContactById))

router.post(
  '/',
  checkRequiredContactFields,
  validateContactData(fullInfo),
  errorBoundary(addContact)
)

router.put(
  '/:contactId',
  validateId,
  checkEmptyContactUpdateData,
  validateContactData(fullInfo),
  errorBoundary(updateContactById)
)

router.patch(
  '/:contactId/favorite',
  validateId,
  checkFavoriteFieldData,
  validateContactData(updateFavoriteSchema),
  errorBoundary(updateFavoriteById)
)

router.delete('/:contactId', validateId, errorBoundary(removeContactById))

module.exports = router

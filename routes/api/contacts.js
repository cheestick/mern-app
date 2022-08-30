const express = require('express')

const {
  contactsCtrl: {
    getAllContacts,
    getContactById,
    addContact,
    removeContactById,
    updateContactById,
    updateStatusContact,
  },
} = require('../../controllers')

const {
  errorBoundary,
  checkRequiredContactFields,
  checkEmptyContactUpdateData,
  checkFavoriteFieldData,
  validateBody,
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
  validateBody(fullInfo),
  errorBoundary(addContact)
)

router.put(
  '/:contactId',
  validateId,
  checkEmptyContactUpdateData,
  validateBody(fullInfo),
  errorBoundary(updateContactById)
)

router.patch(
  '/:contactId/favorite',
  validateId,
  checkFavoriteFieldData,
  validateBody(updateFavoriteSchema),
  errorBoundary(updateStatusContact)
)

router.delete('/:contactId', validateId, errorBoundary(removeContactById))

module.exports = router

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
  authenticate,
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

router.get('/', authenticate, errorBoundary(getAllContacts))

router.get(
  '/:contactId',
  authenticate,
  validateId,
  errorBoundary(getContactById)
)

router.post(
  '/',
  authenticate,
  checkRequiredContactFields,
  validateBody(fullInfo),
  errorBoundary(addContact)
)

router.put(
  '/:contactId',
  authenticate,
  validateId,
  checkEmptyContactUpdateData,
  validateBody(fullInfo),
  errorBoundary(updateContactById)
)

router.patch(
  '/:contactId/favorite',
  authenticate,
  validateId,
  checkFavoriteFieldData,
  validateBody(updateFavoriteSchema),
  errorBoundary(updateStatusContact)
)

router.delete(
  '/:contactId',
  authenticate,
  validateId,
  errorBoundary(removeContactById)
)

module.exports = router

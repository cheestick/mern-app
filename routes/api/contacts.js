const express = require("express");
const {
  contactsCtrl: {
    getAllContacts,
    getContactById,
    addContact,
    removeContactById,
    updateContactById,
  },
} = require("../../controllers");

const { errorBoundary } = require("../../middlewares");

const { validateContactData } = require("../../middlewares");
const {
  contact: { fullInfo },
} = require("../../schemas");

const router = express.Router();

router.get("/", errorBoundary(getAllContacts));

router.get("/:contactId", errorBoundary(getContactById));

router.post("/", validateContactData(fullInfo), errorBoundary(addContact));

router.put(
  "/:contactId",
  validateContactData(fullInfo),
  errorBoundary(updateContactById)
);

router.delete("/:contactId", errorBoundary(removeContactById));

module.exports = router;

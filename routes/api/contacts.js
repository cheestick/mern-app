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

const router = express.Router();

router.get("/", errorBoundary(getAllContacts));

router.get("/:contactId", errorBoundary(getContactById));

router.post("/", errorBoundary(addContact));

router.delete("/:contactId", errorBoundary(removeContactById));

router.put("/:contactId", errorBoundary(updateContactById));

module.exports = router;

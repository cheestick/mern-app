const express = require("express");
const { contactsCtrl } = require("../../controllers");
const { errorBoundary } = require("../../middlewares");

const router = express.Router();

router.get("/", errorBoundary(contactsCtrl.getAllContacts));

router.get("/:contactId", errorBoundary(contactsCtrl.getContactById));

router.post("/", contactsCtrl.addContact);

router.delete("/:contactId", contactsCtrl.removeContactById);

router.put("/:contactId", contactsCtrl.updateContactById);

module.exports = router;

const express = require("express");
const { contactsCtrl } = require("../../controllers");

const router = express.Router();

router.get("/", contactsCtrl.getAllContacts);

router.get("/:contactId", contactsCtrl.getContactById);

router.post("/", contactsCtrl.addContact);

router.delete("/:contactId", contactsCtrl.removeContactById);

router.put("/:contactId", contactsCtrl.updateContactById);

module.exports = router;

const { contactsModel } = require("../../models");

const addContact = async (req, res, _) => {
  const result = await contactsModel.addContact(req.body);
  res.status(201).json(result);
};

module.exports = addContact;

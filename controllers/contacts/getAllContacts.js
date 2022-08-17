const { contactsModel } = require("../../models");

const getAllContacts = async (_, res, __) => {
  const result = await contactsModel.listContacts();
  res.status(200).json(result);
};

module.exports = getAllContacts;

const { contactsModel } = require("../../models");
const { requestError } = require("../../helpers");

const updateContactById = async (req, res, _) => {
  const { contactId } = req.params;

  const result = await contactsModel.updateContact(contactId, req.body);

  if (!result) throw requestError(404, "Not found!");

  res.status(200).json(result);
};

module.exports = updateContactById;

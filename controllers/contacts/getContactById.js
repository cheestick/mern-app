const { contactsModel } = require("../../models");
const { requestError } = require("../../helpers");

const getContactById = async (req, res, __) => {
  const { contactId } = req.params;
  const result = await contactsModel.getContactById(contactId);

  if (!result) throw requestError(404, "Not found!");

  res.status(200).json(result);
};

module.exports = getContactById;

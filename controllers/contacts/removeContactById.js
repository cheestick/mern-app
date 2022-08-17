const { contactsModel } = require("../../models");
const { requestError } = require("../../helpers");

const removeContactById = async (req, res, _) => {
  const { contactId } = req.params;
  const result = await contactsModel.removeContact(contactId);
  if (!result) throw requestError(404, "Not found!");

  res.status(200).json({
    message: "contact deleted",
  });
};

module.exports = removeContactById;

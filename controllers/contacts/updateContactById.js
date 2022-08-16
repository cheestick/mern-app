const { contactsModel } = require("../../models");
const { requestError } = require("../../helpers");

const updateContactById = async (req, res, _) => {
  const { contactId } = req.params;
  // const { name, email, phone } = req.body;
  // if (!name || !email || !phone) {
  //   res.status(400).json({
  //     status: "failed",
  //     code: 400,
  //     message: "Missing fields",
  //   });
  //   return;
  // }

  const result = await contactsModel.updateContact(contactId, req.body);

  if (!result) throw requestError(404, "Not found!");

  res.status(200).json(result);
};

module.exports = updateContactById;

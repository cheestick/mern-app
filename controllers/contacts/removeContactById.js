const { contactsModel } = require("../../models");

const removeContactById = async (req, res, _) => {
  const { contactId } = req.params;
  const result = await contactsModel.removeContact(contactId);
  if (!result) {
    res.status(404).json({
      status: "failed",
      code: 404,
      message: "Not found",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "contact deleted",
  });
};

module.exports = removeContactById;

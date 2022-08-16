const { contactsModel } = require("../../models");

const updateContactById = async (req, res, _) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Missing fields",
    });
    return;
  }

  const result = await contactsModel.updateContact(contactId, req.body);

  if (!result) {
    res.status(404).json({
      status: "failed",
      code: 404,
      message: "Not found!",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = updateContactById;

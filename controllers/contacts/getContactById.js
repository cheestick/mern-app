const { contactsModel } = require("../../models");

const getContactById = async (req, res, __) => {
  const { contactId } = req.params;
  const result = await contactsModel.getContactById(contactId);

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
    data: {
      result,
    },
  });
};

module.exports = getContactById;

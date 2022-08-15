const { contactsModel } = require("../../models");

const getAllContacts = async (_, res, __) => {
  const result = await contactsModel.listContacts();
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAllContacts;

const { contactsModel } = require("../../models");

const addContact = async (req, res, _) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }

  const result = await contactsModel.addContact(req.body);
  res.status(201).json({ status: "success", code: 201, data: { result } });
};

module.exports = addContact;

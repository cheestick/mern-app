const { Contact } = require('../../models')

const addContact = async (req, res, _) => {
  const result = await Contact.create(req.body)
  res.status(201).json(result)
}

module.exports = addContact

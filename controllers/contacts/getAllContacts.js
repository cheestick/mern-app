const { Contact } = require('../../models')

const getAllContacts = async (_, res, __) => {
  const result = await Contact.find({}, '-createdAt -updatedAt')
  res.status(200).json(result)
}

module.exports = getAllContacts

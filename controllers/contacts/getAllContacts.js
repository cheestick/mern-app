const { Contact } = require('../../models')

const getAllContacts = async (req, res, __) => {
  const { _id: owner } = req.user
  const { page = 1, limit = 5 } = req.query
  const skip = (page - 1) * limit
  const result = await Contact.find({ owner }, '-createdAt -updatedAt', {
    skip,
    limit: Number(limit),
  })
  res.status(200).json(result)
}

module.exports = getAllContacts

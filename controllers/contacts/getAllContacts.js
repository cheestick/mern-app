const { Contact } = require('../../models')

const getAllContacts = async (req, res, __) => {
  const { _id: owner } = req.user
  const { page = 1, limit = 5, favorite = null } = req.query
  const skip = (page - 1) * limit

  const searchOptions = { owner }
  favorite && (searchOptions.favorite = favorite)

  const result = await Contact.find(searchOptions, '-createdAt -updatedAt', {
    skip,
    limit: Number(limit),
  })
  res.status(200).json(result)
}

module.exports = getAllContacts

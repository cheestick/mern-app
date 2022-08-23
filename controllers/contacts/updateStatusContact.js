const { Contact } = require('../../models')

const { requestError } = require('../../helpers')

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })
  if (!result) {
    throw requestError(404, 'Not found')
  }
  res.status(200).json(result)
}

module.exports = updateStatusContact

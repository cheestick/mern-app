const { Contact } = require('../../models')

const { requestError } = require('../../helpers')

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params
  const { _id: owner } = req.user
  console.log(req.user)
  const result = await Contact.findOneAndUpdate(
    { owner, _id: contactId },
    req.body,
    {
      new: true,
    }
  )
  console.log(result)

  if (!result) {
    throw requestError(404, 'Not found')
  }
  res.status(200).json(result)
}

module.exports = updateStatusContact

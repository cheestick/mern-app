const { Contact } = require('../../models')
const { requestError } = require('../../helpers')

const removeContactById = async (req, res, _) => {
  const { contactId } = req.params
  const { _id: owner } = req.user
  const result = await Contact.findOneAndRemove({ owner, _id: contactId })
  if (!result) throw requestError(404, 'Not found!')

  res.status(200).json({
    message: 'contact deleted',
  })
}

module.exports = removeContactById

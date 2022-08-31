const { User } = require('../../models')
const { requestError } = require('../../helpers')

const updateSubsctiption = async (req, res) => {
  const { _id } = req.user
  const { subscription } = req.body

  const result = await User.findOneAndUpdate(
    { _id },
    { subscription },
    { new: true }
  )

  if (!result) throw requestError(404, 'Not found!')

  res.status(200).json({
    email: result.email,
    subscription: result.subscription,
  })
}

module.exports = updateSubsctiption

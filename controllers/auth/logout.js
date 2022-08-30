const { User } = require('../../models')

const logout = async (req, res) => {
  const { _id } = req.user

  await User.findOneAndUpdate({ _id }, { token: null }, { new: true })

  res.status(204).json()
}

module.exports = logout

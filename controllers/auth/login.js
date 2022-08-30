const jwt = require('jsonwebtoken')

const { User } = require('../../models')

const { requestError } = require('../../helpers')

const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) throw requestError(401, 'User not found')

  const hasValidPassword = await user.validatePassword(password)
  if (!hasValidPassword) throw requestError(401, 'Wrond password')

  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
  await User.findByIdAndUpdate(user._id, { token })
  res.status(200).json({ token })
}

module.exports = login

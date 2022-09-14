const jwt = require('jsonwebtoken')

const { User } = require('../../models')

const { requestError } = require('../../helpers')

const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) throw requestError(401, 'Email or password is wrong')

  const hasValidPassword = await user.validatePassword(password)
  if (!hasValidPassword) throw requestError(401, 'Email or password is wrong')

  if (!user.verify) throw requestError(401, 'Email is not verified')

  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
  const result = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  )
  res.status(200).json({
    token: result.token,
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  })
}

module.exports = login

const bcrypt = require('bcrypt')
const gravatar = require('gravatar')

const { User } = require('../../models')

const { requestError } = require('../../helpers')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) throw requestError(409, 'Email in use')

  const hashedPassword = await bcrypt.hash(password, 10)
  const avatarURL = gravatar.url(email)
  const result = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
  })
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  })
}

module.exports = signup

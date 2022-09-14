const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const { User } = require('../../models')
const { requestError } = require('../../helpers')
const { v4 } = require('uuid')
const { sendMail } = require('../../helpers')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) throw requestError(409, 'Email in use')

  const hashedPassword = await bcrypt.hash(password, 10)
  const avatarURL = gravatar.url(email)
  const verificationToken = v4()

  const result = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  })

  await sendMail({
    to: email,
    subject: 'Email confirmation',
    html: `<a target="_blank" href='http://localhost:3000/users/verify/${verificationToken}'> Click to confirm your email</a>`,
  })

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  })
}

module.exports = signup

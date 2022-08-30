const bcrypt = require('bcrypt')

const { User } = require('../../models')

const { requestError } = require('../../helpers')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) throw requestError(409, 'User already exist')

  const hashedPassword = await bcrypt.hash(password, 10)
  const result = await User.create({ email, password: hashedPassword })
  res.status(201).json({ email: result.email })
}

module.exports = register

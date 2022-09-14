const { User, emailVerificationSchema } = require('../../models')
const { requestError, sendMail } = require('../../helpers')

const emailConfirmation = async (req, res, next) => {
  try {
    const { error } = emailVerificationSchema.validate(req.body)
    if (error) throw requestError(400, 'Missing required field email')

    const { email } = req.body
    const user = await User.findOne({ email })
    if (user.verify)
      throw requestError(400, 'Verification has already been passed')

    await sendMail({
      to: email,
      subject: 'Email confirmation',
      html: `a targer='_blank' href='http://localhost:3000/users/${user.verificationToken}'>Click to confim email</a>`,
    })

    res.status(200).json({ message: 'Verification email was sent' })
  } catch (error) {
    next(error)
  }
}

module.exports = emailConfirmation

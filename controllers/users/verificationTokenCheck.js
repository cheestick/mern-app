const { User } = require('../../models')
const { requestError } = require('../../helpers')

const verificationTokenCheck = async (req, res, next) => {
  try {
    const { verificationToken } = req.params
    const user = await User.findOne({ verificationToken })
    if (!user) throw requestError(404, 'User not Found')

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: '',
    })

    res.status(200).json({
      message: 'Verification successful',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = verificationTokenCheck

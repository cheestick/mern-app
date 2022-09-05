const fs = require('fs/promises')
const path = require('path')
const jimp = require('jimp')

const { User } = require('../../models')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const changeAvatar = async (req, res, next) => {
  try {
    const { path: tmpDir, filename } = req.file
    const { _id } = req.user
    const [ext] = filename.split('.').reverse()
    const avatarFilename = `${_id}.${ext}`
    const avatarsDestinationPath = path.join(avatarsDir, avatarFilename)

    await fs.rename(tmpDir, avatarsDestinationPath)
    const avatarFile = await jimp.read(avatarsDestinationPath)
    await avatarFile.resize(250, 250).writeAsync(avatarsDestinationPath)

    const avatarURL = path.join('avatars', avatarFilename)

    const user = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true })
    res.json({ avatarURL: user.avatarURL })
  } catch (error) {
    await fs.unlink(req.file.path)
    next(error)
  }
}

module.exports = changeAvatar

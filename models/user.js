const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcrypt')

const { handleSchemaValidationErrors } = require('../helpers')

const patterns = {
  // eslint-disable-next-line no-useless-escape
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
}

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: patterns.email,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    avatarURL: String,
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
)

userSchema.post('save', handleSchemaValidationErrors)

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

const signUpSignInSchema = Joi.object({
  email: Joi.string().pattern(patterns.email).required(),
  password: Joi.string().min(6).required(),
})

const subscriptionSchema = Joi.object({
  subscription: Joi.any().valid('starter', 'pro', 'business').required(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  signUpSignInSchema,
  subscriptionSchema,
}

const { Schema, model } = require('mongoose')
const Joi = require('joi')

const { handleSchemaValidationErrors } = require('../helpers')

const patterns = {
  phone: /^\(\d{3}\) \d{3}-\d{4}$/,
}

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
)

contactSchema.post('save', handleSchemaValidationErrors)

const fullInfoSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string().pattern(patterns.phone).required(),
  favorite: Joi.boolean(),
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = {
  fullInfo: fullInfoSchema,
  updateFavoriteSchema,
}

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  schemas,
}

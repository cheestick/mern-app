const { Schema, model } = require('mongoose')
const Joi = require('joi')

// const { handleSchemaValidationErrors } = require('../helpers')

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
  },
  { versionKey: false, timestamps: true }
)

// contactSchema.post('save', handleSchemaValidationErorrs)

const fullInfoSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string().min(2).max(20).pattern(patterns.phone).required(),
  favorite: Joi.boolean(),
})

const updateFavariteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = {
  fullInfo: fullInfoSchema,
  updateFavariteSchema,
}

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  schemas,
}

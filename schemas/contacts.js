const Joi = require("joi");

const fullInfoSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(2).max(20).required(),
});

module.exports = { fullInfo: fullInfoSchema };

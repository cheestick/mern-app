const { requestError } = require("../helpers");

const validateContactData = (schema) => (req, _, next) => {
  const { error } = schema.validate(req.body);
  error && next(requestError(400, error.message));

  next();
};

module.exports = validateContactData;

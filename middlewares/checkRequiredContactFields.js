const { requestError } = require("../helpers");

const checkRequiredContactFields = (req, _, next) => {
  const { name, email, phone } = req.body;
  !name && next(requestError(400, "missing required name field"));
  !email && next(requestError(400, "missing required email field"));
  !phone && next(requestError(400, "missing required phone field"));

  next();
};

module.exports = checkRequiredContactFields;

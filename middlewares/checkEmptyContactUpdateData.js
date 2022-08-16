const { requestError } = require("../helpers");

const checkEmptyContactUpdateData = (req, _, next) => {
  Object.keys(req.body).length === 0 &&
    next(requestError(400, "missing fields"));

  next();
};

module.exports = checkEmptyContactUpdateData;

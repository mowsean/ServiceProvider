const jsonResponseMiddlewareFactory = require("./jsonResponseMiddlewareFactory");
const toJSON = require("./toJSON");

const getAllCategory = jsonResponseMiddlewareFactory(req =>
  req.services
    .get("ss")
    .category.getAllCategory()
    .then(toJSON)
);

module.exports = {
  getAllCategory
};

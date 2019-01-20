const jsonResponseMiddlewareFactory = require("./jsonResponseMiddlewareFactory");
const toJSON = require("./toJSON");

const getAllCompanies = jsonResponseMiddlewareFactory(req =>
  req.services
    .get("ss")
    .company.getAllCompanies()
    .then(toJSON)
);

module.exports = {
  getAllCompanies
};

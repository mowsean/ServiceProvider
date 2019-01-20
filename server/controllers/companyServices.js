const jsonResponseMiddlewareFactory = require("./jsonResponseMiddlewareFactory");
const toJSON = require("./toJSON");

const getAllCompanyServices = jsonResponseMiddlewareFactory(req =>
  req.services
    .get("ss")
    .companyservices.getAllCompanyServices()
    .then(toJSON)
);

module.exports = {
  getAllCompanyServices
};

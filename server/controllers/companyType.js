const jsonResponseMiddlewareFactory = require("./jsonResponseMiddlewareFactory");
const toJSON = require("./toJSON");

const getAllCompanyType = jsonResponseMiddlewareFactory(req =>
  req.services
    .get("ss")
    .companyType.getAllCompanyType()
    .then(toJSON)
);

module.exports = {
  getAllCompanyType
};

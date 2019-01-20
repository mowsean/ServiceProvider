const jsonResponseMiddlewareFactory = require("./jsonResponseMiddlewareFactory");
const toJSON = require("./toJSON");

const getAllServiceProvider = jsonResponseMiddlewareFactory(req =>
  req.services
    .get("ss")
    .companyserviceprovider.getAllServiceProvider()
    .then(toJSON)
);

module.exports = {
  getAllServiceProvider
};

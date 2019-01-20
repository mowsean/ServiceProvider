function controllersFactory(authenticateMiddleware, authCallbackMiddleware) {
  const companyType = require("./companyType");
  const company = require("./company");
  const companyServices = require("./companyServices");
  const companyServiceProvider = require("./companyServiceProvider");
  const category = require("./category");

  return {
    company,
    companyType,
    companyServices,
    companyServiceProvider,
    category
  };
}

module.exports = controllersFactory;

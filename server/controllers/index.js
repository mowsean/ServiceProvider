function controllersFactory(authenticateMiddleware, authCallbackMiddleware) {
  const companyType = require("./companyType");

  return {
    companyType
  };
}

module.exports = controllersFactory;

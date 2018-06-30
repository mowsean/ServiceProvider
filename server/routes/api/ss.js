const { Router } = require("express");

/**
 * @function ssRouterFactory
 * @param {object} controllers - A hash of controllers available in the app.
 * @returns {Router}
 * @description
 * Creates the SQL specific routes.
 */
function ssRouterFactory(controllers) {
  const ssRouter = new Router();

  ssRouter.get("/companyTypes", controllers.companyType.getAllCompanyType);

  return ssRouter;
}

module.exports = ssRouterFactory;

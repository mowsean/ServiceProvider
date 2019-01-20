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

  ssRouter.get("/companytypes", controllers.companyType.getAllCompanyType);
  ssRouter.get("/company", controllers.company.getAllCompanies);
  ssRouter.get(
    "/companyservices",
    controllers.companyServices.getAllCompanyServices
  );
  ssRouter.get(
    "/companyserviceprovider",
    controllers.companyServiceProvider.getAllServiceProvider
  );
  ssRouter.get("/category", controllers.category.getAllCategory);

  return ssRouter;
}

module.exports = ssRouterFactory;

const { Router } = require("express");

/**
 * @function securityRouterFactory
 * @param {object} controllers - A hash of controllers available in the app.
 * @returns {Router}
 * @description
 * Creates the security routes.
 */
function securityRouterFactory(controllers) {
  const securityRouter = new Router();

  // Authentication

  securityRouter.get("/authenticate", controllers.security.authenticate);

  // securityRouter.get('/authenticate-callback',
  //   controllers.security.authCallback);

  securityRouter.get(
    "/logout",
    controllers.security.ensureAuthenticated,
    controllers.security.logout
  );

  // Informational Services

  securityRouter.get(
    "/current-user",
    controllers.security.gracefulEnsureAuthenticated,
    controllers.security.currentUser
  );

  return securityRouter;
}

module.exports = securityRouterFactory;

const { Router } = require("express");
const apiRouterFactory = require("./api");

function routesFactory(controllers) {
  const router = new Router();

  router.use("/api", apiRouterFactory(controllers));

  router.get("*", controllers.ui.serveSite);

  // TODO: 404?

  return router;
}

module.exports = routesFactory;

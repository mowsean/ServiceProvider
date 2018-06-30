const { Router } = require("express");

const ssRouterFactory = require("./ss");

module.exports = (controllers, config) => {
  const router = new Router();

  //  router.get('/login/return', controllers.security.authCallback);

  //  router.use('/security', securityRouterFactory(controllers));

  router.use(
    "/ss",

    ssRouterFactory(controllers)
  );

  return router;
};

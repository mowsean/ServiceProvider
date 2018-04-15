const { Router } = require("express");
const securityRouterFactory = require("./security");
const ssRouterFactory = require("./ss");
// const sqsRouterFactory = require('./sqs');
// const sqahRouterFactory = require('./sqah');

module.exports = controllers => {
  const router = new Router();

  router.get("/login/return", controllers.security.authCallback);

  router.use("/security", securityRouterFactory(controllers));

  router.use(
    "/ss",
    controllers.security.ensureAuthenticated,
    ssRouterFactory(controllers)
  );

  // router.use(
  //     '/sqs',
  //     controllers.security.ensureAuthenticated,
  //     sqsRouterFactory(controllers)
  // );

  // router.use(
  //     '/sqah',
  //     controllers.security.ensureAuthenticated,
  //     sqahRouterFactory(controllers)
  // );

  return router;
};

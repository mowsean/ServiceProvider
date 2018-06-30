const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const expressSession = require("express-session");
const morgan = require("morgan");

const controllersFactory = require("../controllers");
const siteRouterFactory = require("../routes");

/**
 * @function constructExpressApp
 * @param {StartupContext} ctx - A startup context.
 * @returns {StartupContext}
 * @description
 * Builds the express instance for the application.
 */
function constructExpressApp(ctx) {
  ctx.logger.info("Initializing express web server.");

  const app = express();

  const loggerStreamWriter = {
    write: function(message, encoding) {
      ctx.logger.info(message);
    }
  };

  const sessionConfig = {
    //    secret: ctx.config.http.sessionSecret,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: ctx.config.http.sessionTimeout
    }
  };

  app.set("trust proxy", "loopback");

  app.use(
    morgan("dev", {
      stream: loggerStreamWriter
    })
  );
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(compression());
  //    app.use(expressSession(sessionConfig));
  app.use(express.static(path.resolve("client/dist")));

  //  app.use(ctx.security.middleware.initialize);
  //  app.use(ctx.security.middleware.session);0
  app.use((req, res, next) => {
    // Dependency injection for the request:
    req.models = ctx.models;
    req.services = ctx.services;
    req.logger = ctx.logger;
    req.config = ctx.config;

    next();
  });

  const controllers = controllersFactory(
    ctx.security.middleware.authenticate,
    ctx.security.middleware.authCallback
  );
  const siteRouter = siteRouterFactory(controllers, ctx.config);

  app.use("/", siteRouter);

  ctx.setExpress(app);

  ctx.logger.info("Express web server initialized.");

  return ctx;
}

module.exports = constructExpressApp;

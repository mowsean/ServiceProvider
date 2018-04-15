const StartupContext = require("./boot/StartupContext");
const loadConfig = require("./boot/loadConfig");
const monitorProcess = require("./boot/monitorProcess");
const authenticateSequelize = require("./boot/authenticateSequelize");
const injectCustomSequelizeDataTypes = require("./boot/injectCustomSequelizeDataTypes");
const readyModels = require("./boot/readyModels");
const constructServices = require("./boot/constructServices");
//const constructSecurity = require('./boot/constructSecurity');
const constructExpressApp = require("./boot/constructExpressApp");
const startExpress = require("./boot/startExpress");

/**
 * @function main
 * @param {string} configEnv - Application environment: development, uat, production
 * @description
 * The main entry point for the application.  This performs all
 * work to start up SelectCARE.
 */
function main(configEnv) {
  const {
    setConfig,
    readyLogging,
    logStarting,
    logStarted,
    logStartError
  } = StartupContext();

  loadConfig(configEnv)
    .then(setConfig)
    // .then(readyLogging)
    .then(logStarting)
    .then(monitorProcess)
    .then(authenticateSequelize)
    .then(injectCustomSequelizeDataTypes)
    .then(readyModels)
    .then(constructServices)
    .then(constructSecurity)
    .then(constructExpressApp)
    .then(startExpress)
    .then(logStarted)
    .catch(logStartError);
}

module.exports = main;

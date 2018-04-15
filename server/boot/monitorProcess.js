/**
 * @function monitorProcess
 * @param {StartupContext} ctx - The startup context.
 * @returns {StartupContext}
 * @description
 * Attaches to the `process` object to monitor for
 * errors.
 */
function monitorProcess(ctx) {
  process.on("uncaughtException", error => {
    ctx.logger.error(error);
    process.exit(1);
  });

  process.on("unhandledRejection", error => {
    ctx.logger.error(error);
    process.exit(1);
  });

  return ctx;
}

module.exports = monitorProcess;

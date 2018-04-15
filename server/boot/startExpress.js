/**
 * @function startExpress
 * @param {StartupContext} ctx - A startup context.
 * @returns {Promise.<StartupContext>}
 * @description
 * Starts the express web server.
 */
function startExpress(ctx) {
  return new Promise(resolve => {
    ctx.logger.info("Starting express web server.");
    ctx.expressApp.listen(ctx.config.http.port, () => {
      ctx.logger.info("Express web server started.");
      resolve(ctx);
    });
  });
}

module.exports = startExpress;

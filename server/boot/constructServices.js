const services = require("../services");

/**
 * @function constructServices
 * @param {StartupContext} ctx - A startup context.
 * @returns {Promise.<StartupContext>}
 * @description
 * Main point that instantiates services for use throughout the system.
 */
function constructServices(ctx) {
  ctx.logger.info("Starting services initialization.");

  const sql = {
    support: new services.sql.Support(ctx.models.get("sql"))
    // user: new services.sql.User(ctx.models.get('sql')),
    // role: new services.sql.Role(ctx.models.get('sql')),
    // skillGroup: new services.sql.SkillGroup(ctx.models.get('sql')),
    // status: new services.sql.Status(ctx.models.get('sql')),
    // galAgentGroup: new services.sql.GALAgentGroup(ctx.models.get('sql')),
  };

  ctx.setServices("sql", sql);

  ctx.logger.info("Service initialization complete.");

  return ctx;
}

module.exports = constructServices;

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

  const ss = {
    companyType: new services.ss.CompanyTypeService(ctx.models.get("ss"))
    //  companyStaff: new services.ss.CompanyStaff(ctx.models.get('ss')),
    //   companyType: new services.ss.CompanyType(ctx.models.get('ss')),
  };

  //const sqs = {};

  //const sqah = {};

  ctx.setServices("ss", ss);
  // ctx.setServices('sqs', sqs);
  // ctx.setServices('sqah', sqah);

  ctx.logger.info("Service initialization complete.");

  return ctx;
}

module.exports = constructServices;

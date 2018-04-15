const customDataTypes = require("../models/customDataTypes");
const Sequelize = require("sequelize");

function injectCustomSequelizeDataTypes(ctx) {
  ctx.logger.info("Starting custom Sequelize data type injection.");

  Object.entries(customDataTypes).forEach(([key, dataType]) => {
    ctx.logger.info(`Injecting custom Sequelize type [${key}].`);
    Sequelize.DataTypes[key] = dataType;
    Sequelize[key] = dataType;
  });

  ctx.logger.info("Custom Sequelize data type injection complete.");

  return ctx;
}

module.exports = injectCustomSequelizeDataTypes;

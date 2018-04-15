/**
 * @function readyKeyedModels
 * @param {string} key
 * @param sequelize
 * @returns {*}
 */
function readyKeyedModels(key, sequelize) {
  const factory = require(`./${key}`);
  return factory(sequelize);
}

module.exports = readyKeyedModels;

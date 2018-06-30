const companyType = require("./companyType");

module.exports = sequelize => {
  let models = {
    companyType: companyType(sequelize)
  };

  return models; //relationships(models);
};

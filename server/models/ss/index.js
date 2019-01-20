const companyType = require("./company_type");
const company = require("./company");
const companyserviceprovider = require("./company_service_provider");
const companyservices = require("./company_service");
const category = require("./category");

module.exports = sequelize => {
  let models = {
    companyType: companyType(sequelize),
    company: company(sequelize),
    companyserviceprovider: companyserviceprovider(sequelize),
    companyservices: companyservices(sequelize),
    category: category(sequelize)
  };

  return models; //relationships(models);
};

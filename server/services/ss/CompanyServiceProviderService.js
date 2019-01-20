/**
 * @class CompanyServiceProviderService
 * @description
 * Provides business functions related to company types.
 */
class CompanyServiceProviderService {
  constructor(models) {
    this.models = models;
  }

  /**
   * @function getAllServiceProvider
   * @returns {Promise.<models.companyserviceprovider[]>}
   * @description
   * Retrieves all companyserviceprovider in the system.
   */
  getAllServiceProvider() {
    return this.models.companyserviceprovider.findAll();
  }
}

module.exports = CompanyServiceProviderService;

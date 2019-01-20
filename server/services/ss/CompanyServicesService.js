/**
 * @class CompanyServicesService
 * @description
 * Provides business functions related to company types.
 */
class CompanyServicesService {
  constructor(models) {
    this.models = models;
  }

  /**
   * @function getAllCompanyServices
   * @returns {Promise.<models.companyservices[]>}
   * @description
   * Retrieves all companyservice type in the system.
   */
  getAllCompanyServices() {
    return this.models.companyservices.findAll();
  }
}

module.exports = CompanyServicesService;

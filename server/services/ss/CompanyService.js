/**
 * @class CompanyService
 * @description
 * Provides business functions related to company types.
 */
class CompanyService {
  constructor(models) {
    this.models = models;
  }

  /**
   * @function getAllCompanies
   * @returns {Promise.<models.company[]>}
   * @description
   * Retrieves all company type in the system.
   */
  getAllCompanies() {
    return this.models.company.findAll();
  }
}

module.exports = CompanyService;

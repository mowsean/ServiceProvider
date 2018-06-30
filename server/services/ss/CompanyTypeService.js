/**
 * @class CompanyTypeService
 * @description
 * Provides business functions related to company types.
 */
class CompanyTypeService {
  constructor(models) {
    this.models = models;
  }

  /**
   * @function getAllCompanyType
   * @returns {Promise.<models.companyType[]>}
   * @description
   * Retrieves all company type in the system.
   */
  getAllCompanyType() {
    return this.models.companyType.findAll();
  }
}

module.exports = CompanyTypeService;

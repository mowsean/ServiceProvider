/**
 * @class CategoryService
 * @description
 * Provides business functions related to company types.
 */
class CategoryService {
  constructor(models) {
    this.models = models;
  }

  /**
   * @function getAllCategory
   * @returns {Promise.<models.category[]>}
   * @description
   * Retrieves all category type in the system.
   */
  getAllCategory() {
    return this.models.category.findAll();
  }
}

module.exports = CategoryService;

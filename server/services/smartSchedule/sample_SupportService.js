/**
 * @class SupportServices
 * @description
 * Catch all for supporting information needed by the application.
 */
class SupportService {
  constructor(models) {
    this.models = models;
  }

  /**
   * @function getAllTimezones
   * @returns {Promise.<models.timezones[]>}
   * @description
   * Retreives all timezones in the system.
   */
  getAllTimezones() {
    return this.models.timezones.findAll();
  }
}

module.exports = SupportService;

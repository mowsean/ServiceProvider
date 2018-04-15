/**
 * @function jsonResponseMiddlewareFactory
 * @param {function} promiser - Function that provides a promised result.
 * @returns {function} A middleware function.
 * @description
 * jsonResponseMiddlewareFactory creates a tidy wrapper for API controller middleware.
 */
const jsonResponseMiddlewareFactory = promiser => (req, res) =>
  promiser(req)
    .then(item => res.json(item))
    .catch(error => {
      req.logger.error(error);
      const payload =
        req.config.nodeEnv === "production"
          ? { message: error.message }
          : { message: error.message, stack: error.stack };
      res.status(500).json(payload);
    });

module.exports = jsonResponseMiddlewareFactory;

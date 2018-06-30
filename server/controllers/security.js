const jsonResponseMiddlewareFactory = require("./jsonResponseMiddlewareFactory");

/**
 * @function logout
 * @param {Object} req - request
 * @param {Object} res - response
 * @returns {Object} - A response object
 * @description
 *   Logout the user and redirect them back to the home page
 */
const logout = (req, res) => {
  req.logout();
  req.session.destroy(() => res.redirect("/"));
};

/**
 * @function currentUser
 * @description
 * Handler that serves details about the currently authenticated user.
 */
const currentUser = (req, res) => {
  res.send({
    user: req.user
  });
};

/**
 * @function ensureAuthenticated
 * @description
 * Handler that responds with a 401 if a user is not authenticated.
 */
const ensureAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.sendStatus(401);
  }

  next();
};

/**
 * @function gracefulEnsureAuthenticated
 * @description
 * Handler that returns 200 null if req is not authenticated.
 * This will ensure we are not throwing 401's if no cookie (or expired cookie) is present.
 */
const gracefulEnsureAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(200).send({ user: null });
  }

  next();
};

/**
 * @function securityControllerFactory
 * @param {function} authenticateMiddleware - Middleware function for authenticated.
 * @param {function} authCallbackMiddleware - Middleware function for an authentication callback.
 * @returns {object}
 * @description
 * Creates an instance of the security controller.
 */
function securityControllerFactory(
  authenticateMiddleware,
  authCallbackMiddleware
) {
  return {
    //   authenticate: authenticateMiddleware,
    //   authCallback: authCallbackMiddleware,
    logout,
    currentUser,
    ensureAuthenticated,
    gracefulEnsureAuthenticated
  };
}

module.exports = securityControllerFactory;

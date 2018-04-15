const path = require("path");

/**
 * @function serveSite
 * @description
 * Handler that serves the React application.
 */
const serveSite = (req, res) => {
  res.sendFile(path.join(process.cwd(), "client/dist/index.html"));
};

module.exports = {
  serveSite
};

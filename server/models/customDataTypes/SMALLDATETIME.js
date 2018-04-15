//Get special Sequelize inherits function.
const inherits = require("sequelize/lib/utils/inherits");
const Sequelize = require("sequelize");

function SMALLDATETIME() {
  if (!(this instanceof SMALLDATETIME)) return new SMALLDATETIME();
}

//We want all the behavior of a date type with a couple overrides.
inherits(SMALLDATETIME, Sequelize.DATE);

SMALLDATETIME.prototype.key = SMALLDATETIME.key = "SMALLDATETIME";

//This function determines the type in the SQL schema.
SMALLDATETIME.prototype.toSql = function toSql() {
  return "SMALLDATETIME";
};

//This function is called to stringify the data on the way into the database.
SMALLDATETIME.prototype._stringify = function _stringify(date, options) {
  //Our timezone is UTC, so this isn't strictly necessary, but it
  //mimics the behavior of the DATE type for extensibility.
  date = this._applyTimezone(date, options);

  //Only include data necessary for SMALLDATETIME type.
  return date.format("YYYY-MM-DD HH:mm:ss");
};

module.exports = SMALLDATETIME;

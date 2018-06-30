const yaml = require("js-yaml");
const Sequelize = require("sequelize");

const factories = {
  /**
   * @function sequelize:mssql
   * @param {object} dbConfig - Configuration object for the connection.
   * @returns {Sequelize}
   * @description
   * Creates a sequelize instance using configuration values specified.
   */
  "sequelize:mssql": dbConfig => {
    const ssOptions = {
      host: dbConfig.host,
      dialect: "mssql",
      dialectOptions: {
        encrypt: dbConfig.isEncrypted
      }
    };

    // Allow optional configuration of connection pooling.
    if (dbConfig.pool && typeof dbConfig.pool === "object") {
      ssOptions.pool = dbConfig.pool;
    }

    const sequelize = new Sequelize(
      dbConfig.name,
      dbConfig.username,
      dbConfig.password,
      ssOptions
    );

    return sequelize;
  }
}; // </factories>

// Create the YAML Type instance to support the
// !database tag.  If a factory exists for the database
// type, an instance is returned, otherwise null.
const database = new yaml.Type("!database", {
  kind: "mapping",
  construct: data => {
    const dbConfig = data;

    const factory = factories[dbConfig.type];
    let instance = null;

    if (factory) {
      instance = factory(dbConfig);
    }

    return instance;
  }
});

module.exports = database;

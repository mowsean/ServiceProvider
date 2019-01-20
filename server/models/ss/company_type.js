const Sequelize = require("sequelize");

module.exports = sequelize => {
  const options = {
    timestamps: false,
    tableName: "company_type"
  };

  const definition = {
    ["comptype_id"]: {
      allowNull: false,
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    ["comp_type"]: {
      allowNull: true,
      type: Sequelize.STRING
    },
    ["is_active"]: {
      allowNull: true,
      type: Sequelize.BOOLEAN
    }
  };

  const companyType = sequelize.define("company_type", definition, options);

  return companyType;
};

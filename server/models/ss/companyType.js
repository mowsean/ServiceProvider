const Sequelize = require("sequelize");

module.exports = sequelize => {
  const options = {
    timestamps: false,
    tableName: "companyType"
  };

  const definition = {
    ["companyType_id"]: {
      allowNull: false,
      type: Sequelize.BIGINT,
      primaryKey: true
    },
    ["companyType"]: {
      allowNull: true,
      type: Sequelize.STRING
    },
    ["isActive"]: {
      allowNull: true,
      type: Sequelize.BOOLEAN
    }
  };

  const companyType = sequelize.define("companyType", definition, options);

  return companyType;
};

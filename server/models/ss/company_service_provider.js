const Sequelize = require("sequelize");

module.exports = sequelize => {
  const options = {
    timestamps: false,
    tableName: "company_service_provider"
  };

  const definition = {
    ["pro_id"]: {
      allowNull: false,
      type: Sequelize.BIGINT,
      //  type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    ["pro_name"]: {
      allowNull: false,
      type: Sequelize.STRING
    },
    ["pro_email"]: {
      allowNull: false,
      type: Sequelize.STRING
    },
    ["pro_address"]: {
      allowNull: false,
      type: Sequelize.STRING
    },
    ["pro_profile"]: {
      allowNull: false,
      type: Sequelize.STRING
    },
    ["is_pro_active"]: {
      allowNull: true,
      type: Sequelize.BOOLEAN
    },
    ["company_service_id"]: {
      allowNull: true,
      type: Sequelize.BIGINT
    },
    ["pro_updatedOn"]: {
      allowNull: true,
      type: Sequelize.SMALLDATETIME
    },
    ["pro_addedOn"]: {
      allowNull: true,
      type: Sequelize.SMALLDATETIME
    }
  };

  const companyserviceprovider = sequelize.define(
    "company_service_provider",
    definition,
    options
  );

  return companyserviceprovider;
};

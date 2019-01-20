const Sequelize = require("sequelize");

module.exports = sequelize => {
  const options = {
    timestamps: false,
    tableName: "company_service"
  };

  const definition = {
    ["serv_id"]: {
      allowNull: false,
      type: Sequelize.BIGINT,
      //  type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    ["comp_service"]: {
      allowNull: false,
      type: Sequelize.STRING
    },
    ["serv_detail"]: {
      allowNull: false,
      type: Sequelize.STRING
    },
    ["serv_custom1"]: {
      allowNull: false,
      type: Sequelize.STRING
    },
    ["serv_custom2"]: {
      allowNull: false,
      type: Sequelize.STRING
    },
    ["serv_custom3"]: {
      allowNull: false,
      type: Sequelize.STRING
    },
    ["company_id"]: {
      allowNull: true,
      type: Sequelize.BIGINT
    },
    ["serv_updatedOn"]: {
      allowNull: true,
      type: Sequelize.SMALLDATETIME
    },
    ["serv_addedOn"]: {
      allowNull: true,
      type: Sequelize.SMALLDATETIME
    },
    ["is_serv_active"]: {
      allowNull: true,
      type: Sequelize.BOOLEAN
    }
  };

  const companyservices = sequelize.define(
    "company_service",
    definition,
    options
  );

  return companyservices;
};

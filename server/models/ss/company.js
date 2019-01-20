const Sequelize = require("sequelize");

module.exports = sequelize => {
  const options = {
    timestamps: false,
    tableName: "company"
  };

  const definition = {
    ["comp_id"]: {
      allowNull: false,
      type: Sequelize.BIGINT,
      // type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    ["comp_name"]: {
      allowNull: false,
      type: Sequelize.STRING(200)
    },
    ["comp_slogan"]: {
      allowNull: true,
      type: Sequelize.STRING
    },
    ["comp_address"]: {
      allowNull: true,
      type: Sequelize.STRING
    },
    ["comp_latlng_address"]: {
      allowNull: true,
      type: Sequelize.STRING
    },
    ["comp_contact"]: {
      allowNull: true,
      type: Sequelize.STRING
    },
    ["comp_email"]: {
      allowNull: true,
      type: Sequelize.STRING
    },
    ["comp_url"]: {
      allowNull: true,
      type: Sequelize.STRING
    },
    ["comp_fb"]: {
      allowNull: true,
      type: Sequelize.STRING
    },
    ["comp_twitter"]: {
      allowNull: true,
      type: Sequelize.STRING
    },
    ["comp_instgram"]: {
      allowNull: true,
      type: Sequelize.STRING
    },
    ["comp_pinInterest"]: {
      allowNull: true,
      type: Sequelize.STRING
    },
    ["comp_category_id"]: {
      allowNull: true,
      type: Sequelize.BIGINT
    },
    ["comp_updatedOn"]: {
      allowNull: true,
      type: Sequelize.SMALLDATETIME
    },
    ["comp_addedOn"]: {
      allowNull: true,
      type: Sequelize.SMALLDATETIME
    }
  };

  const company = sequelize.define("company", definition, options);

  return company;
};

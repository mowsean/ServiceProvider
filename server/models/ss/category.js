const Sequelize = require("sequelize");

module.exports = sequelize => {
  const options = {
    timestamps: false,
    tableName: "category"
  };

  const definition = {
    ["cat_id"]: {
      allowNull: false,
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    ["cat_name"]: {
      allowNull: false,
      type: Sequelize.STRING
    },
    ["cat_description"]: {
      allowNull: false,
      type: Sequelize.STRING
    },
    ["cat_parent_id"]: {
      allowNull: true,
      type: Sequelize.BIGINT
    },
    ["cat_thumbnail"]: {
      allowNull: true,
      type: Sequelize.STRING
    },
    ["cat_added_on"]: {
      allowNull: true,
      type: Sequelize.SMALLDATETIME
    },
    ["cat_is_activated"]: {
      allowNull: true,
      type: Sequelize.BOOLEAN
    }
  };

  const category = sequelize.define("category", definition, options);

  return category;
};

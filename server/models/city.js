"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      City.hasMany(models.Route, {
        foreignKey: {
          field: "FromCityId",
        },
        as: "From",
      });
      City.hasMany(models.Route, {
        foreignKey: {
          field: "ToCityId",
        },
        as: "To",
      });
    }
  }
  City.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "City",
    }
  );
  return City;
};

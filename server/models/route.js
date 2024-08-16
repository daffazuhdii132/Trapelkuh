"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Route.hasMany(models.Fleet, {
        foreignKey: "RouteId",
      });
      Route.belongsTo(models.City, {
        foreignKey: {
          field: "FromCityId",
        },
        as: "From",
      });

      Route.belongsTo(models.City, {
        foreignKey: {
          field: "ToCityId",
        },
        as: "To",
      });

      // this.belongsTo(User, {
      //   foreignKey: {
      //     field: "created_by",
      //     allowNull: false,
      //   },
      //   as: "createdBy",
      // });
      // this.belongsTo(User, {
      //   foreignKey: {
      //     field: "updated_by",
      //     allowNull: false,
      //   },
      //   as: "updatedBy",
      // });
    }
  }
  Route.init(
    {
      FromCityId: DataTypes.INTEGER,
      ToCityId: DataTypes.INTEGER,
      departTime: DataTypes.DATE,
      arrivalTime: DataTypes.DATE,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Route",
    }
  );
  return Route;
};

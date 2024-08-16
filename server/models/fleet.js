"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fleet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Fleet.belongsTo(models.Route, {
        foreignKey: "RouteId",
      });
      Fleet.hasMany(models.Ticket);
    }
  }
  Fleet.init(
    {
      code: DataTypes.STRING,
      category: DataTypes.STRING,
      RouteId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Fleet",
    }
  );
  return Fleet;
};

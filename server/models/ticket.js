"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.User);
      Ticket.belongsTo(models.Fleet);
    }
  }
  Ticket.init(
    {
      ticketId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "Ticket ID is required",
          notEmpty: "Ticket ID is required",
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: "Price is required",
          notEmpty: "Price is required",
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "Status is required",
          notEmpty: "Status is required",
        },
      },
      qrUrl: {
        type: DataTypes.STRING,
      },
      FleetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: "Fleet ID is required",
          notEmpty: "Fleet ID is required",
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: "User ID is required",
          notEmpty: "User ID is required",
        },
      },
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};

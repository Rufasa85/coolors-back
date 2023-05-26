const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Pallet extends Model {}

Pallet.init(
  {
    // add properites here, ex:
    seedColor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Pallet;

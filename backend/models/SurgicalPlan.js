const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SurgicalPlan = sequelize.define("SurgicalPlan", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("pending", "approved", "completed"),
    defaultValue: "pending",
  },

  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = SurgicalPlan;

const { DataTypes } = require("sequelize");
const sequelize = require("../../db/db-connection");
const Course = require("./course.model");
const User = require("../user.model");

// specify table schema
const applicationSchema = {
  application_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
    onDelete: "CASCADE", // Delete applications when user is deleted
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: "course_id",
    },
    onDelete: "CASCADE", // Delete applications when course is deleted
  },
  status: {
    type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
    defaultValue: "Pending",
  },
  appliedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  approvedAt: {
    type: DataTypes.DATE,
  },
};

// specify table options
const tableOptions = {
  tableName: "applications", // optional: explicitly specify table name
  timestamps: true, // adds createdAt and updatedAt columns
};

// create sequelize model
const Application = sequelize.define(
  "Application",
  applicationSchema,
  tableOptions
);
module.exports = Application;

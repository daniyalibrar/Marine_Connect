const { DataTypes } = require("sequelize");
const sequelize = require("../../db/db-connection");
const Course = require("./course.model");
const User = require("../user.model");

// specify table schema
const enrollmentSchema = {
  enrollment_id: {
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
    onDelete: "CASCADE", // Delete enrollment when user is deleted
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: "course_id",
    },
    onDelete: "CASCADE", // Delete enrollment when course is deleted
  },
  enrollmentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

// specify table options
const tableOptions = {
  tableName: "enrollments", // optional: explicitly specify table name
  timestamps: true, // adds createdAt and updatedAt columns
};

// create sequelize model
const Enrollment = sequelize.define(
  "Enrollment",
  enrollmentSchema,
  tableOptions
);
module.exports = Enrollment;

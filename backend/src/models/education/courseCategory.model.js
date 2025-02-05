const { DataTypes } = require("sequelize");
const sequelize = require("../../db/db-connection");

// specify table schema
const courseCategorySchema = {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  categoryDescription: {
    type: DataTypes.TEXT,
  },
};

// specify table options
const tableOptions = {
  tableName: "course_categories", // optional: explicitly specify table name
  timestamps: true, // adds createdAt and updatedAt columns
};

// create sequelize model
const CourseCategory = sequelize.define(
  "CourseCategory",
  courseCategorySchema,
  tableOptions
);
module.exports = CourseCategory;

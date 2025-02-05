const { DataTypes } = require("sequelize");
const sequelize = require("../../db/db-connection");
const CourseCategory = require("./courseCategory.model");

// specify table schema
const courseSchema = {
  course_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  shortDescription: {
    type: DataTypes.TEXT,
  },
  longDescription: {
    type: DataTypes.TEXT,
  },
  level: {
    type: DataTypes.ENUM("Beginner", "Intermediate", "Advanced"),
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: CourseCategory,
      key: "category_id",
    },
    onDelete: "CASCADE", // Delete course when course category is deleted
  },
  durationHours: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

// specify table options
const tableOptions = {
  tableName: "courses", // optional: explicitly specify table name
  timestamps: true, // adds createdAt and updatedAt columns
};

// create sequelize model
const Course = sequelize.define("Course", courseSchema, tableOptions);
module.exports = Course;

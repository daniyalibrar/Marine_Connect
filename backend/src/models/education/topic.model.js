const { DataTypes } = require("sequelize");
const sequelize = require("../../db/db-connection");
const Course = require("./course.model");

// specify table schema
const topicSchema = {
  topic_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: "course_id",
    },
    onDelete: "CASCADE", // Delete topics when course is deleted
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  pdf_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  video_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sequence: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

// specify table options
const tableOptions = {
  tableName: "topics", // optional: explicitly specify table name
  timestamps: true, // adds createdAt and updatedAt columns
};

// create sequelize model
const Topic = sequelize.define("Topic", topicSchema, tableOptions);

module.exports = Topic;

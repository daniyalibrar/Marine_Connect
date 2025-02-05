const { DataTypes } = require("sequelize");
const sequelize = require("../../db/db-connection");
const User = require("../user.model");

// specify table schema
const resumeSchema = {
  resume_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  resume_url: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: "user_id",
    },
    onDelete: "CASCADE", // Delete job seeker resume when user(job seeker) is deleted
  },
};

// specify table options
const tableOptions = {
  tableName: "resumes", // optional: explicitly specify table name
  timestamps: true, // adds createdAt and updatedAt columns
};

// create sequelize model
const Resume = sequelize.define("Resume", resumeSchema, tableOptions);

module.exports = Resume;

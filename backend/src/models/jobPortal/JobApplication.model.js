const { DataTypes } = require("sequelize");
const sequelize = require("../../db/db-connection");
const Job = require("./job.model");
const User = require("../user.model");

// specify table schema
const jobApplicationSchema = {
  job_application_id: {
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
    onDelete: "CASCADE", // Delete job applications when user is deleted
  },
  job_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Job,
      key: "job_id",
    },
    onDelete: "CASCADE", // Delete job applications when job is deleted
  },
  status: {
    type: DataTypes.ENUM("Pending", "Shortlisted", "Rejected"),
    defaultValue: "Pending",
  },
  approvedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

// specify table options
const tableOptions = {
  tableName: "job_applications", // optional: explicitly specify table name
  timestamps: true, // adds createdAt and updatedAt columns
};

// create sequelize model
const JobApplication = sequelize.define(
  "JobApplication",
  jobApplicationSchema,
  tableOptions
);

module.exports = JobApplication;

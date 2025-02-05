const { DataTypes } = require("sequelize");
const sequelize = require("../../db/db-connection");
const User = require("../user.model");

// specify table schema
const jobSchema = {
  job_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  details: {
    type: DataTypes.TEXT,
  },
  jobType: {
    type: DataTypes.ENUM("full_time", "part_time", "contract", "internship"),
  },
  minSalary: {
    type: DataTypes.INTEGER,
  },
  maxSalary: {
    type: DataTypes.INTEGER,
  },
  jobLevel: {
    type: DataTypes.ENUM(
      "training",
      "entry_level",
      "junior",
      "middle",
      "senior",
      "team_lead",
      "manager",
      "leadership"
    ),
  },
  jobLocation: {
    type: DataTypes.ENUM("onsite", "hybrid", "remote"),
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
    onDelete: "CASCADE", // Delete Job when user(employer) is deleted
  },
};

// specify table options
const tableOptions = {
  tableName: "jobs", // optional: explicitly specify table name
  timestamps: true, // adds createdAt and updatedAt columns
};

// create sequelize model
const Job = sequelize.define("Job", jobSchema, tableOptions);

module.exports = Job;

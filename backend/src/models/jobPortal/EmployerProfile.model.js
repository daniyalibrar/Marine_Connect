const { DataTypes } = require("sequelize");
const sequelize = require("../../db/db-connection");
const User = require("../user.model");

// specify table schema
const employerProfileSchema = {
  employer_profile_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  logo: {
    type: DataTypes.STRING,
  },
  website: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  industry: {
    type: DataTypes.STRING,
  },
  foundedDate: {
    type: DataTypes.DATEONLY,
  },
  numberOfEmployees: {
    type: DataTypes.ENUM("1-10", "11-50", "51-200", "201-500", "500+"),
  },
  country: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT,
  },
  phoneNo: {
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
    onDelete: "CASCADE", // Delete employer profile when user(employer) is deleted
  },
};

// specify table options
const tableOptions = {
  tableName: "employer_profiles", // optional: explicitly specify table name
  timestamps: true, // adds createdAt and updatedAt columns
};

// create sequelize model
const EmployerProfile = sequelize.define(
  "EmployerProfile",
  employerProfileSchema,
  tableOptions
);

module.exports = EmployerProfile;

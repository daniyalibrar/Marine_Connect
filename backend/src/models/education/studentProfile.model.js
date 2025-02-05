const { DataTypes } = require("sequelize");
const sequelize = require("../../db/db-connection");
const User = require("../user.model");

// specify table schema
const studentProfileSchema = {
  student_profile_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  profilePicture: {
    type: DataTypes.STRING,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
  },
  gender: {
    type: DataTypes.ENUM("Male", "Female", "Other", "Prefer not to say"),
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
  degreeName: {
    type: DataTypes.STRING,
  },
  collegeName: {
    type: DataTypes.STRING,
  },
  completionDate: {
    type: DataTypes.DATEONLY,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: "user_id",
    },
    onDelete: "CASCADE", // Delete student profile when user(student) is deleted
  },
};

// specify table options
const tableOptions = {
  tableName: "student_profiles", // optional: explicitly specify table name
  timestamps: true, // adds createdAt and updatedAt columns
};

// create sequelize model
const StudentProfile = sequelize.define(
  "StudentProfile",
  studentProfileSchema,
  tableOptions
);

module.exports = StudentProfile;

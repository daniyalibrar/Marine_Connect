const { DataTypes } = require("sequelize");
const sequelize = require("../db/db-connection");

// specify table schema
const userSchema = {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("student", "job_seeker", "employer", "admin"),
    allowNull: false,
  },
};

// specify table options
const tableOptions = {
  tableName: "users", // optional: explicitly specify table name
  timestamps: true, // adds createdAt and updatedAt columns
};

// create sequelize model
const User = sequelize.define("User", userSchema, tableOptions);
module.exports = User;

const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: console.log,
  }
);

module.exports = sequelize;

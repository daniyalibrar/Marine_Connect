const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const awaitHandlerFactory = require("../middlewares/awaitHandlerFactory.middleware");
const {
  validateLogin,
} = require("../middlewares/validators/userValidator.middleware");

// Login
// POST: localhost:4000/login
router.post("/", validateLogin, awaitHandlerFactory(userController.userLogin));

module.exports = router;

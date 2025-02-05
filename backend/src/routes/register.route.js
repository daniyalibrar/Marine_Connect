const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const awaitHandlerFactory = require("../middlewares/awaitHandlerFactory.middleware");
const {
  createUserSchema,
} = require("../middlewares/validators/userValidator.middleware");

// Create a new user
// POST: localhost:4000/register
router.post(
  "/",
  createUserSchema,
  awaitHandlerFactory(userController.createNewUser)
);

module.exports = router;

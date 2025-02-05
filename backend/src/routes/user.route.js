const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const awaitHandlerFactory = require("../middlewares/awaitHandlerFactory.middleware");
// const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');

// Get all users
// GET: localhost:4000/users
router.get("/", awaitHandlerFactory(userController.getAllUsers));

// Get user by ID
// GET: localhost:4000/users/10
router.get("/:id", awaitHandlerFactory(userController.getUserById));

// Create a new user
// POST: localhost:4000/users
router.post("/", awaitHandlerFactory(userController.createNewUser));

// Update user by ID
// PUT: localhost:4000/users/10
router.put("/:id", awaitHandlerFactory(userController.updateUserById));

// Delete user by ID
// DELETE: localhost:4000/users/10
router.delete("/:id", awaitHandlerFactory(userController.deleteUserById));

module.exports = router;
const express = require("express");
const router = express.Router();
const courseController = require("../../controllers/education/courses.controller");
const awaitHandlerFactory = require("../../middlewares/awaitHandlerFactory.middleware");

// Get popular courses
// GET: localhost:4000/courses/popular-courses
router.get(
  "/popular-courses",
  awaitHandlerFactory(courseController.getPopularCourses)
);

// Get all courses
// GET: localhost:4000/courses
router.get("/", awaitHandlerFactory(courseController.getAllCourses));

// Get all courses categories
// GET: localhost:4000/courses/course-categories
router.get(
  "/course-categories",
  awaitHandlerFactory(courseController.getAllCourseCategories)
);

// Get Course by id (PROTECTED ROUTE) WITHOUT TOPICS
// GET: localhost:4000/courses/1
router.get(
  "/:id",
  awaitHandlerFactory(courseController.getCourseById)
);

module.exports = router;

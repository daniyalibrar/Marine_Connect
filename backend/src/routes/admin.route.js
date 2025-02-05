const express = require("express");
const router = express.Router();
const awaitHandlerFactory = require("../middlewares/awaitHandlerFactory.middleware");
const AdminController = require("../controllers/admin.controller");
const UserController = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../config/multer.config");

// ################### Admins ###################

// Create/Register a new admin user
// POST: localhost:4000/admin/register
router.post("/register", awaitHandlerFactory(AdminController.createAdmin));

// Login admin user
// POST: localhost:4000/admin/login
router.post("/login", awaitHandlerFactory(AdminController.adminLogin));

// get Admin Profile (PROTECTED ROUTE)
// GET: localhost:4000/admin/profile
router.get(
  "/profile",
  auth("admin"),
  awaitHandlerFactory(AdminController.getAdminProfile)
);

// ################### Users ###################

// get all users (PROTECTED ROUTE)
// GET: localhost:4000/admin/users
router.get(
  "/users",
  auth("admin"),
  awaitHandlerFactory(UserController.getAllUsers)
);

// Get user by ID (PROTECTED ROUTE)
// GET: localhost:4000/admin/users/1
router.get(
  "/users/:id",
  auth("admin"),
  awaitHandlerFactory(UserController.getUserById)
);

// Create a new user
// POST: localhost:4000/admin/users
router.post(
  "/users",
  auth("admin"),
  awaitHandlerFactory(UserController.createNewUser)
);

// Update user by ID
// PUT: localhost:4000/admin/users/1
router.put(
  "/users/:id",
  auth("admin"),
  awaitHandlerFactory(UserController.updateUserById)
);

// Delete user by ID
// DELETE: localhost:4000/admin/users/1
router.delete(
  "/users/:id",
  auth("admin"),
  awaitHandlerFactory(UserController.deleteUserById)
);

// ################### Course Categories ###################

// create a new course category (PROTECTED ROUTE)
// POST: localhost:4000/admin/course-categories
router.post(
  "/course-categories",
  auth("admin"),
  awaitHandlerFactory(AdminController.createCourseCategory)
);

// get all course categories (PROTECTED ROUTE)
// GET: localhost:4000/admin/course-categories
router.get(
  "/course-categories",
  auth("admin"),
  awaitHandlerFactory(AdminController.getAllCourseCategories)
);

// Delete course category by ID
// DELETE: localhost:4000/admin/course-categories/1
router.delete(
  "/course-categories/:id",
  auth("admin"),
  awaitHandlerFactory(AdminController.deleteCourseCategoryById)
);

// ################### Courses ###################

// create a new Course (PROTECTED ROUTE)
// POST: localhost:4000/admin/courses
router.post(
  "/courses",
  auth("admin"),
  upload.fields([{ name: "image" }]),
  awaitHandlerFactory(AdminController.createCourse)
);

// Get all Courses (PROTECTED ROUTE) WITHOUT TOPICS
// GET: localhost:4000/admin/courses
router.get(
  "/courses",
  auth("admin"),
  awaitHandlerFactory(AdminController.getAllCourses)
);

// Get Course by id (PROTECTED ROUTE) WITHOUT TOPICS
// GET: localhost:4000/admin/courses/1
router.get(
  "/courses/:id",
  auth("admin"),
  awaitHandlerFactory(AdminController.getCourseById)
);

// Update Course by id (PROTECTED ROUTE)
// PUT: localhost:4000/admin/courses/1
router.put(
  "/courses/:id",
  auth("admin"),
  awaitHandlerFactory(AdminController.updateCourseById)
);

// Delete Course by id (PROTECTED ROUTE) Also deletes topics associated with course
// DELETE: localhost:4000/admin/courses/1
router.delete(
  "/courses/:id",
  auth("admin"),
  awaitHandlerFactory(AdminController.deleteCourseById)
);

// ################### Course Topics ###################

// create a new topic for course (PROTECTED ROUTE)
// POST: localhost:4000/admin/courses/1/add-topic
router.post(
  "/courses/:id/topics",
  auth("admin"),
  upload.fields([{ name: "topicPdf" }, { name: "topicVideo" }]),
  awaitHandlerFactory(AdminController.createCourseTopic)
);

// Get all topics for course (PROTECTED ROUTE) WITHOUT TOPICS
// GET: localhost:4000/admin/courses/1/topics
router.get(
  "/courses/:id/topics",
  auth("admin"),
  awaitHandlerFactory(AdminController.getAllCourseTopics)
);

// ################### Course Applications ###################

// Get all Courses Applications(PROTECTED ROUTE)
// GET: localhost:4000/admin/courses-applications
router.get(
  "/course-applications",
  auth("admin"),
  awaitHandlerFactory(AdminController.getAllCoursesApplications)
);

// Update status of Courses Applications(PROTECTED ROUTE)
// GET: localhost:4000/admin/courses-applications/id
router.put(
  "/course-applications/:id",
  auth("admin"),
  awaitHandlerFactory(AdminController.updateStatusAndCreateEnrollment)
);

// ################### Jobs ###################

// Get all Jobs by employers
// GET: localhost:4000/admin/jobs
router.get(
  "/jobs",
  auth("admin"),
  awaitHandlerFactory(AdminController.getAllJobs)
);

// delete Job by employer(args: job_id, user_id)
// DELETE: localhost:4000/admin/jobs/job_id/user_id
router.delete(
  "/jobs/:job_id/:user_id",
  auth("admin"),
  awaitHandlerFactory(AdminController.deleteJobById)
);

// get Job by employer(args: job_id, user_id)
// GET: localhost:4000/admin/jobs/job_id/user_id
router.get(
  "/jobs/:job_id/:user_id",
  auth("admin"),
  awaitHandlerFactory(AdminController.getJobById)
);

// Update Job by id
// PUT: localhost:4000/admin/jobs/:job_id/:user_id
router.put(
  "/jobs/:job_id/:user_id",
  auth("admin"),
  awaitHandlerFactory(AdminController.updateJobById)
);

// get admin dashboard data
// POST: localhost:4000/admin/dashboard
router.get(
  "/dashboard",
  auth("admin"),
  awaitHandlerFactory(AdminController.getAdminDashboardData)
);
module.exports = router;

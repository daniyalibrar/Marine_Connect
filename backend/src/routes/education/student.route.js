const express = require("express");
const router = express.Router();
const awaitHandlerFactory = require("../../middlewares/awaitHandlerFactory.middleware");
const StudentController = require("../../controllers/education/student.controller");
const auth = require("../../middlewares/auth.middleware");
const upload = require("../../config/multer.config");

// get Student Profile
// GET: localhost:4000/student/profile/1
router.get(
  "/profile/:id",
  auth("student"),
  awaitHandlerFactory(StudentController.getStudentProfile)
);

// Create a Student Profile
// POST: localhost:4000/student/profile/1
router.put(
  "/profile/:id",
  auth("student"),
  upload.single("profilePicture"),
  awaitHandlerFactory(StudentController.createStudentProfile)
);

// Apply to course
// POST: localhost:4000/student/apply
router.post(
  "/apply",
  auth("student"),
  awaitHandlerFactory(StudentController.applyToCourse)
);

// get all course applications of student
// POST: localhost:4000/student/1/applications
router.get(
  "/:user_id/applications",
  auth("student"),
  awaitHandlerFactory(StudentController.getAllCourseApplications)
);

// get all course enrollments of student
// POST: localhost:4000/student/1/enrollments
router.get(
  "/:user_id/enrollments",
  auth("student"),
  awaitHandlerFactory(StudentController.getAllCourseEnrollments)
);

// get enrolled course
// POST: localhost:4000/student/1/enrollments/1
router.get(
  "/:user_id/enrollments/:enrollment_id",
  auth("student"),
  awaitHandlerFactory(StudentController.getEnrolledCourse)
);

// get enrolled course topics
// POST: localhost:4000/student/1/enrollments/1/topics
router.get(
  "/:user_id/enrollments/:enrollment_id/topics",
  auth("student"),
  awaitHandlerFactory(StudentController.getEnrolledCourseTopics)
);

// get enrolled course topic by id
// POST: localhost:4000/student/1/enrollments/1/topic/1
router.get(
  "/:user_id/enrollments/:enrollment_id/topics/:topic_id",
  auth("student"),
  awaitHandlerFactory(StudentController.getEnrolledCourseTopicById)
);

// get Student dashboard data
// POST: localhost:4000/student/1/dashboard
router.get(
  "/:user_id/dashboard",
  auth("student"),
  awaitHandlerFactory(StudentController.getStudentDashboardData)
);
module.exports = router;

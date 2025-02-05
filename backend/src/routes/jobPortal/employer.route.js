const express = require("express");
const router = express.Router();
const awaitHandlerFactory = require("../../middlewares/awaitHandlerFactory.middleware");
const EmployerController = require("../../controllers/jobPortal/employer.controller");
const auth = require("../../middlewares/auth.middleware");
const upload = require("../../config/multer.config");

// get Employer Profile
// GET: localhost:4000/employer/profile/1
router.get(
  "/profile/:id",
  auth("employer"),
  awaitHandlerFactory(EmployerController.getEmployerProfile)
);

// Create a Employer Profile
// POST: localhost:4000/employer/profile/1
router.put(
  "/profile/:id",
  auth("employer"),
  upload.single("logo"),
  awaitHandlerFactory(EmployerController.createEmployerProfile)
);

// Create a Job Post
// POST: localhost:4000/employer/jobs/create
router.post(
  "/jobs/create",
  auth("employer"),
  awaitHandlerFactory(EmployerController.createJobPost)
);

// get Employer Jobs
// GET: localhost:4000/employer/jobs
router.get(
  "/jobs",
  auth("employer"),
  awaitHandlerFactory(EmployerController.getEmployerJobs)
);

// get Employer Job by id
// GET: localhost:4000/employer/jobs/1
router.get(
  "/jobs/:job_id",
  auth("employer"),
  awaitHandlerFactory(EmployerController.getEmployerJobById)
);


// Update Employer Job by id
// PUT: localhost:4000/employer/jobs/1
router.put(
  "/jobs/:job_id",
  auth("employer"),
  awaitHandlerFactory(EmployerController.updateEmployerJobById)
);

// Delete Employer Job by id
// DELETE: localhost:4000/employer/jobs/1
router.delete(
  "/jobs/:job_id",
  auth("employer"),
  awaitHandlerFactory(EmployerController.deleteEmployerJobById)
);

// get Employer Jobs with number of applicants
// GET: localhost:4000/employer/jobs
router.get(
  "/jobsWithNoOfApplicants",
  auth("employer"),
  awaitHandlerFactory(EmployerController.getEmployerJobsWithApplicants)
);

// get Job Applicants of a Job
// GET: localhost:4000/employer/jobs/1/applications
router.get(
  "/jobs/:job_id/applications",
  auth("employer"),
  awaitHandlerFactory(EmployerController.getJobApplications)
);

// set Job Application status
// GET: localhost:4000/employer/jobs/1/applications
router.put(
  "/jobs/:job_id/applications/:job_application_id",
  auth("employer"),
  awaitHandlerFactory(EmployerController.setJobApplicationStatus)
);

// get employer dashboard data
// POST: localhost:4000/employer/dashboard
router.get(
  "/dashboard",
  auth("employer"),
  awaitHandlerFactory(EmployerController.getEmployerDashboardData)
);

module.exports = router;

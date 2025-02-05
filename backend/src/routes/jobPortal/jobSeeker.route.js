const express = require("express");
const router = express.Router();
const awaitHandlerFactory = require("../../middlewares/awaitHandlerFactory.middleware");
const JobSeekerController = require("../../controllers/jobPortal/jobSeeker.controller");
const auth = require("../../middlewares/auth.middleware");
const upload = require("../../config/multer.config");

// get Job Seeker Profile
// GET: localhost:4000/job-seeker/profile/1
router.get(
  "/profile/:user_id",
  auth("job_seeker"),
  awaitHandlerFactory(JobSeekerController.getJobSeekerProfile)
);

// Create a Job Seeker Profile
// PUT: localhost:4000/job-seeker/profile/1
router.put(
  "/profile/:user_id",
  auth("job_seeker"),
  upload.single("profilePicture"),
  awaitHandlerFactory(JobSeekerController.createJobSeekerProfile)
);

// Upload/Update job seeker resume
// POST: localhost:4000/job-seeker/resume/1
router.put(
  "/resume/:user_id",
  auth("job_seeker"),
  upload.single("resume"),
  awaitHandlerFactory(JobSeekerController.createJobSeekerResume)
);

// get Job Seeker Resume
// GET: localhost:4000/job-seeker/resume/1
router.get(
  "/resume/:user_id",
  auth("job_seeker"),
  awaitHandlerFactory(JobSeekerController.getJobSeekerResume)
);

// Apply to Job
// POST: localhost:4000/job-seeker/apply
router.post(
  "/apply",
  auth("job_seeker"),
  awaitHandlerFactory(JobSeekerController.applyToJob)
);

// get all Job Applications of JobSeeker
// POST: localhost:4000/job-seeker/1/jobApplications
router.get(
  "/:user_id/jobApplications",
  auth("job_seeker"),
  awaitHandlerFactory(JobSeekerController.getAllJobApplications)
);

// get Job Seeker dashboard data
// POST: localhost:4000/job-seeker/dashboard
router.get(
  "/dashboard",
  auth("job_seeker"),
  awaitHandlerFactory(JobSeekerController.getJobSeekerDashboardData)
);

module.exports = router;

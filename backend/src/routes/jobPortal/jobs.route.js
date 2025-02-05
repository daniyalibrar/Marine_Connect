const express = require("express");
const router = express.Router();
const JobController = require("../../controllers/jobPortal/jobs.controller");
const awaitHandlerFactory = require("../../middlewares/awaitHandlerFactory.middleware");

// Get featured jobs
// GET: localhost:4000/jobs/featured-jobs
router.get(
  "/featured-jobs",
  awaitHandlerFactory(JobController.getFeaturedJobs)
);

// Get all Jobs
// GET: localhost:4000/jobs
router.get("/", awaitHandlerFactory(JobController.getAllJobs));

// Get Job By Id
// GET: localhost:4000/jobs/1
router.get("/:job_id", awaitHandlerFactory(JobController.getJobById));

module.exports = router;

const HttpException = require("../../utils/HttpException.utils");
const Job = require("../../models/jobPortal/job.model");
const User = require("../../models/user.model");
const EmployerProfile = require("../../models/jobPortal/EmployerProfile.model");

/******************************************************************************
 *                              Job Controller
 ******************************************************************************/
class JobController {
  // get featured Jobs
  getFeaturedJobs = async (req, res, next) => {
    let jobs = await Job.findAll({
      include: {
        model: User,
        attributes: ["user_id"],
        include: {
          model: EmployerProfile,
        },
      },
      limit: 6,
    });
    if (!jobs.length) {
      throw new HttpException(404, "Jobs not found");
    }
    res.status(200).json({ jobs });
  };

  // get all Jobs
  getAllJobs = async (req, res, next) => {
    let jobs = await Job.findAll({
      include: {
        model: User,
        attributes: ["user_id"],
        include: {
          model: EmployerProfile,
        },
      },
    });
    if (!jobs.length) {
      throw new HttpException(404, "Jobs not found");
    }
    res.status(200).json({ jobs });
  };

  // get job by id
  getJobById = async (req, res, next) => {
    const job_id = req.params.job_id;
    let job = await Job.findOne({
      include: {
        model: User,
        attributes: ["user_id"],
        include: {
          model: EmployerProfile,
        },
      },
      where: {
        job_id: job_id,
      }
    });
    if (!job) {
      throw new HttpException(404, "Job Post not Found");
    }
    res.status(200).json({ job });
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new JobController();

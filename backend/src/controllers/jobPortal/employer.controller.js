const EmployerProfile = require("../../models/jobPortal/EmployerProfile.model");
const Job = require("../../models/jobPortal/job.model");
const HttpException = require("../../utils/HttpException.utils");
const {
  uploadProfilePicture,
} = require("../../middlewares/cloudinary/uploadToCloudinary.middleware");
const fs = require("fs");
const User = require("../../models/user.model");
const JobApplication = require("../../models/jobPortal/JobApplication.model");
const Resume = require("../../models/jobPortal/resume.model");

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class EmployerController {
  // get Employer profile
  getEmployerProfile = async (req, res, next) => {
    const user_id = req.params.id;
    const employerProfile = await EmployerProfile.findOne({
      where: {
        user_id: user_id,
      },
    });
    res.status(200).json({ employerProfile });
  };

  // create a employer profile
  createEmployerProfile = async (req, res, next) => {
    const user_id = req.params.id;
    const logo = await req.file.path;
    const logoURL = await uploadProfilePicture(logo);
    // Check if Employer Profile already exists
    const profile = await EmployerProfile.findOne({
      where: { user_id: user_id },
    });
    if (profile) {
      // Update the existing profile
      await profile.update({
        logo: logoURL.secure_url,
        ...req.body,
      });
      await profile.save();
      // Cleanup temporary file
      fs.unlinkSync(logo);
      return res.status(201).json({ employerProfile: profile });
    }

    // else create a new Employer profile
    const newProfile = await EmployerProfile.create({
      user_id: user_id,
      logo: logoURL.secure_url,
      ...req.body,
    });
    // Cleanup temporary file
    fs.unlinkSync(logo);
    return res.status(201).json({ employerProfile: newProfile });
  };

  // create a new Job Post
  createJobPost = async (req, res, next) => {
    // Create a new Job Post
    const job = await Job.create({
      ...req.body,
      user_id: req.authorizedUser.user_id,
    });
    if (!job.job_id) {
      throw new HttpException(501, "Job creation failed!");
    }
    return res.status(201).json({ job: job });
  };

  // get Employer Jobs
  getEmployerJobs = async (req, res, next) => {
    const user_id = req.authorizedUser.user_id;
    const jobs = await Job.findAll({
      where: {
        user_id: user_id,
      },
    });
    if (!jobs.length) {
      throw new HttpException(404, "Job posts not found");
    }
    res.status(200).json({ jobs: jobs });
  };

  // get Employer Jobs with Number of applicants
  getEmployerJobsWithApplicants = async (req, res, next) => {
    const user_id = req.authorizedUser.user_id;
    const jobs = await Job.findAll({
      attributes: { exclude: ["details"] },
      include: {
        model: JobApplication,
        attributes: ["job_application_id"],
      },
      where: {
        user_id: user_id,
      },
    });
    if (!jobs.length) {
      throw new HttpException(404, "Job posts not found");
    }
    res.status(200).json({ jobs: jobs });
  };

  // get Employer Job by id
  getEmployerJobById = async (req, res, next) => {
    const job_id = req.params.job_id;
    const job = await Job.findOne({
      where: {
        job_id: job_id,
        user_id: req.authorizedUser.user_id,
      },
    });
    if (!job.job_id) {
      throw new HttpException(404, "Job post not found");
    }
    res.status(200).json({ job: job });
  };

  // get Job Applications by job id
  getJobApplications = async (req, res, next) => {
    const job_id = req.params.job_id;
    const jobApplications = await JobApplication.findAll({
      include: {
        model: User,
        attributes: ["user_id", "email", "firstName", "lastName"],
        include: {
          model: Resume,
        },
      },
      where: {
        job_id: job_id,
      },
    });
    if (!jobApplications.length) {
      throw new HttpException(404, "Job applications not found");
    }
    res.status(200).json({ jobApplications });
  };

  // set Job Application status
  setJobApplicationStatus = async (req, res, next) => {
    const job_application_id = req.params.job_application_id;
    const job_id = req.params.job_id;
    const status = req.body.status;
    const jobApplication = await JobApplication.findOne({
      where: {
        job_application_id: job_application_id,
        job_id: job_id,
      },
    });
    if (!jobApplication.job_id) {
      throw new HttpException(404, "Job application not found");
    }
    // Shortlisted Status
    if (status === "Shortlisted") {
      await jobApplication.update({
        status: status,
        approvedAt: new Date(),
      });
      await jobApplication.save();
    }
    // Pending Status
    if (status === "Pending") {
      await jobApplication.update({
        status: status,
        approvedAt: null,
      });
      await jobApplication.save();
    }
    // Rejected Status
    if (status === "Rejected") {
      await jobApplication.update({
        status: status,
        approvedAt: null,
      });
      await jobApplication.save();
    }
    res.status(200).json({ jobApplication: jobApplication });
  };

  // update Employer Job by id
  updateEmployerJobById = async (req, res, next) => {
    const job_id = req.params.job_id;
    const job = await Job.findOne({
      where: {
        job_id: job_id,
        user_id: req.authorizedUser.user_id,
      },
    });
    if (!job.job_id) {
      throw new HttpException(404, "Job post not found");
    }
    await job.update({ ...req.body });
    await job.save();
    res.status(200).json({ job: job });
  };

  // delete Employer Job by id
  deleteEmployerJobById = async (req, res, next) => {
    const job_id = req.params.job_id;
    const job = await Job.destroy({
      where: {
        job_id: job_id,
        user_id: req.authorizedUser.user_id,
      },
    });
    if (!job) {
      throw new HttpException(404, "Job Post not found");
    }
    res
      .status(200)
      .json({ message: "Job Post has been deleted successfully!" });
  };

    // Get employer Dashboard data
    getEmployerDashboardData = async (req, res, next) => {
      const user_id = req.authorizedUser.user_id;
      // get employer details
      const user = await User.findOne({
        where: { user_id: user_id, role: "employer" },
        attributes: {
          exclude: ["password"],
        },
      });
      // get job posts
      const jobs = await Job.findAll({
        where: {
          user_id: user_id,
        },
      });
  
      const dashboard = {
        user,
        jobs,
      };
      return res.status(200).json({ dashboard });
    };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new EmployerController();

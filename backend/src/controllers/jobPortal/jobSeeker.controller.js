const JobSeekerProfile = require("../../models/jobPortal/JobSeekerProfile.model");
const Resume = require("../../models/jobPortal/resume.model");
const HttpException = require("../../utils/HttpException.utils");
const {
  uploadProfilePicture,
  uploadJobSeekerResume,
} = require("../../middlewares/cloudinary/uploadToCloudinary.middleware");
const fs = require("fs");
const JobApplication = require("../../models/jobPortal/JobApplication.model");
const EmployerProfile = require("../../models/jobPortal/EmployerProfile.model");
const Job = require("../../models/jobPortal/job.model");
const User = require("../../models/user.model");

/******************************************************************************
 *                              Job Seeker Controller
 ******************************************************************************/
class JobSeekerController {
  // get Job Seeker profile
  getJobSeekerProfile = async (req, res, next) => {
    const user_id = req.params.user_id;
    const jobSeekerProfile = await JobSeekerProfile.findOne({
      where: {
        user_id: user_id,
      },
    });
    res.status(200).json({ jobSeekerProfile });
  };

  // create a job seeker profile
  createJobSeekerProfile = async (req, res, next) => {
    const user_id = req.params.user_id;
    const profilePic = await req.file.path;
    const profilePicURL = await uploadProfilePicture(profilePic);
    // Check if Job Seeker Profile already exists
    const profile = await JobSeekerProfile.findOne({
      where: { user_id: user_id },
    });
    if (profile) {
      // Update the existing profile
      await profile.update({
        profilePicture: profilePicURL.secure_url,
        ...req.body,
      });
      await profile.save();
      // Cleanup temporary file
      fs.unlinkSync(profilePic);
      return res.status(201).json({ employerProfile: profile });
    }

    // else create a new Job Seeker profile
    const newProfile = await JobSeekerProfile.create({
      user_id: user_id,
      profilePicture: profilePicURL.secure_url,
      ...req.body,
    });
    // Cleanup temporary file
    fs.unlinkSync(profilePic);
    return res.status(201).json({ jobSeekerProfile: newProfile });
  };

  // Upload Job Seeker Resume
  createJobSeekerResume = async (req, res, next) => {
    const user_id = req.params.user_id;
    const attachedResume = await req.file.path;
    const resumeURL = await uploadJobSeekerResume(attachedResume);
    // Check if Job Seeker Resume already exists
    const resume = await Resume.findOne({
      where: { user_id: user_id },
    });
    if (resume) {
      // Update the existing resume
      await resume.update({
        resume_url: resumeURL.secure_url,
      });
      await resume.save();
      // Cleanup temporary file
      fs.unlinkSync(attachedResume);
      return res.status(201).json({ resume: resume });
    }

    // else create a new Job Seeker resume
    const newResume = await Resume.create({
      user_id: user_id,
      resume_url: resumeURL.secure_url,
    });
    // Cleanup temporary file
    fs.unlinkSync(attachedResume);
    return res.status(201).json({ resume: newResume });
  };

  // get Job Seeker Resume
  getJobSeekerResume = async (req, res, next) => {
    const user_id = req.params.user_id;
    const resume = await Resume.findOne({
      where: {
        user_id: user_id,
      },
    });
    res.status(200).json({ resume });
  };

  // JobSeeker Apply to Job
  applyToJob = async (req, res, next) => {
    const user_id = req.body.user_id;
    const job_id = req.body.job_id;

    // check if job_seeker already applied to job
    const jobApplications = await JobApplication.findAll({
      where: {
        user_id: user_id,
        job_id: job_id,
      },
    });
    if (jobApplications.length > 0) {
      throw new HttpException(409, "You have already applied to this Job");
    }

    // apply to job
    const jobApplication = await JobApplication.create({
      user_id: user_id,
      job_id: job_id,
      status: "Pending",
    });
    if (!jobApplication) {
      throw new HttpException(502, "Something went wrong");
    }
    res
      .status(201)
      .json({ message: "Successfully applied to Job!", jobApplication });
  };

  // get all job applications of job_seeker
  getAllJobApplications = async (req, res, next) => {
    const user_id = req.params.user_id;
    // get all job applications of job_seeker
    const jobApplications = await JobApplication.findAll({
      include: {
        model: Job,
        attributes: ["title"],
        include: {
          model: User,
          attributes: ["user_id"],
          include: {
            model: EmployerProfile,
            attributes: ["name"],
          },
        },
      },
      where: {
        user_id: user_id,
      },
    });
    if (!jobApplications.length) {
      throw new HttpException(404, "You have not applied to any jobs");
    }
    res.status(200).json({ jobApplications });
  };

  // Get Job Seeker Dashboard data
  getJobSeekerDashboardData = async (req, res, next) => {
    const user_id = req.authorizedUser.user_id;
    // get job seeker details
    const user = await User.findOne({
      where: { user_id: user_id, role: "job_seeker" },
      attributes: {
        exclude: ["password"],
      },
    });
    // get job applications
    const jobApplications = await JobApplication.findAll({
      include: {
        model: Job,
        attributes: {
          exclude: ["details"],
        },
      },
      where: {
        user_id: user_id,
      },
    });

    const dashboard = {
      user,
      jobApplications,
    };
    return res.status(200).json({ dashboard });
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new JobSeekerController();

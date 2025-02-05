const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const HttpException = require("../utils/HttpException.utils");
const User = require("../models/user.model");
const CourseCategory = require("../models/education/courseCategory.model");
const Course = require("../models/education/course.model");
const Topic = require("../models/education/topic.model");
const CourseApplication = require("../models/education/application.model");
const Enrollment = require("../models/education/enrollment.model");
const {
  uploadCourseImage,
  uploadTopicPDF,
  uploadTopicVideo,
} = require("../middlewares/cloudinary/uploadToCloudinary.middleware");
const EmployerProfile = require("../models/jobPortal/EmployerProfile.model");
const Job = require("../models/jobPortal/job.model");

/******************************************************************************
 *                              Admin Controller
 ******************************************************************************/
class AdminController {
  // ################### Admins ###################

  // create a new admin user
  createAdmin = async (req, res, next) => {
    // check if the user with this email already exists
    const emailExists = await this.isEmailAlreadyExists(req.body.email);
    if (emailExists) {
      throw new HttpException(409, "User with this email already exists");
    }
    // hash the password
    await this.hashPassword(req);
    // create admin user
    const result = await User.create(req.body);
    res
      .status(201)
      .json({ message: "Admin user created successfully!", user: result });
  };

  // login the admin user and assign token and role
  adminLogin = async (req, res, next) => {
    const { email: userEmail, password: pass } = req.body;

    const user = await User.findOne({
      where: {
        email: userEmail,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!user) {
      throw new HttpException(404, "Incorrect email!");
    }
    if (user.role !== "admin") {
      throw new HttpException(
        403,
        "Forbidden! Please login with admin email & password"
      );
    }
    const { password, ...userWithoutPassword } = user.toJSON();

    const isMatch = await bcrypt.compare(pass, password);

    if (!isMatch) {
      throw new HttpException(401, "Incorrect password!");
    }

    // if user matched create a payload for jwt and assign role
    const userPayload = {
      user_id: user.user_id.toString(),
      ...userWithoutPassword,
    };

    const secretKey = process.env.SECRET_JWT || "supersecrettoken";
    const token = await jwt.sign(userPayload, secretKey, {
      expiresIn: "24h",
    });

    res.status(200).json({ ...userPayload, token });
  };

  // get admin profile
  getAdminProfile = async (req, res, next) => {
    let admin = await User.findOne({
      where: {
        user_id: req.authorizedUser.user_id,
      },
      attributes: {
        exclude: ["password"],
      },
    });

    if (!admin) {
      throw new HttpException(404, "Admin Profile Not Found");
    }

    res
      .status(200)
      .json({ message: "Current admin user profile", profile: admin });
  };

  // ################### Course Categories ###################

  // create a new course category
  createCourseCategory = async (req, res, next) => {
    const result = await CourseCategory.create(req.body);
    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }
    res.status(201).json({ message: "Course Category created successfully!" });
  };

  // get all course categories
  getAllCourseCategories = async (req, res, next) => {
    let courseCategories = await CourseCategory.findAll();
    if (!courseCategories.length) {
      throw new HttpException(404, "Course Categories not found");
    }
    res.status(200).json({ courseCategories });
  };

  // delete course category by id
  deleteCourseCategoryById = async (req, res, next) => {
    const courseCategory = await CourseCategory.destroy({
      where: {
        category_id: req.params.id,
      },
    });
    if (!courseCategory) {
      throw new HttpException(404, "Course Category not found");
    }
    res
      .status(200)
      .json({ message: "Course Category has been deleted successfully!" });
  };

  // ################### Courses ###################

  // create a new Course
  createCourse = async (req, res, next) => {
    const image = await req.files.image[0].path;
    const { title, ...otherFields } = req.body;

    // Check if course already exists
    const courseExists = await Course.findOne({ where: { title: title } });
    if (courseExists) {
      // Cleanup temporary file
      fs.unlinkSync(image);
      throw new HttpException(409, "Course with this name already exists");
    }
    const result = await uploadCourseImage(image);
    // Cleanup temporary file
    fs.unlinkSync(image);
    // Create course in the database
    const newCourse = await Course.create({
      title,
      image: result.secure_url,
      ...otherFields,
    });
    res.status(201).json({ newCourse });
  };

  // get all Courses
  getAllCourses = async (req, res, next) => {
    let courses = await Course.findAll();
    if (!courses.length) {
      throw new HttpException(404, "Courses not found");
    }
    res.status(200).json({ courses });
  };

  // get course by id
  getCourseById = async (req, res, next) => {
    const course = await Course.findByPk(req.params.id, {
      include: {
        model: CourseCategory,
      },
    });
    if (!course) {
      throw new HttpException(404, "Course not found");
    }
    res.status(200).json({ course: course });
  };

  // update course by id
  updateCourseById = async (req, res, next) => {
    try {
      const course = await Course.findByPk(req.params.id);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      await course.update(req.body, { validate: false });
      await course.save({ validate: false });
      return res.status(201).json({ course });
    } catch (error) {
      throw error;
    }
  };

  // delete course by id
  deleteCourseById = async (req, res, next) => {
    const course = await Course.destroy({
      where: {
        course_id: req.params.id,
      },
    });
    if (!course) {
      throw new HttpException(404, "Course not found");
    }
    res.status(200).json({ message: "Course has been deleted successfully!" });
  };

  // ################### Course Topics ###################

  // create a new topic for course
  createCourseTopic = async (req, res, next) => {
    const course_id = req.params.id;
    const { title, description } = req.body;
    const topic_pdf = await req.files.topicPdf[0].path;
    const topic_video = await req.files.topicVideo[0].path;

    // Check if topic with this title and course_id already exists
    const topicExists = await Topic.findOne({
      where: {
        course_id: course_id,
        title: title,
      },
    });
    if (topicExists) {
      // Cleanup temporary files
      fs.unlinkSync(topic_pdf);
      fs.unlinkSync(topic_video);
      throw new HttpException(
        409,
        "Topic with this name already exists for this course"
      );
    }

    const topicPDF = await uploadTopicPDF(topic_pdf);
    const topicVideo = await uploadTopicVideo(topic_video);

    // Cleanup temporary files
    fs.unlinkSync(topic_pdf);
    fs.unlinkSync(topic_video);

    // Get the next sequence number
    const maxSequence = await Topic.max("sequence", {
      where: { course_id: course_id },
    });
    const sequence = maxSequence ? maxSequence + 1 : 1;

    // Create course topic in the database
    const newTopic = await Topic.create({
      course_id: course_id,
      title: title,
      description: description,
      pdf_url: topicPDF.secure_url,
      video_url: topicVideo.public_id,
      sequence: sequence,
    });
    res.status(201).json({ newTopic });
  };

  // get all course topics
  getAllCourseTopics = async (req, res, next) => {
    const course_id = req.params.id;
    let topics = await Topic.findAll({
      where: {
        course_id,
      },
      order: [["sequence", "ASC"]],
    });
    if (!topics.length) {
      throw new HttpException(404, "Course topics not found");
    }
    res.status(200).json({ topics });
  };

  // ################### Courses Applications ###################

  // get all Courses Applications
  getAllCoursesApplications = async (req, res, next) => {
    let courseApplications = await CourseApplication.findAll({
      include: [
        {
          model: Course,
          attributes: ["title"],
        },
        {
          model: User,
          attributes: ["email"],
        },
      ],
    });
    if (!courseApplications.length) {
      throw new HttpException(404, "No course applications found");
    }
    res.status(200).json({ courseApplications });
  };

  // Update status of course applications
  updateStatusAndCreateEnrollment = async (req, res, next) => {
    const application_id = req.params.id;
    const status = req.body.status;
    let courseApplication = await CourseApplication.findByPk(application_id);
    if (!courseApplication) {
      throw new HttpException(404, "course application with this id not found");
    }

    // Approved Status
    if (status === "Approved") {
      await courseApplication.update({
        status: status,
        approvedAt: new Date(),
      });
      await courseApplication.save();
      // Create enrollment if not exists
      const enrollment = await Enrollment.findOne({
        where: {
          user_id: courseApplication.user_id,
          course_id: courseApplication.course_id,
        },
      });
      if (!enrollment) {
        await Enrollment.create({
          user_id: courseApplication.user_id,
          course_id: courseApplication.course_id,
        });
      }
    }

    // Pending Status
    if (status === "Pending") {
      await courseApplication.update({
        status: status,
        approvedAt: null,
      });
      await courseApplication.save();
      // Delete enrollment if it exists
      const enrollment = await Enrollment.findOne({
        where: {
          user_id: courseApplication.user_id,
          course_id: courseApplication.course_id,
        },
      });
      if (enrollment) {
        await enrollment.destroy();
      }
    }

    // Rejected Status
    if (status === "Rejected") {
      await courseApplication.update({
        status: status,
        approvedAt: null,
      });
      await courseApplication.save();
      // Delete enrollment if it exists
      const enrollment = await Enrollment.findOne({
        where: {
          user_id: courseApplication.user_id,
          course_id: courseApplication.course_id,
        },
      });
      if (enrollment) {
        await enrollment.destroy();
      }
    }

    res.status(200).json({ courseApplication });
  };

  // ################### Jobs ###################

  // get all jobs
  getAllJobs = async (req, res, next) => {
    let jobs = await Job.findAll({
      include: {
        model: User,
        attributes: ["user_id", "email"],
        include: {
          model: EmployerProfile,
          attributes: ["name"],
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
    const job = await Job.findOne({
      where: {
        job_id: req.params.job_id,
        user_id: req.params.user_id,
      },
    });
    if (!job) {
      throw new HttpException(404, "Job Post not found");
    }
    res.status(200).json({ job: job });
  };

  // update Job by id
  updateJobById = async (req, res, next) => {
    const job = await Job.findOne({
      where: {
        job_id: req.params.job_id,
        user_id: req.params.user_id,
      },
    });
    if (!job.job_id) {
      throw new HttpException(404, "Job post not found");
    }
    await job.update({ ...req.body });
    await job.save();
    res.status(200).json({ job: job });
  };

  // delete job by id
  deleteJobById = async (req, res, next) => {
    const job = await Job.destroy({
      where: {
        job_id: req.params.job_id,
        user_id: req.params.user_id,
      },
    });
    if (!job) {
      throw new HttpException(404, "Job Post not found");
    }
    res
      .status(200)
      .json({ message: "Job Post has been deleted successfully!" });
  };

  // ################### Admin Dashboard ###################

  // Get employer Dashboard data
  getAdminDashboardData = async (req, res, next) => {
    // get all users
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });

    // get all courses
    const courses = await Course.findAll({
      attributes: {
        exclude: ["longDescription"],
      },
      limit: 6,
    });

    // get all job posts
    const jobs = await Job.findAll({
      include: {
        model: User,
        attributes: ["user_id", "email"],
        include: {
          model: EmployerProfile,
          attributes: ["name"],
        },
      },
      attributes: {
        exclude: ["details"],
      },
      limit: 6,
    });

    const dashboard = {
      users,
      courses,
      jobs,
    };
    return res.status(200).json({ dashboard });
  };

  // ################### Utility Functions ###################

  // check if email already exists
  isEmailAlreadyExists = async (email) => {
    const result = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!result) {
      return false;
    }
    return true;
  };

  // hash password if it exists
  hashPassword = async (req) => {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new AdminController();

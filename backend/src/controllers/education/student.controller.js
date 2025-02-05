const StudentProfile = require("../../models/education/studentProfile.model");
const Course = require("../../models/education/course.model");
const User = require("../../models/user.model");
const Topic = require("../../models/education/topic.model");
const CourseApplication = require("../../models/education/application.model");
const HttpException = require("../../utils/HttpException.utils");
const {
  uploadProfilePicture,
} = require("../../middlewares/cloudinary/uploadToCloudinary.middleware");
const fs = require("fs");
const Enrollment = require("../../models/education/enrollment.model");

/******************************************************************************
 *                              Student Controller
 ******************************************************************************/
class StudentController {
  // get student profile
  getStudentProfile = async (req, res, next) => {
    const user_id = req.params.id;
    const studentProfile = await StudentProfile.findOne({
      where: {
        user_id: user_id,
      },
    });
    res.status(200).json({ studentProfile });
  };

  // create a student profile
  createStudentProfile = async (req, res, next) => {
    const user_id = req.params.id;
    const profilePicture = await req.file.path;
    const profilePicURL = await uploadProfilePicture(profilePicture);
    // Check if Student Profile already exists
    const profile = await StudentProfile.findOne({
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
      fs.unlinkSync(profilePicture);
      return res.status(201).json({ studentProfile: profile });
    }

    // else create a new student profile
    const newProfile = await StudentProfile.create({
      user_id: user_id,
      profilePicture: profilePicURL.secure_url,
      ...req.body,
    });
    // Cleanup temporary file
    fs.unlinkSync(profilePicture);
    return res.status(201).json({ studentProfile: newProfile });
  };

  // Student Apply to course
  applyToCourse = async (req, res, next) => {
    const user_id = req.body.user_id;
    const course_id = req.body.course_id;

    // check if course exists
    const course = await Course.findByPk(course_id);
    if (!course) {
      throw new HttpException(
        404,
        "Course you are applying for does not exists!"
      );
    }

    // check if student already applied to course
    const applications = await CourseApplication.findAll({
      where: {
        user_id: user_id,
        course_id: course_id,
      },
    });
    if (applications.length > 0) {
      throw new HttpException(409, "You have already applied to this course");
    }

    // apply to course
    const courseApplication = await CourseApplication.create({
      user_id: user_id,
      course_id: course_id,
      status: "Pending",
    });
    if (!courseApplication) {
      throw new HttpException(500, "Something went wrong");
    }
    res
      .status(201)
      .json({ message: "Successfully applied to course!", courseApplication });
  };

  // get all course applications for student
  getAllCourseApplications = async (req, res, next) => {
    const user_id = req.params.user_id;
    // get all applications of student
    const courseApplications = await CourseApplication.findAll({
      include: {
        model: Course,
        attributes: ["title"],
      },
      where: {
        user_id: user_id,
      },
    });
    if (!courseApplications.length) {
      throw new HttpException(404, "You have not applied to any course");
    }
    res.status(200).json({ courseApplications });
  };

  // get all course enrollments for student
  getAllCourseEnrollments = async (req, res, next) => {
    const user_id = req.params.user_id;
    // get all enrollments
    const enrollments = await Enrollment.findAll({
      include: {
        model: Course,
      },
      where: {
        user_id: user_id,
      },
    });
    if (!enrollments.length) {
      throw new HttpException(404, "You are not enrolled in any course");
    }
    res.status(200).json({ enrollments });
  };

  // get enrolled course by id
  getEnrolledCourse = async (req, res, next) => {
    const user_id = req.params.user_id;
    const enrollment_id = req.params.enrollment_id;

    // get course enrollment
    const enrollment = await Enrollment.findOne({
      where: {
        enrollment_id: enrollment_id,
        user_id: user_id,
      },
    });
    if (!enrollment) {
      throw new HttpException(404, "You are not enrolled in this course");
    }
    const course = await Course.findOne({
      where: { course_id: enrollment.course_id },
    });
    return res.status(200).json({ course });
  };

  // get enrolled course topics
  getEnrolledCourseTopics = async (req, res, next) => {
    const user_id = req.params.user_id;
    const enrollment_id = req.params.enrollment_id;

    // get course enrollment
    const enrollment = await Enrollment.findOne({
      where: {
        enrollment_id: enrollment_id,
        user_id: user_id,
      },
    });
    if (!enrollment) {
      throw new HttpException(403, "You are not enrolled in this course");
    }

    const topics = await Topic.findAll({
      where: { course_id: enrollment.course_id },
    });
    if (!topics.length) {
      throw new HttpException(
        404,
        "Topics for this course are not created yet."
      );
    }
    return res.status(200).json({ topics });
  };

  // get enrolled course topic by id
  getEnrolledCourseTopicById = async (req, res, next) => {
    const user_id = req.params.user_id;
    const enrollment_id = req.params.enrollment_id;
    const topic_id = req.params.topic_id;

    // get course enrollment
    const enrollment = await Enrollment.findOne({
      where: {
        enrollment_id: enrollment_id,
        user_id: user_id,
      },
    });
    if (!enrollment) {
      throw new HttpException(403, "You are not enrolled in this course");
    }

    const topic = await Topic.findOne({
      where: { course_id: enrollment.course_id, topic_id: topic_id },
    });
    if (!topic) {
      throw new HttpException(404, "Topic with this id not found");
    }
    return res.status(200).json({ topic });
  };

  // Get Student Dashboard data
  getStudentDashboardData = async (req, res, next) => {
    const user_id = req.params.user_id;
    // get student details
    const user = await User.findOne({
      where: { user_id: user_id, role: "student" },
      attributes: {
        exclude: ["password"],
      },
    });
    // get course enrollments
    const enrollments = await Enrollment.findAll({
      where: {
        user_id: user_id,
      },
    });
    const courses = [];
    enrollments.map(async (enrollment) => {
      const course = await Course.findByPk(enrollment.course_id);
      await courses.push(course);
    });
    // get course applications
    const applications = await CourseApplication.findAll({
      where: {
        user_id: user_id,
      },
      include: {
        model: Course,
      },
    });

    const dashboard = {
      user,
      applications,
      enrollments,
      courses,
    };
    return res.status(200).json({ dashboard });
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new StudentController();

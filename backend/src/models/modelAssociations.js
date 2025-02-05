const User = require("./user.model");
const StudentProfile = require("./education/studentProfile.model");
const EmployerProfile = require("./jobPortal/EmployerProfile.model");
const Job = require("./jobPortal/job.model");
const JobSeekerProfile = require("./jobPortal/JobSeekerProfile.model");
const Resume = require("./jobPortal/resume.model");
const JobApplication = require("./jobPortal/JobApplication.model");
const CourseCategory = require("./education/courseCategory.model");
const Course = require("./education/course.model");
const Topic = require("./education/topic.model");
const Application = require("./education/application.model");
const Enrollment = require("./education/enrollment.model");

function initializeAssociations() {
  // ####################### EDUCATION SYSTEM ASSOCIATIONS #######################

  // User to StudentProfile
  User.hasOne(StudentProfile, { foreignKey: "user_id", onDelete: "CASCADE" }); // Deletes associated Student Profile when a User is deleted
  StudentProfile.belongsTo(User, { foreignKey: "user_id" });

  // CourseCategory to Courses
  CourseCategory.hasMany(Course, {
    foreignKey: "category_id",
    onDelete: "CASCADE",
  }); // Deletes associated courses when a course category is deleted
  Course.belongsTo(CourseCategory, { foreignKey: "category_id" });

  // A Course has many Topics
  Course.hasMany(Topic, {
    foreignKey: "course_id",
    onDelete: "CASCADE", // Deletes associated topics when a course is deleted
  });

  // A Topic belongs to a Course
  Topic.belongsTo(Course, {
    foreignKey: "course_id",
  });

  // User to Applications
  User.hasMany(Application, { foreignKey: "user_id", onDelete: "CASCADE" }); // Deletes associated Applications when a user is deleted
  Application.belongsTo(User, { foreignKey: "user_id" });

  // Course to Applications
  Course.hasMany(Application, { foreignKey: "course_id", onDelete: "CASCADE" }); // Deletes associated Applications when a course is deleted
  Application.belongsTo(Course, { foreignKey: "course_id" });

  // User to Enrollments
  User.hasMany(Enrollment, { foreignKey: "user_id", onDelete: "CASCADE" }); // Deletes associated Enrollments when a user is deleted
  Enrollment.belongsTo(User, { foreignKey: "user_id" });

  // Course to Enrollments
  Course.hasMany(Enrollment, { foreignKey: "course_id", onDelete: "CASCADE" }); // Deletes associated Enrollments when a course is deleted
  Enrollment.belongsTo(Course, { foreignKey: "course_id" });

  // ####################### JOB PORTAL ASSOCIATIONS #######################

  // User(employer) to Employer Profiles
  User.hasOne(EmployerProfile, { foreignKey: "user_id", onDelete: "CASCADE" }); // Deletes associated Employer Profile when a User is deleted
  EmployerProfile.belongsTo(User, { foreignKey: "user_id" });

  // User(JobSeeker) to JobSeeker Profiles
  User.hasOne(JobSeekerProfile, { foreignKey: "user_id", onDelete: "CASCADE" }); // Deletes associated JobSeeker Profile when a User is deleted
  JobSeekerProfile.belongsTo(User, { foreignKey: "user_id" });

  // User(JobSeeker) to Resume
  User.hasOne(Resume, { foreignKey: "user_id", onDelete: "CASCADE" }); // Deletes associated JobSeeker Resume when a User is deleted
  Resume.belongsTo(User, { foreignKey: "user_id" });

  // User to JobApplications
  User.hasMany(JobApplication, { foreignKey: "user_id", onDelete: "CASCADE" }); // Deletes associated JobApplications when a user is deleted
  JobApplication.belongsTo(User, { foreignKey: "user_id" });

  // Job to JobApplications
  Job.hasMany(JobApplication, { foreignKey: "job_id", onDelete: "CASCADE" }); // Deletes associated JobApplications when a job is deleted
  JobApplication.belongsTo(Job, { foreignKey: "job_id" });

  // User(Employer) to Jobs
  User.hasMany(Job, { foreignKey: "user_id", onDelete: "CASCADE" }); // Delete associated Jobs when a user(employer) is deleted
  Job.belongsTo(User, { foreignKey: "user_id" });
}

module.exports = initializeAssociations;

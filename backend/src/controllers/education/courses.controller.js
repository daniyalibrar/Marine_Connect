const HttpException = require("../../utils/HttpException.utils");
const CourseCategory = require("../../models/education/courseCategory.model");
const Course = require("../../models/education/course.model");
const Topic = require("../../models/education/topic.model");

/******************************************************************************
 *                              Course Controller
 ******************************************************************************/
class CourseController {
  // ################### Course Categories ###################

  // get all course categories
  getAllCourseCategories = async (req, res, next) => {
    let courseCategories = await CourseCategory.findAll();
    if (!courseCategories.length) {
      throw new HttpException(404, "Course Categories not found");
    }
    res.status(200).json({ courseCategories });
  };

  // ################### Courses ###################

  // get popular courses
  getPopularCourses = async (req, res, next) => {
    let courses = await Course.findAll({ limit: 6 });
    if (!courses.length) {
      throw new HttpException(404, "Courses not found");
    }
    res.status(200).json({ courses });
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
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      throw new HttpException(404, "Course not found");
    }
    const courseCategory = await CourseCategory.findOne({
      where: {
        category_id: course.category_id,
      },
      attributes: ["categoryName"],
    });

    const topics = await Topic.findAll({
      where: {
        course_id: course.course_id,
      },
      attributes: ["title", "description", "sequence"],
      order: [["sequence", "ASC"]],
    });

    res
      .status(200)
      .json({ course: { ...course.toJSON(), ...courseCategory.toJSON(), topics: topics } });
  };

  // ################### Course Topics ###################

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
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new CourseController();

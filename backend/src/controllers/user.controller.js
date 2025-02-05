const User = require("../models/user.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const StudentProfile = require("../models/education/studentProfile.model");
const JobSeekerProfile = require("../models/jobPortal/JobSeekerProfile.model");
const EmployerProfile = require("../models/jobPortal/EmployerProfile.model");

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {
  // get all users
  getAllUsers = async (req, res, next) => {
    let users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    if (!users.length) {
      throw new HttpException(404, "Users Not Found");
    }
    res.status(200).json({ users });
  };

  // get users by id
  getUserById = async (req, res, next) => {
    const user = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) {
      throw new HttpException(404, "User not found");
    }
    res.status(200).json({ user: user });
  };

  // create new user
  createNewUser = async (req, res, next) => {
    // check user schema validation
    this.checkValidation(req);
    // check if the user with this email already exists
    const emailExists = await this.isEmailAlreadyExists(req.body.email);
    if (emailExists) {
      throw new HttpException(409, "User with this email already exists!");
    }
    // hash the password
    await this.hashPassword(req);
    // create user
    const result = await User.create(req.body);
    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    const { password, ...userWithoutPassword } = result.toJSON();
    res.status(201).json({
      message: "User created successfully!",
      user: userWithoutPassword,
    });
  };

  // login the user and assign token and role
  userLogin = async (req, res, next) => {
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

    // Get a profile picture of user
    let profilePicture;
    // If the user role is Student set profile picture
    if (user.role === "student") {
      profilePicture = await StudentProfile.findOne({
        attributes: ["profilePicture"],
        where: { user_id: user.user_id },
      });
    }
    // If the user role is Job Seeker set profile picture
    if (user.role === "job_seeker") {
      profilePicture = await JobSeekerProfile.findOne({
        attributes: ["profilePicture"],
        where: { user_id: user.user_id },
      });
    }

    // If the user role is Employer set profile picture
    if (user.role === "employer") {
      profilePicture = await EmployerProfile.findOne({
        attributes: ["logo"],
        where: { user_id: user.user_id },
      });
    }
    
    const getProfilePicture = (user) => {
      if (user.role === "employer") {
        if (profilePicture?.logo) {
          return profilePicture.logo;
        } else {
          return "";
        }
      }
      if (profilePicture?.profilePicture) {
        return profilePicture.profilePicture;
      } else {
        return "";
      }
    };
    res.status(200).json({
      ...userPayload,
      profilePicture: getProfilePicture(user),
      token,
    });
  };

  // update user by id
  updateUserById = async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await user.update(req.body, { validate: true }); // Validation is forced here
      await user.save();
      return res.status(201).json({ user });
    } catch (error) {
      throw error;
    }
  };

  // delete user by id
  deleteUserById = async (req, res, next) => {
    const user = await User.destroy({
      where: {
        user_id: req.params.id,
      },
    });
    if (!user) {
      throw new HttpException(404, "User not found");
    }
    res.status(200).json({ message: "User has been deleted successfully!" });
  };

  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation failed", errors);
    }
  };

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
module.exports = new UserController();

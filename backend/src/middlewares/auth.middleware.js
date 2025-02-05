const HttpException = require("../utils/HttpException.utils");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = (...roles) => {
  return async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const bearer = "Bearer ";

      if (!authHeader || !authHeader.startsWith(bearer)) {
        throw new HttpException(401, "Access denied. No credentials sent!");
      }

      const token = authHeader.replace(bearer, "");
      const secretKey = process.env.SECRET_JWT || "supersecrettoken";

      // Verify Token
      const decoded = await jwt.verify(token, secretKey);

      // if the user role don't have the permission to do this action.
      // the user will get this error
      if (roles.length && !roles.includes(decoded.role)) {
        throw new HttpException(
          403,
          "Unauthorized: You do not have the required permissions"
        );
      }
      const user = await User.findOne({
        where: {
          user_id: decoded.user_id,
        },
      });
      const { password, ...userWithoutPassword } = user.toJSON();
      // if the user has permissions
      req.authorizedUser = userWithoutPassword;
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = auth;

const express = require("express");
// Init environment
require("dotenv").config();
const cors = require("cors");
const HttpException = require("./utils/HttpException.utils");
const errorMiddleware = require("./middlewares/error.middleware");
const database = require("./db/db-connection");
const registerRouter = require("./routes/register.route");
const loginRouter = require("./routes/login.route");
const courseRouter = require("./routes/education/courses.route");
const JobRouter = require("./routes/jobPortal/jobs.route");
const studentRouter = require("./routes/education/student.route");
const employerRouter = require("./routes/jobPortal/employer.route");
const jobSeekerRouter = require("./routes/jobPortal/jobSeeker.route");
const userRouter = require("./routes/user.route");
const adminRouter = require("./routes/admin.route");
const initializeAssociations = require("./models/modelAssociations");

// Init express
const app = express();

// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

const port = Number(process.env.PORT || 4000);

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/courses", courseRouter);
app.use("/jobs", JobRouter);
app.use("/student", studentRouter);
app.use("/employer", employerRouter);
app.use("/job-seeker", jobSeekerRouter);
app.use("/users", userRouter);
app.use("/admin", adminRouter);

// 404 error
app.all("*", (req, res, next) => {
  const err = new HttpException(404, "Endpoint Not Found");
  next(err);
});

// Error middleware
app.use(errorMiddleware);

// init model associations
initializeAssociations();
// Sync database and start server
database
  .sync()
  .then(() => {
    console.log("✅ Database synchronized successfully!");
    app.listen(port, () => {
      console.log(`🚀 Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log("❌ Error syncing database:", error);
  });

module.exports = app;

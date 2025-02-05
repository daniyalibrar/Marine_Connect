import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// routes protector
import ProtectedRoute from "./components/ProtectedRoute";

// main layout
import MainLayout from "./layout/MainLayout";

// inner pages
import HomePage from "./pages/Home/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import CoursesPage from "./pages/Courses/CoursesPage";
import SingleCourse from "./pages/Courses/SingleCourse";
import CourseApplication from "./pages/Courses/CourseApplication";
import JobsPage from "./pages/Jobs/JobsPage";
import SingleJob, { singleJobLoader } from "./pages/Jobs/SingleJob";
import JobApplication from "./pages/Jobs/JobApplication";
import HirePage from "./pages/Hire/HirePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LogoutPage from "./pages/LogoutPage";
import NotFoundPage from "./pages/NotFoundPage";

// student pages
import StudentLayout from "./pages/Student/StudentLayout";
import StudentDashboard from "./pages/Student/StudentDashboard";
import StudentProfile from "./pages/Student/StudentProfile";
import StudentApplications from "./pages/Student/StudentApplications";
import StudentEnrollments from "./pages/Student/StudentEnrollments";
import CourseHome from "./pages/Student/CourseHome";
import CourseTopics from "./pages/Student/CourseTopics";
import CourseTopicViewer from "./pages/Student/CourseTopicViewer";

// employer pages
import EmployerLayout from "./pages/Employer/EmployerLayout";
import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import EmployerProfile from "./pages/Employer/EmployerProfile";
import ShowAllJobs from "./pages/Employer/ShowAllJobs";
import CreateJobPost from "./pages/Employer/CreateJobPost";
import EditJobPost, { jobloader } from "./pages/Employer/EditJobPost";
import JobApplicants from "./pages/Employer/JobApplicants";
import JobApplicantsList from "./pages/Employer/JobApplicantsList";

// job seeker pages
import JobSeekerLayout from "./pages/JobSeeker/JobSeekerLayout";
import JobSeekerDashboard from "./pages/JobSeeker/JobSeekerDashboard";
import JobSeekerProfile from "./pages/JobSeeker/JobSeekerProfile";
import JobSeekerResume from "./pages/JobSeeker/JobSeekerResume";
import JobSeekerJobApplications from "./pages/JobSeeker/JobSeekerJobApplications";

// main app styles
import "./App.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<SingleCourse />} />
        <Route
          path="/courses/:id/apply"
          element={
            <ProtectedRoute role="student">
              <CourseApplication />
            </ProtectedRoute>
          }
        />
        <Route path="/jobs" element={<JobsPage />} />
        <Route
          path="/jobs/:job_id"
          loader={singleJobLoader}
          element={<SingleJob />}
        />
        <Route
          path="/jobs/:job_id/apply"
          element={
            <ProtectedRoute role="job_seeker">
              <JobApplication />
            </ProtectedRoute>
          }
        />

        <Route path="/hire" element={<HirePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="applications" element={<StudentApplications />} />
          <Route path="enrollments" element={<StudentEnrollments />} />
          <Route path="enrollments/:enrollment_id" element={<CourseHome />} />
          <Route
            path="enrollments/:enrollment_id/topics"
            element={<CourseTopics />}
          />
          <Route
            path="enrollments/:enrollment_id/topics/:topic_id"
            element={<CourseTopicViewer />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route
          path="/employer"
          element={
            <ProtectedRoute role="employer">
              <EmployerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmployerDashboard />} />
          <Route path="profile" element={<EmployerProfile />} />
          <Route path="jobs" element={<ShowAllJobs />} />
          <Route path="jobs/create" element={<CreateJobPost />} />
          <Route
            path="jobs/:job_id"
            loader={jobloader}
            element={<EditJobPost />}
          />
          <Route path="job-applicants" element={<JobApplicants />}>
            <Route path=":job_id" element={<JobApplicantsList />} />
          </Route>
        </Route>
        <Route
          path="/job-seeker"
          element={
            <ProtectedRoute role="job_seeker">
              <JobSeekerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<JobSeekerDashboard />} />
          <Route path="profile" element={<JobSeekerProfile />} />
          <Route path="resume" element={<JobSeekerResume />} />
          <Route path="applications" element={<JobSeekerJobApplications />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;

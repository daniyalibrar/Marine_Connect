import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./store/slices/authSlice";

import MainLayout from "./layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import CourseCategoriesPage from "./pages/CourseCategories/CourseCategoriesPage";
import ShowCategories from "./pages/CourseCategories/ShowCategories";
import AddNewCategory from "./pages/CourseCategories/AddNewCategory";
import CoursesPage from "./pages/Courses/CoursesPage";
import ShowCourses from "./pages/Courses/ShowCourses";
import SingleCourse, { courseLoader } from "./pages/Courses/SingleCourse";
import CourseTopics from "./pages/Courses/CourseTopics";
import AddTopic from "./pages/Courses/AddTopic";
import AddCourse from "./pages/Courses/AddCourse";
import CourseApplications from "./pages/Courses/CourseApplications";
import UsersPage from "./pages/Users/UsersPage";
import ShowUsers from "./pages/Users/ShowUsers";
import EditUser, { userloader } from "./pages/Users/EditUser";
import AddUser from "./pages/Users/AddUser";
import JobsPage from "./pages/Jobs/JobsPage";
import EditJobPost, { jobloader } from "./pages/Jobs/EditJobPost";

import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { toast } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const signout = () => {
    dispatch(logout());
    toast.success("Logout Successful! Login again with admin account");
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <ProtectedRoute role="admin">
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/course-categories" element={<CourseCategoriesPage />}>
            <Route index element={<ShowCategories />} />
            <Route path="add" element={<AddNewCategory />} />
          </Route>
          <Route path="/courses" element={<CoursesPage />}>
            <Route index element={<ShowCourses />} />
            <Route path=":id" loader={courseLoader} element={<SingleCourse />}>
              <Route index element={<CourseTopics />} />
              <Route path="add-topic" element={<AddTopic />} />
            </Route>
            <Route path="add" element={<AddCourse />} />
          </Route>
          <Route path="/course-applications" element={<CourseApplications />} />
          <Route path="/users" element={<UsersPage />}>
            <Route index element={<ShowUsers />} />
            <Route path=":id/edit" loader={userloader} element={<EditUser />} />
            <Route path="add" element={<AddUser />} />
          </Route>
          <Route path="/jobs" element={<JobsPage />} />
          <Route
            path="/jobs/:job_id/:user_id"
            loader={jobloader}
            element={<EditJobPost />}
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signout" loader={signout} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;

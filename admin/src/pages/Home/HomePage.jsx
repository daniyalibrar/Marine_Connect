import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../api";
import Loader from "../../components/Loader/Loader";
import {
  UserGroupIcon,
  BookOpenIcon,
  BriefcaseIcon,
} from "@heroicons/react/20/solid";
import CourseCard from "../../components/CourseCard";

function HomePage() {
  const { admin } = useSelector((state) => state.auth);
  const [dashboard, setDashboard] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setIsLoading(true);
        const headers = {
          Authorization: `Bearer ${admin.token}`,
        };
        const response = await API.get(`/dashboard`, {
          headers,
        });
        if (response.status === 200) {
          setDashboard(response.data.dashboard);
        }
      } catch (error) {
        if (error.status === 404) {
          console.log("Dashboard details not found");
        } else {
          console.log(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Admin Dashboard</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-sm p-4 border border-gray-200 rounded-xl flex">
          <div className="space-y-1 flex-1">
            <p className="font-bold">No. of Users:</p>
            <p className="text-xl font-bold">{dashboard.users.length}</p>
          </div>
          <div className="w-14 flex items-center justify-center">
            <UserGroupIcon className="text-indigo-600" />
          </div>
        </div>

        <div className="bg-white shadow-sm p-4 border border-gray-200 rounded-xl flex">
          <div className="space-y-1 flex-1">
            <p className="font-bold">No. of Courses:</p>
            <p className="text-xl font-bold">{dashboard.courses.length}</p>
          </div>
          <div className="w-14 flex items-center justify-center">
            <BookOpenIcon className="text-indigo-600" />
          </div>
        </div>

        <div className="bg-white shadow-sm p-4 border border-gray-200 rounded-xl flex">
          <div className="space-y-1 flex-1">
            <p className="font-bold">No. of Job Posts</p>
            <p className="text-xl font-bold">{dashboard.jobs.length}</p>
          </div>
          <div className="w-14 flex items-center justify-center">
            <BriefcaseIcon className="text-indigo-600" />
          </div>
        </div>
      </div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Popular Courses
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dashboard.courses.map((course) => (
          <CourseCard
            key={course.course_id}
            id={course.course_id}
            title={course.title}
            image={course.image}
            shortDescription={course.shortDescription}
            level={course.level}
            durationHours={course.durationHours}
            link={`/courses/${course.course_id}`}
          />
        ))}
      </div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Featured Jobs
      </h3>
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-1 py-3 text-left text-sm font-bold text-gray-900"
              >
                Job Title
              </th>
              <th
                scope="col"
                className="px-1 py-3 text-left text-sm font-bold text-gray-900"
              >
                Company
              </th>
              <th
                scope="col"
                className="px-1 py-3 text-left text-sm font-bold text-gray-900"
              >
                Employer Email
              </th>
              <th
                scope="col"
                className="px-1 py-3 text-left text-sm font-bold text-gray-900"
              >
                Posted Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dashboard.jobs.map((job) => (
              <tr key={job.job_id}>
                <td className="whitespace-nowrap px-1 py-3 text-sm text-left text-gray-700">
                  {job.title}
                </td>
                <td className="whitespace-nowrap px-1 py-3 text-sm text-left text-gray-700">
                  {job.User.EmployerProfile.name}
                </td>
                <td className="whitespace-nowrap px-1 py-3 text-sm text-left text-gray-700">
                  {job.User.email}
                </td>
                <td className="whitespace-nowrap px-1 py-3 text-sm text-gray-700">
                  {new Date(job.createdAt).toLocaleDateString()}
                  <br />
                  {new Date(job.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;

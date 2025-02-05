import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../api";
import Loader from "../../components/Loader/Loader";
import CourseCard from "../../components/CourseCard";
import {
  UserCircleIcon,
  CalendarIcon,
  BookOpenIcon,
} from "@heroicons/react/20/solid";

function StudentDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [dashboard, setDashboard] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setIsLoading(true);
        const headers = {
          Authorization: `Bearer ${user.token}`,
        };
        const response = await API.get(`/student/${user.user_id}/dashboard`, {
          headers,
        });
        if (response.status === 200) {
          setDashboard(response.data.dashboard);
        }
      } catch (error) {
        if (error.status === 404) {
          console.log("Your dashboard details not found");
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

  const getEnrollmentId = (course_id) => {
    const filteredEnrollment = dashboard.enrollments.filter((enrollment) => {
      return enrollment.course_id === course_id;
    });
    return filteredEnrollment[0].enrollment_id;
  };

  const applicationStatusColor = (status) => {
    if (status === "Pending") return "bg-blue-500";
    if (status === "Approved") return "bg-green-500";
    if (status === "Rejected") return "bg-red-500";
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-base font-bold leading-6 text-gray-900">
        Student Dashboard
      </h3>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Student Details
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-sm p-4 border border-gray-200 rounded-xl flex">
          <div className="space-y-1 flex-1">
            <p className="font-bold">Account Type:</p>
            <p>
              <span className="bg-blue-500 text-white px-4 py-0.5 rounded-lg">
                {dashboard.user.role}
              </span>
            </p>
          </div>
          <div className="w-14 flex items-center justify-center">
            <UserCircleIcon className="text-indigo-600" />
          </div>
        </div>

        <div className="bg-white shadow-sm p-4 border border-gray-200 rounded-xl flex">
          <div className="space-y-1 flex-1">
            <p className="font-bold">You Joined on:</p>
            <p>{new Date(dashboard.user.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="w-14 flex items-center justify-center">
            <CalendarIcon className="text-indigo-600" />
          </div>
        </div>

        <div className="bg-white shadow-sm p-4 border border-gray-200 rounded-xl flex">
          <div className="space-y-1 flex-1">
            <p className="font-bold">No. of Courses Enrolled</p>
            <p>{dashboard.enrollments.length}</p>
          </div>
          <div className="w-14 flex items-center justify-center">
            <BookOpenIcon className="text-indigo-600" />
          </div>
        </div>
      </div>

      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Your Enrolled Courses
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dashboard.courses.length > 0 ? (
          dashboard.courses.map((course) => (
            <CourseCard
              key={course.course_id}
              id={course.course_id}
              title={course.title}
              image={course.image}
              shortDescription={course.shortDescription}
              level={course.level}
              durationHours={course.durationHours}
              courseLink={`/student/enrollments/${getEnrollmentId(
                course.course_id
              )}`}
            />
          ))
        ) : (
          <p className="text-left text-sm">
            You are nor enrolled in any course.
          </p>
        )}
      </div>

      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Your Course Applications
      </h3>
      {dashboard.applications.length > 0 ? (
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-1 py-3 text-left text-sm font-semibold text-gray-900"
                >
                  Course Title
                </th>
                <th
                  scope="col"
                  className="px-1 py-3 text-center text-sm font-semibold text-gray-900"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-1 py-3 text-center text-sm font-semibold text-gray-900"
                >
                  Applied at
                </th>
                <th
                  scope="col"
                  className="px-1 py-3 text-center text-sm font-semibold text-gray-900"
                >
                  Approved at
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dashboard.applications.map((application) => (
                <tr key={application.application_id}>
                  <td className="whitespace-nowrap px-1 py-3 text-left text-gray-700">
                    {application.Course.title}
                  </td>
                  <td className="whitespace-nowrap flex items-center justify-center px-1 py-3 text-sm">
                    <span
                      className={`${applicationStatusColor(
                        application.status
                      )} text-white rounded-full px-3 py-1`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 text-center text-gray-700">
                    {new Date(application.appliedAt).toLocaleDateString()}
                    <br />
                    {new Date(application.appliedAt).toLocaleTimeString()}
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 text-center text-gray-700">
                    {application.approvedAt ? (
                      <>
                        {new Date(application.approvedAt).toLocaleDateString()}
                        <br />
                        {new Date(application.approvedAt).toLocaleTimeString()}
                      </>
                    ) : (
                      "Not Approved Yet"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-left text-sm">You have not applied in any course yet.</p>
      )}
    </div>
  );
}

export default StudentDashboard;

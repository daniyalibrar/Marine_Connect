import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../api";
import Loader from "../../components/Loader/Loader";
import {
  UserCircleIcon,
  CalendarIcon,
  BriefcaseIcon,
} from "@heroicons/react/20/solid";

function EmployerDashboard() {
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
        const response = await API.get(`/employer/dashboard`, {
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

  const replaceUnderscoresAndCapitalize = (str) => {
    return str
      .split("_") // Split the string into an array using "_" as the delimiter
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
      .join(" "); // Join the words with a space
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Employer Dashboard
      </h3>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Employer Details
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-sm p-4 border border-gray-200 rounded-xl flex">
          <div className="space-y-1 flex-1">
            <p className="font-bold">Account Type:</p>
            <p>
              <span className="bg-gray-600 text-white px-4 py-0.5 rounded-lg">
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
            <p className="font-bold">No. of Jobs Posted</p>
            <p>{dashboard.jobs.length}</p>
          </div>
          <div className="w-14 flex items-center justify-center">
            <BriefcaseIcon className="text-indigo-600" />
          </div>
        </div>
      </div>

      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Your Job Posts
      </h3>
      {dashboard.jobs.length > 0 ? (
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
                  Job Type
                </th>
                <th
                  scope="col"
                  className="px-1 py-3 text-left text-sm font-bold text-gray-900"
                >
                  Salary{"($)"}
                </th>
                <th
                  scope="col"
                  className="px-1 py-3 text-left text-sm font-bold text-gray-900"
                >
                  Job Level
                </th>
                <th
                  scope="col"
                  className="px-1 py-3 text-left text-sm font-bold text-gray-900"
                >
                  Job Location
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
                  <td className="whitespace-nowrap px-1 py-3 text-sm text-gray-700">
                    {job.title}
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 text-sm text-gray-700">
                    {replaceUnderscoresAndCapitalize(job.jobType)}
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 text-sm text-gray-700">
                    {`Min: ${job.minSalary}`}
                    <br />
                    {`Max: ${job.maxSalary}`}
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 text-sm text-gray-700">
                    {replaceUnderscoresAndCapitalize(job.jobLevel)}
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 text-sm text-gray-700">
                    {replaceUnderscoresAndCapitalize(job.jobLocation)}
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
      ) : (
        <p className="text-left text-sm">You have not posted a job yet.</p>
      )}
    </div>
  );
}

export default EmployerDashboard;

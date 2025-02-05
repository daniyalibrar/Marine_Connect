import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api";
import Loader from "../../components/Loader/Loader";

function ShowAllJobs() {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchEmployerJobs = async () => {
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      setLoading(true);
      try {
        const response = await API.get(`/employer/jobs`, {
          headers,
        });
        if (response.status === 200) {
          setJobs(response.data.jobs);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployerJobs();
  }, []);

  const handleDelete = async (job_id) => {
    const headers = {
      Authorization: `Bearer ${user.token}`,
    };
    await API.delete(`/employer/jobs/${job_id}`, { headers })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Job Post Deleted Successfully!");
          const updatedJobs = jobs.filter((job) => job.job_id !== job_id);
          setJobs(updatedJobs);
        }
      })
      .catch((error) => {
        toast.error("Error deleting Job Post");
        console.log(error);
      });
  };

  const replaceUnderscoresAndCapitalize = (str) => {
    return str
      .split("_") // Split the string into an array using "_" as the delimiter
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
      .join(" "); // Join the words with a space
  };

  return (
    <div className="p-4 space-y-1">
      <h3 className="text-lg font-semibold text-gray-900">Job Listings</h3>
      <p className="text-sm text-gray-500">
        List of all the jobs you have posted.
      </p>
      <div className="pt-4">
        {loading ? (
          <Loader />
        ) : (
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
                  <th
                    scope="col"
                    className="px-1 py-3 text-center text-sm font-bold text-gray-900"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {jobs.map((job) => (
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
                    <td className="whitespace-nowrap flex justify-center items-center space-x-2 py-3 text-sm text-gray-700">
                      <Link
                        to={`/employer/jobs/${job.job_id}`}
                        className="flex justify-center rounded-md px-3 py-1 bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(job.job_id)}
                        disabled={loading}
                        className="flex justify-center rounded-md px-3 py-1 bg-red-600 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowAllJobs;

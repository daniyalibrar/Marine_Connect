import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api";
import Loader from "../../components/Loader/Loader";

function JobsPage() {
  const { admin } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const headers = {
        Authorization: `Bearer ${admin.token}`,
      };
      setLoading(true);
      try {
        const response = await API.get(`/jobs`, {
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

    fetchJobs();
  }, []);

  const handleDelete = async (job_id, user_id) => {
    const headers = {
      Authorization: `Bearer ${admin.token}`,
    };
    try {
      const response = await API.delete(`/jobs/${job_id}/${user_id}`, {
        headers,
      });
      if (response.status === 200) {
        toast.success("Job Post Deleted Successfully!");
        const updatedJobs = jobs.filter((job) => job.job_id !== job_id);
        setJobs(updatedJobs);
      }
    } catch (error) {
      toast.error("Error deleting Job Post");
      console.log(error);
    }
  };

  return (
    <div className="p-4 space-y-1">
      <h3 className="text-lg font-semibold text-gray-900">Job Listings</h3>
      <p className="text-sm text-gray-500">
        List of all the jobs posted by employers.
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
                    <td className="whitespace-nowrap flex justify-center items-center space-x-2 py-3 text-sm text-gray-700">
                      <Link
                        to={`/jobs/${job.job_id}/${job.User.user_id}`}
                        className="flex justify-center rounded-md px-3 py-1 bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() =>
                          handleDelete(job.job_id, job.User.user_id)
                        }
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

export default JobsPage;

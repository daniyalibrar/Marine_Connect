import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import API from "../../api";
import Loader from "../../components/Loader/Loader";

function JobApplicants() {
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
        const response = await API.get(`/employer/jobsWithNoOfApplicants`, {
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

  const linkClasses = ({ isActive }) => {
    if (isActive) {
      return "flex justify-between items-center bg-blue-200 p-2 rounded-md";
    } else {
      return "flex justify-between items-center bg-gray-200 p-2 rounded-md";
    }
  };
  return (
    <div className="p-4 space-y-2">
      <h3 className="text-lg font-semibold text-gray-900">Job Applicants</h3>
      <p className="text-sm text-gray-500">
        List of all the jobs with their number of applicants.
      </p>
      <p className="text-sm text-gray-500">
        Select a job to show its applicants
      </p>
      <div className="pt-4 flex space-x-4">
        <div className="w-56 border border-gray-200 p-2 rounded-md">
          {loading ? (
            <Loader />
          ) : (
            <div className="space-y-2">
              {jobs.length ? (
                jobs.map((job) => (
                  <NavLink
                    to={`${job.job_id}`}
                    key={job.job_id}
                    className={linkClasses}
                  >
                    <p className="text-sm">{job.title}</p>
                    {job.JobApplications.length > 0 && (
                      <p className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md">
                        {job.JobApplications.length}
                      </p>
                    )}
                  </NavLink>
                ))
              ) : (
                <p>No job applications found</p>
              )}
            </div>
          )}
        </div>
        <div className="flex-1 border border-gray-200 p-2 rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default JobApplicants;

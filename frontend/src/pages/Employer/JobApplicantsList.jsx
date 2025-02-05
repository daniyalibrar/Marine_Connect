import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import API from "../../api";
import Loader from "../../components/Loader/Loader";

function JobApplicantsList() {
  const { user } = useSelector((state) => state.auth);
  const { job_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => {
    const fetchJobApplicants = async () => {
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      setLoading(true);
      try {
        const response = await API.get(
          `/employer/jobs/${job_id}/applications`,
          {
            headers,
          }
        );
        if (response.status === 200) {
          setJobApplications(response.data.jobApplications);
        }
      } catch (error) {
        console.log(error);
        if (error.status === 404) {
          setJobApplications([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobApplicants();
  }, [job_id]);

  const setJobApplicationStatus = async (
    job_application_id,
    job_id,
    status
  ) => {
    const headers = {
      Authorization: `Bearer ${user.token}`,
    };
    await API.put(
      `/employer/jobs/${job_id}/applications/${job_application_id}`,
      { status },
      { headers }
    )
      .then((response) => {
        if (response.status === 200) {
          setJobApplications(
            jobApplications.map((jobApplication) => {
              if (
                jobApplication.job_application_id ===
                response.data.jobApplication.job_application_id
              ) {
                return {
                  ...jobApplication,
                  status: status,
                };
              }
              return jobApplication;
            })
          );
        }
        toast.success("Job Application status updated successfully!");
      })
      .catch((error) => {
        toast.error("Something went wrong! Try again.");
        console.log(error);
      });
  };

  const applicationStatusColor = (status) => {
    if (status === "Pending") return "bg-blue-500";
    if (status === "Shortlisted") return "bg-green-500";
    if (status === "Rejected") return "bg-red-500";
  };

  return (
    <div className="p-4">
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : jobApplications.length > 0 ? (
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-1 py-3 text-left text-sm font-bold text-gray-900"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-1 py-3 text-left text-sm font-bold text-gray-900"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-1 py-3 text-center text-sm font-bold text-gray-900"
                >
                  Resume
                </th>
                <th
                  scope="col"
                  className="px-1 py-3 text-center text-sm font-bold text-gray-900"
                >
                  Status
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
              {jobApplications.map((jobApplication) => (
                <tr key={jobApplication.job_application_id}>
                  <td className="whitespace-nowrap px-1 py-3 text-sm text-gray-700">
                    {`${jobApplication.User.firstName}`}
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 text-sm text-gray-700">
                    <a href={`mailto:${jobApplication.User.email}`}
                    className="text-blue-600">
                      {jobApplication.User.email}
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 text-sm text-center text-gray-700">
                    <a
                      href={jobApplication.User.Resume.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-600 text-white p-2 rounded-md"
                    >
                      View Resume
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 text-sm text-center text-gray-700">
                    <span
                      className={`${applicationStatusColor(
                        jobApplication.status
                      )} text-white rounded-full px-3 py-1`}
                    >
                      {jobApplication.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 text-sm text-center text-gray-700">
                    <select
                      defaultValue={jobApplication.status}
                      onChange={(e) =>
                        setJobApplicationStatus(
                          jobApplication.job_application_id,
                          jobApplication.job_id,
                          e.target.value
                        )
                      }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shortlisted">ShortListed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No job applications found for this job post</p>
      )}
    </div>
  );
}

export default JobApplicantsList;

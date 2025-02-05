import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../api";
import Loader from "../../components/Loader/Loader";

function JobSeekerJobApplications() {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => {
    const fetchJobApplications = async () => {
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      setLoading(true);
      try {
        const response = await API.get(
          `/job-seeker/${user.user_id}/jobApplications`,
          { headers }
        );
        if (response.status === 200) {
          setJobApplications(response.data.jobApplications);
        }
      } catch (error) {
        if (error.status === 404) {
          console.log("You have not applied to any Job");
        } else {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobApplications();
  }, []);

  const applicationStatusColor = (status) => {
    if (status === "Pending") return "bg-blue-500";
    if (status === "Shortlisted") return "bg-green-500";
    if (status === "Rejected") return "bg-red-500";
  };

  return (
    <div className="p-4 space-y-2 pb-24">
      <h3 className="text-lg font-semibold text-gray-900">Job Applications</h3>
      <p className="text-sm text-gray-500">
        List of all the Jobs in which you have applied.
      </p>
      <div className="pt-4">
        {loading ? (
          <Loader />
        ) : jobApplications.length ? (
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-1 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Job Title
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3 text-center text-sm font-semibold text-gray-900"
                  >
                    Company
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
                {jobApplications.map((jobApplication) => (
                  <tr key={jobApplication.job_application_id}>
                    <td className="whitespace-nowrap px-1 py-3 text-left text-gray-700">
                      {jobApplication.Job.title}
                    </td>
                    <td className="whitespace-nowrap px-1 py-3 text-center text-gray-700">
                      {jobApplication.Job.User.EmployerProfile.name}
                    </td>
                    <td className="whitespace-nowrap flex items-center justify-center px-1 py-3 text-sm">
                      <span
                        className={`${applicationStatusColor(
                          jobApplication.status
                        )} text-white rounded-full px-3 py-1`}
                      >
                        {jobApplication.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-1 py-3 text-center text-gray-700">
                      {new Date(jobApplication.createdAt).toLocaleDateString()}
                      <br />
                      {new Date(jobApplication.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="whitespace-nowrap px-1 py-3 text-center text-gray-700">
                      {jobApplication.approvedAt ? (
                        <>
                          {new Date(
                            jobApplication.approvedAt
                          ).toLocaleDateString()}
                          <br />
                          {new Date(
                            jobApplication.approvedAt
                          ).toLocaleTimeString()}
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
          <p className="p-4 text-center text-gray-500">
            You have not applied to any jobs yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default JobSeekerJobApplications;

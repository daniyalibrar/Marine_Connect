import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../api";

function StudentApplications() {
  const { user } = useSelector((state) => state.auth);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchStudentApplications = async () => {
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      await API.get(`/student/${user.user_id}/applications`, { headers })
        .then((response) => {
          if (response.status === 200) {
            setApplications(response.data.courseApplications);
          }
        })
        .catch((error) => {
          if (error.status === 404) {
            console.log("You have not applied to any course");
          } else {
            console.log(error);
          }
        });
    };

    fetchStudentApplications();
  }, []);

  const applicationStatusColor = (status) => {
    if (status === "Pending") return "bg-blue-500";
    if (status === "Approved") return "bg-green-500";
    if (status === "Rejected") return "bg-red-500";
  };

  return (
    <div className="p-4 space-y-2 pb-24">
      <h3 className="text-lg font-semibold text-gray-900">
        Course Applications
      </h3>
      <p className="text-sm text-gray-500">
        List of all the courses in which you have applied.
      </p>
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
            {applications.map((application) => (
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
    </div>
  );
}

export default StudentApplications;

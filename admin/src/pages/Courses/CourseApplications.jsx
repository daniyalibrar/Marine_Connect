import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import API from "../../api";

function CourseApplications() {
  const { admin } = useSelector((state) => state.auth);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchCourseApplications = async () => {
      const headers = {
        Authorization: `Bearer ${admin.token}`,
      };
      await API.get(`/course-applications`, { headers })
        .then((response) => {
          if (response.status === 200) {
            setApplications(response.data.courseApplications);
          }
        })
        .catch((error) => {
          if (error.status === 404) {
            console.log("No applications yet");
          } else {
            console.log(error);
          }
        });
    };

    fetchCourseApplications();
  }, []);

  const applicationStatusColor = (status) => {
    if (status === "Pending") return "bg-blue-500";
    if (status === "Approved") return "bg-green-500";
    if (status === "Rejected") return "bg-red-500";
  };

  const setApplicationStatus = async (id, status) => {
    const headers = {
      Authorization: `Bearer ${admin.token}`,
    };
    await API.put(`/course-applications/${id}`, { status }, { headers })
      .then((response) => {
        if (response.status === 200) {
          setApplications(
            applications.map((application) => {
              if (
                application.application_id ===
                response.data.courseApplication.application_id
              ) {
                return {
                  ...application,
                  status: status,
                  approvedAt: response.data.courseApplication.approvedAt,
                };
              }
              return application;
            })
          );
        }
        toast.success("Application status updated successfully!");
      })
      .catch((error) => {
        toast.error("Something went wrong! Try again.");
        console.log(error);
      });
  };

  return (
    <div className="p-4 space-y-2 pb-24">
      <h3 className="text-lg font-semibold text-gray-900">
        Course Applications
      </h3>
      <p className="text-sm text-gray-500">
        List of all the courses applications.
      </p>
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-1 py-3 text-left text-sm font-semibold text-gray-900"
              >
                Student Email
              </th>
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
              <th
                scope="col"
                className="px-1 py-3 text-center text-sm font-semibold text-gray-900"
              >
                Set Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications.map((application) => (
              <tr key={application.application_id}>
                <td className="whitespace-nowrap px-1 py-3 text-left text-gray-700">
                  {application.User.email}
                </td>
                <td className="whitespace-nowrap px-1 py-3 text-left text-gray-700">
                  {application.Course.title}
                </td>
                <td className="text-center px-1 py-3 text-sm">
                  <span
                    className={`${applicationStatusColor(
                      application.status
                    )} text-white rounded-full px-3 py-1`}
                  >
                    {application.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-1 py-3 text-center text-gray-700">
                  <div>
                    {new Date(application.appliedAt).toLocaleDateString()}
                  </div>
                  <div>
                    {new Date(application.appliedAt).toLocaleTimeString()}
                  </div>
                </td>
                <td className="whitespace-nowrap px-1 py-3 text-center text-gray-700">
                  {application.approvedAt ? (
                    <>
                      <div>
                        {new Date(application.approvedAt).toLocaleDateString()}
                      </div>
                      <div>
                        {new Date(application.approvedAt).toLocaleTimeString()}
                      </div>
                    </>
                  ) : (
                    "Not Approved Yet"
                  )}
                </td>
                <td className="whitespace-nowrap px-1 py-3 text-center text-gray-700">
                  <select
                    defaultValue={application.status}
                    onChange={(e) =>
                      setApplicationStatus(
                        application.application_id,
                        e.target.value
                      )
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CourseApplications;

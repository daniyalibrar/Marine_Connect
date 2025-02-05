import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../api";
import { Link } from "react-router-dom";

function StudentEnrollments() {
  const { user } = useSelector((state) => state.auth);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchStudentEnrollments = async () => {
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      await API.get(`/student/${user.user_id}/enrollments`, { headers })
        .then((response) => {
          if (response.status === 200) {
            setEnrollments(response.data.enrollments);
          }
        })
        .catch((error) => {
          if (error.status === 404) {
            console.log("You are not enrolled in any course");
          } else {
            console.log(error);
          }
        });
    };

    fetchStudentEnrollments();
  }, []);

  return (
    <div className="p-4 space-y-2">
      <h3 className="text-lg font-semibold text-gray-900">
        Course Enrollments
      </h3>
      <p className="text-sm text-gray-500">
        List of all the courses in which you are enrolled.
      </p>
      <div className="pt-10 space-y-4">
        {enrollments.map((enrollment) => (
          <div
            key={enrollment.enrollment_id}
            className="flex justify-between bg-blue-50 rounded-lg"
          >
            <div className="w-20 h-auto overflow-hidden rounded-s-lg">
              <img
                className="w-full h-full object-cover"
                src={enrollment.Course.image}
                alt="course image"
              />
            </div>
            <div className="flex-1 pl-4 flex flex-col justify-between">
              <h3 className="text-md text-gray-900">
                {enrollment.Course.title}
              </h3>
              <p className="text-sm text-gray-500 mt-4">
                Enrollment Date:{" "}
                {new Date(enrollment.enrollmentDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center justify-center mr-4">
              <Link
                to={`${enrollment.enrollment_id}`}
                className="bg-green-500 text-white text-sm px-4 py-2 rounded-lg"
              >
                Start Learning
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentEnrollments;

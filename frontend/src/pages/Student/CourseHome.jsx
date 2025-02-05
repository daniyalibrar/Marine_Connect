import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../api";
import { Link, useParams } from "react-router-dom";

function CourseHome() {
  const { enrollment_id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [course, setCourse] = useState({});

  useEffect(() => {
    const fetchEnrolledCourse = async () => {
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      await API.get(`/student/${user.user_id}/enrollments/${enrollment_id}`, {
        headers,
      })
        .then((response) => {
          if (response.status === 200) {
            setCourse(response.data.course);
          }
        })
        .catch((error) => {
          if (error.status === 404) {
            console.log("You are not enrolled in this course");
          } else {
            console.log(error);
          }
        });
    };

    fetchEnrolledCourse();
  }, []);

  return (
    <div className="p-4 pb-16">
      <div className="flex justify-between bg-blue-50 rounded-xl">
        <div className="w-32 sm:w-56 h-auto overflow-hidden rounded-s-xl">
          <img
            className="w-full h-full object-cover"
            src={course.image}
            alt="course-image"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-gray-900">{course.title}</h1>
            <Link
              to="topics"
              className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg"
            >
              Go to Course Topics
            </Link>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Description</h3>
            <p className="text-gray-600">{course.shortDescription}</p>
          </div>
        </div>
      </div>
      <div className="space-y-4 bg-gray-100 p-4 rounded-xl mt-4">
        <div className="text-xl font-bold">Course Details</div>
        <div
          id="course_details"
          className="space-y-4"
          dangerouslySetInnerHTML={{ __html: course.longDescription }}
        ></div>
      </div>
    </div>
  );
}

export default CourseHome;

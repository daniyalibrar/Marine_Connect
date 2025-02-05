import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Topic from "../../components/Topic";
import API from "../../api";

function SingleCourse() {
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [courseTopics, setCourseTopics] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await API.get(`/courses/${id}`);
        setCourse(response.data.course);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCourse();
  }, []);

  const toggleTopics = () => {
    if (courseTopics.length > 0) {
      setCourseTopics([]);
    } else {
      setCourseTopics(course.topics);
    }
  };
  
  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center my-16 px-4 xl:px-32">
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-12 lg:col-span-8 flex flex-col space-y-4">
            <div className="space-y-4 bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
              <div className="w-full h-auto sm:h-96">
                <img
                  src={course.image}
                  alt={course.title}
                  className=" w-full h-full object-cover"
                />
              </div>
              <div className="text-wrap p-4 pt-0 space-y-4">
                <h1 className="text-xl font-bold">{course.title}</h1>
                <h3 className="font-semibold">Description</h3>
                <p className="text-gray-600">{course.shortDescription}</p>
              </div>
            </div>

            <div className="space-y-4 bg-white shadow-sm border border-gray-200 p-4 rounded-xl">
              <div className="text-xl font-bold">Course Details</div>
              <div
                id="course_details"
                className="space-y-4"
                dangerouslySetInnerHTML={{ __html: course.longDescription }}
              ></div>
            </div>

            <div className="space-y-4 bg-white shadow-sm border border-gray-200 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Course Topics</h1>
                <div className="flex items-center justify-center">
                  <button
                    className="whitespace-nowrap rounded-lg bg-blue-100 px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200"
                    onClick={toggleTopics}
                  >
                    Show/Hide Topics
                  </button>
                </div>
              </div>
              {courseTopics.length > 0 &&
                courseTopics.map((topic) => (
                  <Topic
                    key={topic.sequence}
                    sequence={topic.sequence}
                    title={topic.title}
                    description={topic.description}
                  />
                ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col space-y-4 h-fit sticky top-20">
            <div className="p-4 bg-white shadow-sm border border-gray-200 rounded-xl">
              <h1 className="text-xl font-bold">Course Information</h1>
              <div className="p-2 bg-blue-100 rounded-xl my-4 space-y-1">
                <p className="font-semibold">Category</p>
                <p className="text-sm text-gray-600">{course.categoryName}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-xl my-4 space-y-1">
                <p className="font-semibold">Level</p>
                <p className="text-sm text-gray-600">{course.level}</p>
              </div>

              <div className="p-2 bg-blue-100 rounded-xl my-4 space-y-1">
                <p className="font-semibold">Duration</p>
                <p className="text-sm text-gray-600">
                  {course.durationHours} hours
                </p>
              </div>
            </div>
            <div className="p-4 bg-white shadow-sm border border-gray-200 rounded-xl space-y-4 flex flex-col items-center justify-center">
              {user?.role === "student" ? (
                <Link
                  to={`/courses/${id}/apply`}
                  className="block w-full whitespace-nowrap rounded-full bg-indigo-600 py-3 text-sm text-center font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Apply to this course &rarr;
                </Link>
              ) : (
                <Link
                  to={`/login`}
                  className="block w-full whitespace-nowrap rounded-full bg-indigo-600 py-3 text-sm text-center font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Login to apply for this course &rarr;
                </Link>
              )}

              <Link
                to="/courses"
                className="block w-full whitespace-nowrap rounded-full bg-gray-900 py-3 text-sm text-center font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
              >
                &larr; Go Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCourse;

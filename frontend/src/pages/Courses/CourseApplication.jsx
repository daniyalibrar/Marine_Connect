import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api";

function CourseApplication() {
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);

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

  const handleCourseApplication = async (event) => {
    event.preventDefault();
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${user.token}`,
    };
    await API.post(
      "/student/apply",
      {
        user_id: user.user_id,
        course_id: course.course_id,
      },
      { headers }
    )
      .then((response) => {
        if (response.status === 201) {
          toast.success("Successfully applied to Course!");
          navigate("/student/applications");
        }
      })
      .catch((error) => {
        if (error.status === 409) {
          toast.warn("You have already applied to this course");
        } else {
          toast.error("Something went wrong! Please try again!");
          console.log(error);
        }
      });
    setLoading(false);
  };

  return (
    <section className="h-screen">
      <div className="flex min-h-full flex-1 flex-col items-center justify-center p-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <h1 className="text-center font-bold text-indigo-600 text-3xl">
            Apply to Course
          </h1>
          <div className="mt-4 space-y-4 bg-gray-100 rounded-xl overflow-hidden">
            <div className="w-full h-56">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-wrap p-4 pt-0 space-y-1">
              <h1 className="text-lg font-bold">{course.title}</h1>
              <p className="text-gray-600 text-sm">{course.shortDescription}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 mx-auto w-full max-w-md">
          <form onSubmit={handleCourseApplication} className="space-y-3">
            <div className="grid grid-cols-2 gap-x-4 max-sm:grid-cols-1">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={user.firstName}
                    disabled={true}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 disabled:bg-indigo-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={user.lastName}
                    disabled={true}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 disabled:bg-indigo-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  disabled={true}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 disabled:bg-indigo-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center items-center space-y-3">
              <input
                value={loading ? "Submitting..." : "Submit Application"}
                disabled={loading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:bg-indigo-300 disabled:cursor-not-allowed"
              />
              <Link
                to="/courses"
                className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-800"
              >
                &larr; Go back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CourseApplication;

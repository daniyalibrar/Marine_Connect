import { Link, Outlet, useLoaderData } from "react-router-dom";
import store from "../../store/store";
import API from "../../api";


function SingleCourse() {
  const { course } = useLoaderData();
  return (
    <div className="flex flex-col justify-center">
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 lg:col-span-8 flex flex-col justify-between bg-gray-100 rounded-xl overflow-hidden">
          <div className="w-full h-auto sm:h-96">
            <img
              src={course.image}
              alt={course.title}
              className=" w-full h-full object-cover"
            />
          </div>
          <div className="text-wrap p-4 space-y-4">
            <h1 className="text-xl font-bold">{course.title}</h1>
            <h3 className="font-semibold">Description</h3>
            <p className="text-gray-600">{course.shortDescription}</p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 bg-gray-100 rounded-xl space-y-4 p-4 h-fit sticky top-20">
          <h1 className="text-xl font-bold">Course Information</h1>
          <div className="p-2 bg-blue-100 rounded-xl my-2 space-y-1">
            <p className="font-semibold">Category</p>
            <p className="text-sm text-gray-600">
              {course.CourseCategory.categoryName}
            </p>
          </div>
          <div className="p-2 bg-blue-100 rounded-xl my-2 space-y-1">
            <p className="font-semibold">Level</p>
            <p className="text-sm text-gray-600">{course.level}</p>
          </div>

          <div className="p-2 bg-blue-100 rounded-xl my-2 space-y-1">
            <p className="font-semibold">Duration</p>
            <p className="text-sm text-gray-600">
              {course.durationHours} hours
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-4 bg-gray-100 p-4 rounded-xl">
        <div className="text-xl font-bold">Course Details</div>
        <div
          id="course_details"
          className="space-y-4"
          dangerouslySetInnerHTML={{ __html: course.longDescription }}
        ></div>
      </div>

      <div className="space-y-4 mt-4 mb-52 bg-gray-100 p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Course Topics</h1>
          {location.pathname.includes("add-topic") ? (
            <Link
              to="."
              className="whitespace-nowrap rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
            >
              &larr; Go Back
            </Link>
          ) : (
            <Link
              to="add-topic"
              className="whitespace-nowrap rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Add a topic to this Course &rarr;
            </Link>
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default SingleCourse;

export async function courseLoader({ params }) {
  const { admin } = store.getState().auth;
  const response = await API.get(`/courses/${params.id}`, {
    headers: {
      Authorization: `Bearer ${admin.token}`,
    },
  });
  return response.data;
}

import { Link, Outlet, useLocation } from "react-router-dom";

function CourseCategoriesPage() {
  const location = useLocation();

  return (
    <div className="p-6">
      <div className="w-full divide-y divide-gray-900/10">
        <div className="flex justify-between pt-4">
          <h2 className="text-lg font-bold leading-10 tracking-tight text-gray-900">
            Course Categories
          </h2>
          {location.pathname.includes("course-categories/add") ? (
            <Link
              to="/course-categories"
              className="whitespace-nowrap rounded-md px-3 py-2 bg-gray-900 flex items-center justify-center text-sm font-semibold text-white hover:bg-gray-700"
            >
              &larr; Go back
            </Link>
          ) : (
            <Link
              to="add"
              className="whitespace-nowrap rounded-md px-3 py-2 bg-indigo-600 flex items-center justify-center text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Add New Course Category &rarr;
            </Link>
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default CourseCategoriesPage;

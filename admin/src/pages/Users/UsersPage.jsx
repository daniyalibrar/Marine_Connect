import { Link, Outlet, useLocation } from "react-router-dom";

function UsersPage() {
  const location = useLocation();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between pt-4">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-gray-900">
            Users
          </h1>
          <p className="text-sm text-gray-700">
            A list of all the users including their First Name, Last Name,
            Email, Created at, Updated at and Role.
          </p>
        </div>
        <div>
          {location.pathname.includes("add") ||
          location.pathname.includes("edit") ? (
            <Link
              to="/users"
              className="whitespace-nowrap rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
            >
              &larr; Go Back
            </Link>
          ) : (
            <Link
              to="add"
              className="whitespace-nowrap rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Add User &rarr;
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default UsersPage;

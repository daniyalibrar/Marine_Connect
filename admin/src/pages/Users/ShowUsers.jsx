import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api";

function ShowUsers() {
  const { admin } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await API.get("/users", {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      setUsers(result.data.users);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const headers = {
      Authorization: `Bearer ${admin.token}`,
    };
    await API.delete(`/users/${id}`, { headers })
      .then((response) => {
        if (response.status === 200) {
          toast.success("User Deleted Successfully!");
          const updatedUsers = users.filter((user) => user.user_id !== id);
          setUsers(updatedUsers);
        }
      })
      .catch((error) => {
        toast.error("Error Deleting User");
        console.log(error);
      });
  };

  const userRoleColor = (role) => {
    if (role === "student") return "bg-blue-500";
    if (role === "job_seeker") return "bg-green-500";
    if (role === "employer") return "bg-gray-500";
    if (role === "admin") return "bg-red-500";
  };

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-1 py-3 text-center text-sm font-semibold text-gray-900"
                >
                  First Name
                </th>
                <th
                  scope="col"
                  className="px-1 py-3 text-center text-sm font-semibold text-gray-900"
                >
                  Last Name
                </th>
                <th
                  scope="col"
                  className="px-1 py-3 text-center text-sm font-semibold text-gray-900"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-1 py-3 text-center text-sm font-semibold text-gray-900"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-1 py-3 text-center text-sm font-semibold text-gray-900"
                >
                  Created at
                </th>
                <th
                  scope="col"
                  className="px-1 py-3 text-center text-sm font-semibold text-gray-900"
                >
                  Updated at
                </th>
                <th
                  scope="col"
                  className="px-1 py-3 text-center text-sm font-semibold text-gray-900"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.user_id}>
                  <td className="whitespace-nowrap px-1 py-3 text-center text-gray-700">
                    {user.firstName}
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 text-center text-gray-700">
                    {user.lastName}
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 text-center text-gray-700">
                    {user.email}
                  </td>
                  <td className="whitespace-nowrap flex items-center justify-center px-1 py-3 text-sm">
                    <span
                      className={`${userRoleColor(
                        user.role
                      )} text-white rounded-full px-3 py-1`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 text-center text-gray-700">
                    {new Date(user.createdAt).toLocaleDateString()} <br/>
                    {new Date(user.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 text-center text-gray-700">
                    {new Date(user.updatedAt).toLocaleDateString()} <br/>
                    {new Date(user.updatedAt).toLocaleTimeString()}
                  </td>
                  <td className="whitespace-nowrap flex items-center justify-center px-1 py-3 text-sm text-gray-700">
                    <Link
                      to={`${user.user_id}/edit`}
                      className="rounded-md bg-gray-900 px-3 py-1.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
                    >
                      Edit User
                    </Link>
                    <DeleteButton
                      userId={user.user_id}
                      onDelete={(id) => handleDelete(id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShowUsers;

function DeleteButton({ userId, onDelete }) {
  return (
    <button
      onClick={() => onDelete(userId)}
      className="ml-2 rounded-md bg-red-600 px-3 py-1.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500"
    >
      Delete User
    </button>
  );
}

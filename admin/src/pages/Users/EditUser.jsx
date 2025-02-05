import { useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import store from "../../store/store";
import API from "../../api";

function EditUser() {
  const { admin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { user } = useLoaderData();

  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const roleRef = useRef("");

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    const data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      role: roleRef.current.value,
    };
    const headers = {
      Authorization: `Bearer ${admin.token}`,
    };
    await API.put(`/users/${user.user_id}`, data, { headers })
      .then((response) => {
        if (response.status === 201) {
          toast.success("User Updated Successfully!");
          navigate("/users");
        }
      })
      .catch((error) => {
        toast.error("Unable to Update User");
        console.log(error);
      });
  };

  return (
    <div className="mt-10">
      <h3 className="mt-6 text-base/7 font-semibold text-gray-900">
        Edit User
      </h3>
      <p className="mt-1 text-sm/6 text-gray-500">
        Update the form below to edit a user
      </p>
      <p className="mt-1 text-gray-700">
        Email: {user.email}
      </p>
      <div className="mt-2 w-full">
        <form onSubmit={handleUpdateUser} className="space-y-3">
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
                defaultValue={user.firstName}
                ref={firstNameRef}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
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
                defaultValue={user.lastName}
                ref={lastNameRef}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Role
            </label>
            <div className="mt-2">
              <select
                id="role"
                name="role"
                defaultValue={user.role}
                ref={roleRef}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              >
                <option value="student">Student</option>
                <option value="job_seeker">Job Seeker</option>
                <option value="employer">Employer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function userloader({ params }) {
  const { admin } = store.getState().auth;
  const response = await API.get(`/users/${params.id}`, {
    headers: {
      Authorization: `Bearer ${admin.token}`,
    },
  });
  return response.data;
}

export default EditUser;

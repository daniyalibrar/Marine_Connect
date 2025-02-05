import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import API from "../../api";

function AddUser() {
  const { admin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const roleRef = useRef("");

  const handleAddUser = async (event) => {
    event.preventDefault();
    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      const data = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        role: roleRef.current.value,
      };
      const headers = {
        Authorization: `Bearer ${admin.token}`,
      };
      await API.post("/users", data, { headers })
        .then((response) => {
          if (response.status === 201) {
            toast.success("User Created Successfully!");
            navigate("/users");
          }
        })
        .catch((error) => {
          toast.error("Unable to Create a New User");
          console.log(error);
        });
    } else {
      toast.warn("Password and Confirm Password field must have same values");
    }
  };

  return (
    <div className="mt-10">
      <h3 className="mt-6 text-base/7 font-semibold text-gray-900">
        Add a New User
      </h3>
      <p className="mt-1 text-sm/6 text-gray-500">
        Fill the form below to create a new user
      </p>
      <div className="mt-6 w-full">
        <form onSubmit={handleAddUser} className="space-y-3">
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
                ref={lastNameRef}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                ref={emailRef}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                ref={passwordRef}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                ref={confirmPasswordRef}
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
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;

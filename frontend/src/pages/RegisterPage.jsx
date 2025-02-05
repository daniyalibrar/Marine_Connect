import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";
import { Link } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const roleRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      await API.post("/register", {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        role: roleRef.current.value,
      })
        .then((response) => {
          if (response.status === 201) {
            toast.success("Registration successful! Please login!");
            navigate("/login");
          }
        })
        .catch((error) => {
          if (error.status === 409) {
            toast.error("User with this email already exists!");
          }
          toast.error("Something went wrong! Please try again!");
          console.log(error);
        });
    } else {
      toast.warn("Password and Confirm Password field must have same values");
    }
    setLoading(false);
  };

  return (
    <section className="h-screen">
      <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-center font-bold text-3xl">Marine Connect</h1>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create a New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleRegister} className="space-y-3">
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
                    ref={firstNameRef}
                    id="firstName"
                    name="firstName"
                    type="text"
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
                    ref={lastNameRef}
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Account Type
              </label>
              <div className="mt-2">
                <select
                  ref={roleRef}
                  id="role"
                  name="role"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                >
                  <option value="student">Student</option>
                  <option value="job_seeker">Job Seeker</option>
                  <option value="employer">Employer</option>
                </select>
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
                  ref={emailRef}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
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
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type="password"
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
                  ref={confirmPasswordRef}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <input
                value={loading ? "Submitting..." : "Create Account"}
                disabled={loading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed"
              />
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an Account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign in &rarr;
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;

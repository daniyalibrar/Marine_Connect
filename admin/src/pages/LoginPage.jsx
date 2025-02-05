import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdmin } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import API from "../api";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = (event) => {
    event.preventDefault();
    API.post("/login", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })
      .then((response) => {
        if (response.data.role === "admin") {
          toast.success("Login Successful!");
          dispatch(setAdmin(response.data));
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error("403 Forbidden! Please login with admin email & password");
        console.log(error);
      });
  };

  return (
    <section className="h-screen">
      <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-center font-bold text-3xl">
            Marine Connect - Admin
          </h1>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in with your Admin Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-3">
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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;

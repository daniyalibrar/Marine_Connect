import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import API from "../api";
import { Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    await API.post("/login", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Login Successful!");
          dispatch(setUser(response.data));
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.status === 404) {
          toast.error("User with this email does not exists!");
        } else if (error.status === 401) {
          toast.error("Password may be incorrect!");
        } else {
          toast.error("Unable to login! Please try again!");
        }
        console.log(error);
      });
    setLoading(false);
  };

  return (
    <section className="h-screen">
      <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-center font-bold text-3xl">Marine Connect</h1>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
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
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <input
                value={loading ? "Submitting..." : "Login"}
                disabled={loading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed"
              />
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Create a new Account &rarr;
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;

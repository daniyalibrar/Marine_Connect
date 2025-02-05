import { Link } from "react-router-dom";

function Hire() {
  return (
    <section className="bg-white pb-24 sm:pb-32">
      <div className="mx-auto px-6">
        <div className="mx-auto text-center">
          <h2 className="text-base font-semibold leading-8 text-indigo-600">
            Hire Talent
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Looking for a talent to hire?
          </p>
          <p className="mt-2 text-md leading-8 text-gray-600">
            Find the perfect professional for your project among our talented
            community.
          </p>
        </div>
        <div className="flex justify-center items-center mt-6">
          <Link
            to="/hire"
            className="whitespace-nowrap rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Hire a talented professional <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hire;

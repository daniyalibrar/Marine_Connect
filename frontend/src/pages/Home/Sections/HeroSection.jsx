import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="bg-gray-900 h-screen w-full">
      <div className="relative isolate overflow-hidden pt-14 h-full">
        <div className="mx-auto max-w-2xl h-full px-4 lg:px-0 py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
              One stop platform for Maritime Education and Employment.
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Set Sail for a Brighter Future
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Welcome to Marine Connect, your gateway to a thriving maritime
              career. Explore top-notch courses to enhance your skills and
              discover the latest job opportunities in the maritime industry -
              all in one place.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-4">
              <Link
                to="/courses"
                className="whitespace-nowrap rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Explore Courses <span aria-hidden="true">→</span>
              </Link>
              <Link
                to="/jobs"
                className="whitespace-nowrap rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Find Jobs <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

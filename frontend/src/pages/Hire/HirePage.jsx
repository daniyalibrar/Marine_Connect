import {
  ArrowRightEndOnRectangleIcon,
  BriefcaseIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function HirePage() {
  const { user } = useSelector((state) => state.auth);

  const steps = [
    {
      name: "Create Your Employer Profile",
      description:
        "Register on Marine Connect and set up your organization’s profile to showcase your brand and values.",
      icon: ArrowRightEndOnRectangleIcon,
    },
    {
      name: "Post a Job Listing",
      description:
        "Provide details about the role, qualifications, and expectations to attract the right candidates.",
      icon: BriefcaseIcon,
    },
    {
      name: "Connect with Talent",
      description:
        "Review applications, shortlist candidates, and directly connect with maritime professionals.",
      icon: UserGroupIcon,
    },
  ];

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Hire Talent
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Find the Right Crew for Your Maritime Operations
          </p>
          <p className="mt-6 text-base leading-8 text-gray-600">
            Whether you're seeking experienced officers, certified crew members,
            or specialized maritime professionals, our platform is here to
            streamline your hiring process.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {steps.map((step) => (
              <div key={step.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-8 text-gray-900">
                  <step.icon
                    className="h-10 w-10 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {step.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-8 text-gray-600">
                  <p className="flex-auto">{step.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex justify-center items-center mt-6">
          {user?.role === "employer" ? (
            <Link
              to="/employer/jobs/create"
              className="whitespace-nowrap rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Post a Job Now <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="whitespace-nowrap rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Login to create a Job Posting <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default HirePage;

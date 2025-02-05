import { Link, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../../api";

function SingleJob() {
  const { user } = useSelector((state) => state.auth);
  const job = useLoaderData();

  const replaceUnderscoresAndCapitalize = (str) => {
    return str
      .split("_") // Split the string into an array using "_" as the delimiter
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
      .join(" "); // Join the words with a space
  };

  const jobLocationColor = (jobLocation) => {
    if (jobLocation === "onsite") return "bg-blue-200";
    if (jobLocation === "hybrid") return "bg-orange-200";
    if (jobLocation === "remote") return "bg-green-200";
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center my-16 px-4 xl:px-32">
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-12 lg:col-span-8 flex flex-col space-y-4">
            <div className="space-y-4 bg-white shadow-sm border border-gray-200 p-4 rounded-xl">
              <div className="flex relative">
                <span
                  className={`${jobLocationColor(
                    job.jobLocation
                  )} absolute right-0 top-0 px-4 py-1 text-sm rounded-md`}
                >
                  {replaceUnderscoresAndCapitalize(job.jobLocation)}
                </span>
                <span
                  className="bg-gray-200 absolute right-0 bottom-0 px-4 py-1 text-sm rounded-md"
                >
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
                <div className="flex items-center">
                  <img
                    src={job.User.EmployerProfile.logo}
                    alt={job.User.EmployerProfile.name}
                    className="w-[104px] h-[104px] object-cover bg-slate-200 p-0.5 rounded-xl"
                  />
                </div>
                <div className="pl-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{job.title}</h3>
                    <p className="text-sm">{job.User.EmployerProfile.name}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">{`${job.minSalary} - ${job.maxSalary} $/Month`}</p>
                    <p className="text-sm space-x-2">
                      <span className="bg-gray-200 px-2 py-0.5 rounded-md">
                        {replaceUnderscoresAndCapitalize(job.jobType)}
                      </span>
                      <span className="bg-gray-200 px-2 py-0.5 rounded-md">
                        {replaceUnderscoresAndCapitalize(job.jobLevel)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-white shadow-sm border border-gray-200 p-4 rounded-xl">
              <div className="text-xl font-bold">Job Details</div>
              <div
                id="job_details"
                className="space-y-4 text-sm"
                dangerouslySetInnerHTML={{ __html: job.details }}
              ></div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col space-y-4 h-fit sticky top-20">
            <div className="p-4 bg-white shadow-sm border border-gray-200 rounded-xl space-y-4 flex flex-col items-center justify-center">
              {user?.role === "job_seeker" ? (
                <Link
                  to={`/jobs/${job.job_id}/apply`}
                  className="block w-full whitespace-nowrap rounded-full bg-indigo-600 py-3 text-sm text-center font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Apply to this Job &rarr;
                </Link>
              ) : (
                <Link
                  to={`/login`}
                  className="block w-full whitespace-nowrap rounded-full bg-indigo-600 py-3 text-sm text-center font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Login to apply for this Job &rarr;
                </Link>
              )}

              <Link
                to="/jobs"
                className="block w-full whitespace-nowrap rounded-full bg-gray-900 py-3 text-sm text-center font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
              >
                &larr; Go Back
              </Link>
            </div>
            <div className="p-4 bg-white shadow-sm border border-gray-200 rounded-xl space-y-1">
              <div className="flex items-center justify-start">
                <img
                  src={job.User.EmployerProfile.logo}
                  alt={job.User.EmployerProfile.name}
                  className="w-24 h-24 object-cover bg-slate-200 p-0.5 rounded-xl"
                />
              </div>
              <p className="text-sm font-bold">
                {job.User.EmployerProfile.name}
              </p>
              <p className="text-sm">{job.User.EmployerProfile.description}</p>
              <p className="text-sm font-bold">Industry</p>
              <p className="text-sm">{job.User.EmployerProfile.industry}</p>
              <p className="text-sm font-bold">Founded</p>
              <p className="text-sm">{job.User.EmployerProfile.foundedDate}</p>
              <p className="text-sm font-bold">Number of Employees</p>
              <p className="text-sm">
                {job.User.EmployerProfile.numberOfEmployees}
              </p>
              <p className="text-sm font-bold">Country</p>
              <p className="text-sm">{job.User.EmployerProfile.country}</p>
              <p className="text-sm font-bold">State/Province</p>
              <p className="text-sm">{job.User.EmployerProfile.state}</p>
              <p className="text-sm font-bold">City</p>
              <p className="text-sm">{job.User.EmployerProfile.city}</p>
              <p className="text-sm font-bold">Address</p>
              <p className="text-sm">{job.User.EmployerProfile.address}</p>
              <p className="text-sm font-bold">Phone</p>
              <p className="text-sm">{job.User.EmployerProfile.phoneNo}</p>
              <p className="text-sm font-bold">Email</p>
              <p className="text-sm text-blue-600">
                <a href={`mailto:${job.User.EmployerProfile.email}`}>
                  {job.User.EmployerProfile.email}
                </a>
              </p>
              <p className="text-sm font-bold">Website</p>
              <p className="text-sm text-blue-600">
                <a href={job.User.EmployerProfile.website} target="_blank">
                  {job.User.EmployerProfile.website}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleJob;

export async function singleJobLoader({ params }) {
  try {
    const response = await API.get(`/jobs/${params.job_id}`);
    return response.data.job;
  } catch (error) {
    console.log(error);
  }
}

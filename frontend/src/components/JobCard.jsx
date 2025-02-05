import { Link } from "react-router-dom";
import {
  MapPinIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

function JobCard({ job }) {
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
    <div className="p-4 shadow-md bg-white rounded-xl text-wrap">
      <div className="flex justify-between">
        <img
          src={job.User.EmployerProfile.logo}
          alt="job_image"
          className="w-24 h-24 object-cover bg-slate-200 p-0.5 rounded-xl"
        />
        <div
          className={`right-0 top-0 ${jobLocationColor(
            job.jobLocation
          )} px-4 py-1 text-sm rounded-md h-fit`}
        >
          {replaceUnderscoresAndCapitalize(job.jobLocation)}
        </div>
      </div>
      <div className="space-y-4 mt-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold">{job.title}</h3>
          <p className="text-sm text-gray-500">
            {job.User.EmployerProfile.name}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <MapPinIcon className="w-6 h-6 text-slate-500" />
          <span className="text-sm">
            {`${job.User.EmployerProfile.city}, ${job.User.EmployerProfile.state}, ${job.User.EmployerProfile.country}`}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <BriefcaseIcon className="w-6 h-6 text-slate-500" />
          <span className="bg-slate-200 px-2 py-0.5 text-sm rounded-md">
            {replaceUnderscoresAndCapitalize(job.jobLevel)}
          </span>
          <span className="bg-slate-200 px-2 py-0.5 text-sm rounded-md">
            {replaceUnderscoresAndCapitalize(job.jobType)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <CurrencyDollarIcon className="w-6 h-6 text-slate-500" />
          <span className="text-sm font-medium rounded-md">
            {`${job.minSalary} - ${job.maxSalary} $/Month`}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CalendarDaysIcon className="w-6 h-6 text-slate-500" />
            <span className="text-sm text-gray-500">
              {new Date(job.createdAt).toLocaleDateString()}
            </span>
          </div>
          <Link
            to={`/jobs/${job.job_id}`}
            className="whitespace-nowrap rounded-full bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            View Job
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JobCard;

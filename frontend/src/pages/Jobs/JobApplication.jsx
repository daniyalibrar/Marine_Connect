import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api";
import Loader from "../../components/Loader/Loader";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function JobApplication() {
  const { user } = useSelector((state) => state.auth);
  const { job_id } = useParams();
  const navigate = useNavigate();
  const [jobLoading, setJobLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      setJobLoading(true);
      try {
        const response = await API.get(`/jobs/${job_id}`);
        setJob(response.data.job);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch job details. Please try again later.");
      } finally {
        setJobLoading(false);
      }
    };

    fetchJob();
  }, [job_id]);

  const handleJobApplication = async (event) => {
    event.preventDefault();
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${user.token}`,
    };
    await API.post(
      "/job-seeker/apply",
      {
        user_id: user.user_id,
        job_id: job.job_id,
      },
      { headers }
    )
      .then((response) => {
        if (response.status === 201) {
          toast.success("Successfully applied to Job!");
          navigate("/job-seeker/applications");
        }
      })
      .catch((error) => {
        if (error.status === 409) {
          toast.warn("You have already applied to this job");
        } else {
          toast.error("Something went wrong! Please try again!");
          console.log(error);
        }
      });
    setLoading(false);
  };

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
    <section className="min-h-screen py-20">
      <div className="flex justify-center px-4">
        <div className="w-[448px] space-y-4">
          <h1 className="text-center font-bold text-indigo-600 text-3xl">
            Apply to Job
          </h1>

          {jobLoading ? (
            <Loader />
          ) : job ? (
            <>
              <div className="bg-white shadow-sm border border-gray-200 p-4 rounded-xl">
                <div className="flex relative">
                  <span
                    className={`${jobLocationColor(
                      job.jobLocation
                    )} absolute right-0 top-0 px-2 py-0.5 text-sm rounded-md`}
                  >
                    {replaceUnderscoresAndCapitalize(job.jobLocation)}
                  </span>
                  <span className="bg-gray-200 absolute right-0 bottom-0 px-2 py-0.5 text-sm rounded-md">
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
              <div className="bg-white shadow-sm border border-gray-200 p-4 rounded-xl">
                <form onSubmit={handleJobApplication} className="space-y-4">
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
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={user.firstName}
                          disabled={true}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 disabled:bg-indigo-50 disabled:cursor-not-allowed"
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
                          value={user.lastName}
                          disabled={true}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 disabled:bg-indigo-50 disabled:cursor-not-allowed"
                        />
                      </div>
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
                        id="email"
                        name="email"
                        type="email"
                        value={user.email}
                        disabled={true}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 disabled:bg-indigo-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                  {/* Job Details */}
                  <Disclosure
                    as="div"
                    defaultOpen={false}
                    className="border bg-gray-100 border-gray-200 px-2 rounded-md"
                  >
                    {({ open }) => (
                      <fieldset>
                        <legend className="w-full">
                          <DisclosureButton className="flex w-full items-center justify-between py-2 text-gray-400 hover:text-gray-500">
                            <span className="text-sm font-medium text-gray-900">
                              Job Details
                            </span>
                            <span className="ml-6 flex h-7 items-center">
                              <ChevronDownIcon
                                className={`${
                                  open ? "-rotate-180" : "rotate-0"
                                } h-5 w-5 transform`}
                                aria-hidden="true"
                              />
                            </span>
                          </DisclosureButton>
                        </legend>
                        <DisclosurePanel className="pb-2 pt-4">
                          <div
                            id="job_details"
                            className="space-y-4 text-sm"
                            dangerouslySetInnerHTML={{ __html: job.details }}
                          ></div>
                        </DisclosurePanel>
                      </fieldset>
                    )}
                  </Disclosure>
                  <div className="flex flex-col justify-center items-center space-y-4">
                    <input
                      value={loading ? "Submitting..." : "Apply"}
                      disabled={loading}
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:bg-indigo-300 disabled:cursor-not-allowed"
                    />
                    <Link
                      to={`/jobs/${job.job_id}`}
                      className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-800"
                    >
                      &larr; Go back
                    </Link>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <p className="p-4 text-center text-gray-500">
              Job details not found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default JobApplication;

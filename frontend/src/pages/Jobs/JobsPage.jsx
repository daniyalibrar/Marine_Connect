import { useState, useEffect } from "react";
import JobCard from "../../components/JobCard";
import API from "../../api";

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid";

function JobsPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [salary, setSalary] = useState({
    minSalary: "",
    maxSalary: "",
  });

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const result = await API.get("/jobs");
      setJobs(result.data.jobs);
    };

    fetchJobs();
  }, []);

  // Handle Job level selection
  const handleJobLevelChange = (event) => {
    const { value, checked } = event.target;
    setSelectedLevels((prev) =>
      checked ? [...prev, value] : prev.filter((level) => level !== value)
    );
  };

  // Handle Job Location selection
  const handleJobLocationChange = (event) => {
    const { value, checked } = event.target;
    setSelectedLocations((prev) =>
      checked ? [...prev, value] : prev.filter((level) => level !== value)
    );
  };

  // Handle Job Type selection
  const handleJobTypeChange = (event) => {
    const { value, checked } = event.target;
    setSelectedTypes((prev) =>
      checked ? [...prev, value] : prev.filter((level) => level !== value)
    );
  };

  // Handle Job Salary change
  const handleJobSalaryChange = (e) => {
    const { name, value } = e.target;
    setSalary((prev) => ({ ...prev, [name]: value }));
  };

  // Filter Jobs based on applied filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesLevels =
      selectedLevels.length === 0 || selectedLevels.includes(job.jobLevel);

    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.jobLocation);

    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(job.jobType);

    const matchesSalary =
      (!salary.minSalary || job.minSalary >= Number(salary.minSalary)) &&
      (!salary.maxSalary || job.maxSalary <= Number(salary.maxSalary));

    return (
      matchesSearch &&
      matchesLevels &&
      matchesLocation &&
      matchesType &&
      matchesSalary
    );
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLevels([]);
    setSelectedLocations([]);
    setSelectedTypes([]);
    setSalary({
      minSalary: "",
      maxSalary: "",
    });
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <>
      {/* Mobile filter dialog */}
      <Transition show={mobileFiltersOpen}>
        <Dialog
          className="relative z-50 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <TransitionChild
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 z-40 flex">
            <TransitionChild
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white p-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Job Filters
                  </h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                {/* Filters */}
                <form>
                  {/* Job Title */}
                  <div className="border-b border-gray-200 py-4">
                    <p className="text-sm font-medium text-gray-900 mb-4">
                      Job Title
                    </p>
                    <input
                      type="text"
                      placeholder="Search Jobs by job title..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                  </div>

                  {/* Job Level */}
                  <Disclosure
                    as="div"
                    defaultOpen={true}
                    className="border-b border-gray-200 py-4"
                  >
                    {({ open }) => (
                      <fieldset>
                        <legend className="w-full">
                          <DisclosureButton className="flex w-full items-center justify-between py-2 text-gray-400 hover:text-gray-500">
                            <span className="text-sm font-medium text-gray-900">
                              Job Level
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
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                value="training"
                                onChange={handleJobLevelChange}
                                checked={selectedLevels.includes("training")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 text-sm text-gray-700">
                                Training
                              </label>
                            </div>

                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                value="entry_level"
                                onChange={handleJobLevelChange}
                                checked={selectedLevels.includes("entry_level")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 text-sm text-gray-700">
                                Entry Level
                              </label>
                            </div>

                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                value="junior"
                                onChange={handleJobLevelChange}
                                checked={selectedLevels.includes("junior")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 text-sm text-gray-700">
                                Junior Level
                              </label>
                            </div>

                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                value="middle"
                                onChange={handleJobLevelChange}
                                checked={selectedLevels.includes("middle")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 text-sm text-gray-700">
                                Mid Level
                              </label>
                            </div>

                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                value="senior"
                                onChange={handleJobLevelChange}
                                checked={selectedLevels.includes("senior")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 text-sm text-gray-700">
                                Senior Level
                              </label>
                            </div>

                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                value="team_lead"
                                onChange={handleJobLevelChange}
                                checked={selectedLevels.includes("team_lead")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 text-sm text-gray-700">
                                Team Lead
                              </label>
                            </div>

                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                value="manager"
                                onChange={handleJobLevelChange}
                                checked={selectedLevels.includes("manager")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 text-sm text-gray-700">
                                Manager/Management
                              </label>
                            </div>

                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                value="leadership"
                                onChange={handleJobLevelChange}
                                checked={selectedLevels.includes("leadership")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 text-sm text-gray-700">
                                Leadership/Director/CEO Roles
                              </label>
                            </div>
                          </div>
                        </DisclosurePanel>
                      </fieldset>
                    )}
                  </Disclosure>

                  {/* Job Location */}
                  <Disclosure
                    as="div"
                    defaultOpen={true}
                    className="border-b border-gray-200 py-4"
                  >
                    {({ open }) => (
                      <fieldset>
                        <legend className="w-full">
                          <DisclosureButton className="flex w-full items-center justify-between py-2 text-gray-400 hover:text-gray-500">
                            <span className="text-sm font-medium text-gray-900">
                              Job Location
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
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                value="onsite"
                                onChange={handleJobLocationChange}
                                checked={selectedLocations.includes("onsite")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 text-sm text-gray-700">
                                On-site
                              </label>
                            </div>

                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                value="hybrid"
                                onChange={handleJobLocationChange}
                                checked={selectedLocations.includes("hybrid")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 text-sm text-gray-700">
                                Hybrid
                              </label>
                            </div>

                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                value="remote"
                                onChange={handleJobLocationChange}
                                checked={selectedLocations.includes("remote")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 text-sm text-gray-700">
                                Remote
                              </label>
                            </div>
                          </div>
                        </DisclosurePanel>
                      </fieldset>
                    )}
                  </Disclosure>

                  {/* Job Type */}
                  <Disclosure
                    as="div"
                    defaultOpen={true}
                    className="border-b border-gray-200 py-4"
                  >
                    {({ open }) => (
                      <fieldset>
                        <legend className="w-full">
                          <DisclosureButton className="flex w-full items-center justify-between py-2 text-gray-400 hover:text-gray-500">
                            <span className="text-sm font-medium text-gray-900">
                              Job Type
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
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                value="full_time"
                                onChange={handleJobTypeChange}
                                checked={selectedTypes.includes("full_time")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 text-sm text-gray-700">
                                Full Time
                              </label>
                            </div>

                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                value="part_time"
                                onChange={handleJobTypeChange}
                                checked={selectedTypes.includes("part_time")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 text-sm text-gray-700">
                                Part Time
                              </label>
                            </div>

                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                value="contract"
                                onChange={handleJobTypeChange}
                                checked={selectedTypes.includes("contract")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 text-sm text-gray-700">
                                Contract
                              </label>
                            </div>

                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                value="internship"
                                onChange={handleJobTypeChange}
                                checked={selectedTypes.includes("internship")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 text-sm text-gray-700">
                                Internship
                              </label>
                            </div>
                          </div>
                        </DisclosurePanel>
                      </fieldset>
                    )}
                  </Disclosure>

                  {/* Job Salary */}
                  <Disclosure
                    as="div"
                    defaultOpen={true}
                    className="border-b border-gray-200 py-4"
                  >
                    {({ open }) => (
                      <fieldset>
                        <legend className="w-full">
                          <DisclosureButton className="flex w-full items-center justify-between py-2 text-gray-400 hover:text-gray-500">
                            <span className="text-sm font-medium text-gray-900">
                              Job Salary {"($)"}
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
                          <div className="space-y-2">
                            <div className="space-y-2">
                              <label className="text-sm text-gray-700">
                                Min
                              </label>
                              <input
                                type="number"
                                name="minSalary"
                                value={salary.minSalary}
                                placeholder="Minimum Salary ($)"
                                onChange={handleJobSalaryChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm text-gray-700">
                                Max
                              </label>
                              <input
                                type="number"
                                name="maxSalary"
                                value={salary.maxSalary}
                                placeholder="Maximum Salary ($)"
                                onChange={handleJobSalaryChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                              />
                            </div>
                          </div>
                        </DisclosurePanel>
                      </fieldset>
                    )}
                  </Disclosure>
                </form>
                <div className="flex items-center justify-center">
                  <button
                    onClick={resetFilters}
                    className="whitespace-nowrap rounded-full bg-indigo-600 mt-4 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Reset Filters
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
      <section className="mx-auto px-6 py-24">
        <div className="border-b border-gray-200 pb-4 flex flex-col justify-center items-start lg:items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Browse Jobs
          </h1>
          <p className="mt-4 text-base text-gray-500">
            Find jobs matching your skills set.
          </p>
        </div>

        <div className="pt-6 flex flex-col lg:flex-row">
          <div className="w-64">
            <button
              type="button"
              className="inline-flex items-center lg:hidden px-4 py-2 rounded-md border border-gray-500 hover:bg-gray-200"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="text-sm font-medium text-gray-700">
                Job Filters
              </span>
              <FunnelIcon
                className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
            </button>

            <div className="hidden lg:block">
              <h3 className="text-base font-semibold leading-8">Job Filters</h3>
              {/* Filters */}
              <form>
                {/* Job Title */}
                <div className="border-b border-gray-200 py-4">
                  <p className="text-sm font-medium text-gray-900 mb-4">
                    Job Title
                  </p>
                  <input
                    type="text"
                    placeholder="Search Jobs by job title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>

                {/* Job Level */}
                <Disclosure
                  as="div"
                  defaultOpen={true}
                  className="border-b border-gray-200 py-4"
                >
                  {({ open }) => (
                    <fieldset>
                      <legend className="w-full">
                        <DisclosureButton className="flex w-full items-center justify-between py-2 text-gray-400 hover:text-gray-500">
                          <span className="text-sm font-medium text-gray-900">
                            Job Level
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
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              value="training"
                              onChange={handleJobLevelChange}
                              checked={selectedLevels.includes("training")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-sm text-gray-700">
                              Training
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              value="entry_level"
                              onChange={handleJobLevelChange}
                              checked={selectedLevels.includes("entry_level")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-sm text-gray-700">
                              Entry Level
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              value="junior"
                              onChange={handleJobLevelChange}
                              checked={selectedLevels.includes("junior")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-sm text-gray-700">
                              Junior Level
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              value="middle"
                              onChange={handleJobLevelChange}
                              checked={selectedLevels.includes("middle")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-sm text-gray-700">
                              Mid Level
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              value="senior"
                              onChange={handleJobLevelChange}
                              checked={selectedLevels.includes("senior")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-sm text-gray-700">
                              Senior Level
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              value="team_lead"
                              onChange={handleJobLevelChange}
                              checked={selectedLevels.includes("team_lead")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-sm text-gray-700">
                              Team Lead
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              value="manager"
                              onChange={handleJobLevelChange}
                              checked={selectedLevels.includes("manager")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-sm text-gray-700">
                              Manager/Management
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              value="leadership"
                              onChange={handleJobLevelChange}
                              checked={selectedLevels.includes("leadership")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-sm text-gray-700">
                              Leadership/Director/CEO Roles
                            </label>
                          </div>
                        </div>
                      </DisclosurePanel>
                    </fieldset>
                  )}
                </Disclosure>

                {/* Job Location */}
                <Disclosure
                  as="div"
                  defaultOpen={true}
                  className="border-b border-gray-200 py-4"
                >
                  {({ open }) => (
                    <fieldset>
                      <legend className="w-full">
                        <DisclosureButton className="flex w-full items-center justify-between py-2 text-gray-400 hover:text-gray-500">
                          <span className="text-sm font-medium text-gray-900">
                            Job Location
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
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              value="onsite"
                              onChange={handleJobLocationChange}
                              checked={selectedLocations.includes("onsite")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-sm text-gray-700">
                              On-site
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              value="hybrid"
                              onChange={handleJobLocationChange}
                              checked={selectedLocations.includes("hybrid")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-sm text-gray-700">
                              Hybrid
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              value="remote"
                              onChange={handleJobLocationChange}
                              checked={selectedLocations.includes("remote")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-sm text-gray-700">
                              Remote
                            </label>
                          </div>
                        </div>
                      </DisclosurePanel>
                    </fieldset>
                  )}
                </Disclosure>

                {/* Job Type */}
                <Disclosure
                  as="div"
                  defaultOpen={true}
                  className="border-b border-gray-200 py-4"
                >
                  {({ open }) => (
                    <fieldset>
                      <legend className="w-full">
                        <DisclosureButton className="flex w-full items-center justify-between py-2 text-gray-400 hover:text-gray-500">
                          <span className="text-sm font-medium text-gray-900">
                            Job Type
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
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              value="full_time"
                              onChange={handleJobTypeChange}
                              checked={selectedTypes.includes("full_time")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-sm text-gray-700">
                              Full Time
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              value="part_time"
                              onChange={handleJobTypeChange}
                              checked={selectedTypes.includes("part_time")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-sm text-gray-700">
                              Part Time
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              value="contract"
                              onChange={handleJobTypeChange}
                              checked={selectedTypes.includes("contract")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-sm text-gray-700">
                              Contract
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              value="internship"
                              onChange={handleJobTypeChange}
                              checked={selectedTypes.includes("internship")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-sm text-gray-700">
                              Internship
                            </label>
                          </div>
                        </div>
                      </DisclosurePanel>
                    </fieldset>
                  )}
                </Disclosure>

                {/* Job Salary */}
                <Disclosure
                  as="div"
                  defaultOpen={true}
                  className="border-b border-gray-200 py-4"
                >
                  {({ open }) => (
                    <fieldset>
                      <legend className="w-full">
                        <DisclosureButton className="flex w-full items-center justify-between py-2 text-gray-400 hover:text-gray-500">
                          <span className="text-sm font-medium text-gray-900">
                            Job Salary {"($)"}
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
                        <div className="space-y-2">
                          <div className="space-y-2">
                            <label className="text-sm text-gray-700">Min</label>
                            <input
                              type="number"
                              name="minSalary"
                              value={salary.minSalary}
                              placeholder="Minimum Salary ($)"
                              onChange={handleJobSalaryChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-700">Max</label>
                            <input
                              type="number"
                              name="maxSalary"
                              value={salary.maxSalary}
                              placeholder="Maximum Salary ($)"
                              onChange={handleJobSalaryChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                      </DisclosurePanel>
                    </fieldset>
                  )}
                </Disclosure>
              </form>
              <div className="flex items-center justify-center">
                <button
                  onClick={resetFilters}
                  className="whitespace-nowrap rounded-full bg-indigo-600 mt-4 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="py-4 lg:pl-4 flex-1">
            <div className="w-full mx-auto">
              <div className="grid grid-cols-[repeat(auto-fill,minmax(348px,1fr))] gap-4">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <JobCard key={job.job_id} job={job} />
                  ))
                ) : (
                  <p className="col-span-full text-center">No Jobs Found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default JobsPage;

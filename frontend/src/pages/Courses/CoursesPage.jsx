import { useState, useEffect } from "react";
import CourseCard from "../../components/CourseCard";
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

function CoursesPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [duration, setDuration] = useState({
    minDuration: "",
    maxDuration: "",
  });

  const [courses, setCourses] = useState([]);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await API.get("/courses");
      setCourses(result.data.courses);
    };
    const fetchCourseCategories = async () => {
      const result = await API.get("/courses/course-categories");
      setCourseCategories(result.data.courseCategories);
    };

    fetchCourses();
    fetchCourseCategories();
  }, []);

  // Handle level selection
  const handleLevelChange = (event) => {
    const { value, checked } = event.target;
    setSelectedLevels((prev) =>
      checked ? [...prev, value] : prev.filter((level) => level !== value)
    );
  };

  // Handle category selection
  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prev) =>
      checked
        ? [...prev, Number(value)]
        : prev.filter((category) => category !== Number(value))
    );
  };

  // Handle Duration change
  const handleDurationChange = (e) => {
    const { name, value } = e.target;
    setDuration((prev) => ({ ...prev, [name]: value }));
  };

  // Filter courses based on search term and selected duration
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLevels =
      selectedLevels.length === 0 || selectedLevels.includes(course.level);
    const matchesCategories =
      selectedCategories.length === 0 ||
      selectedCategories.includes(course.category_id);
    const matchesDuration =
      (!duration.minDuration ||
        course.durationHours >= Number(duration.minDuration)) &&
      (!duration.maxDuration ||
        course.durationHours <= Number(duration.maxDuration));

    return (
      matchesSearch && matchesLevels && matchesCategories && matchesDuration
    );
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLevels([]);
    setSelectedCategories([]);
    setDuration({
      minDuration: "",
      maxDuration: "",
    });
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
                    Course Filters
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
                  {/* Search Bar */}
                  <div className="border-b border-gray-200 py-4">
                    <p className="text-sm font-medium text-gray-900 mb-4">
                      Title
                    </p>
                    <input
                      type="text"
                      placeholder="Search courses by title..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                  </div>

                  {/* Level */}
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
                              Level
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
                                value="Beginner"
                                onChange={handleLevelChange}
                                checked={selectedLevels.includes("Beginner")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="level"
                                className="ml-3 text-sm text-gray-700"
                              >
                                Beginner
                              </label>
                            </div>

                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                value="Intermediate"
                                onChange={handleLevelChange}
                                checked={selectedLevels.includes(
                                  "Intermediate"
                                )}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="level"
                                className="ml-3 text-sm text-gray-700"
                              >
                                Intermediate
                              </label>
                            </div>

                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                value="Advanced"
                                onChange={handleLevelChange}
                                checked={selectedLevels.includes("Advanced")}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="level"
                                className="ml-3 text-sm text-gray-700"
                              >
                                Advanced
                              </label>
                            </div>
                          </div>
                        </DisclosurePanel>
                      </fieldset>
                    )}
                  </Disclosure>

                  {/* Category */}
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
                              Category
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
                            {courseCategories.map((category) => (
                              <div
                                key={category.category_id}
                                className="flex items-center"
                              >
                                <input
                                  type="checkbox"
                                  value={category.category_id}
                                  onChange={handleCategoryChange}
                                  checked={selectedCategories.includes(
                                    category.category_id
                                  )}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor="level"
                                  className="ml-3 text-sm text-gray-700"
                                >
                                  {category.categoryName}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </fieldset>
                    )}
                  </Disclosure>

                  {/* Duration */}
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
                              Duration {"(Hours)"}
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
                              <label
                                htmlFor="level"
                                className="text-sm text-gray-700"
                              >
                                Min
                              </label>
                              <input
                                type="number"
                                name="minDuration"
                                value={duration.minDuration}
                                placeholder="Minimum Duration (hours)"
                                onChange={handleDurationChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                              />
                            </div>
                            <div className="space-y-2">
                              <label
                                htmlFor="level"
                                className="text-sm text-gray-700"
                              >
                                Max
                              </label>
                              <input
                                type="number"
                                name="maxDuration"
                                value={duration.maxDuration}
                                placeholder="Maximum Duration (hours)"
                                onChange={handleDurationChange}
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
            Explore Courses
          </h1>
          <p className="mt-4 text-base text-gray-500">
            Explore from the wide range of courses offered.
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
                Course Filters
              </span>
              <FunnelIcon
                className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
            </button>

            <div className="hidden lg:block">
              <h3 className="text-base font-semibold leading-8">
                Course Filters
              </h3>
              {/* Filters */}
              <form>
                {/* Search Bar */}
                <div className="border-b border-gray-200 py-4">
                  <p className="text-sm font-medium text-gray-900 mb-4">
                    Title
                  </p>
                  <input
                    type="text"
                    placeholder="Search courses by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>

                {/* Level */}
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
                            Level
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
                              value="Beginner"
                              onChange={handleLevelChange}
                              checked={selectedLevels.includes("Beginner")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="level"
                              className="ml-3 text-sm text-gray-700"
                            >
                              Beginner
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              value="Intermediate"
                              onChange={handleLevelChange}
                              checked={selectedLevels.includes("Intermediate")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="level"
                              className="ml-3 text-sm text-gray-700"
                            >
                              Intermediate
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              value="Advanced"
                              onChange={handleLevelChange}
                              checked={selectedLevels.includes("Advanced")}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="level"
                              className="ml-3 text-sm text-gray-700"
                            >
                              Advanced
                            </label>
                          </div>
                        </div>
                      </DisclosurePanel>
                    </fieldset>
                  )}
                </Disclosure>

                {/* Category */}
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
                            Category
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
                          {courseCategories.map((category) => (
                            <div
                              key={category.category_id}
                              className="flex items-center"
                            >
                              <input
                                type="checkbox"
                                value={category.category_id}
                                onChange={handleCategoryChange}
                                checked={selectedCategories.includes(
                                  category.category_id
                                )}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="level"
                                className="ml-3 text-sm text-gray-700"
                              >
                                {category.categoryName}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </fieldset>
                  )}
                </Disclosure>

                {/* Duration */}
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
                            Duration {"(Hours)"}
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
                            <label
                              htmlFor="level"
                              className="text-sm text-gray-700"
                            >
                              Min
                            </label>
                            <input
                              type="number"
                              name="minDuration"
                              value={duration.minDuration}
                              placeholder="Minimum Duration (hours)"
                              onChange={handleDurationChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="level"
                              className="text-sm text-gray-700"
                            >
                              Max
                            </label>
                            <input
                              type="number"
                              name="maxDuration"
                              value={duration.maxDuration}
                              placeholder="Maximum Duration (hours)"
                              onChange={handleDurationChange}
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
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <CourseCard
                      key={course.course_id}
                      id={course.course_id}
                      title={course.title}
                      image={course.image}
                      shortDescription={course.shortDescription}
                      level={course.level}
                      durationHours={course.durationHours}
                    />
                  ))
                ) : (
                  <p className="col-span-full text-center">No courses found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CoursesPage;

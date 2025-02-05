import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../api";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

function ShowCategories() {
  const { admin } = useSelector((state) => state.auth);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const fetchCourseCategories = async () => {
      const result = await API.get("/course-categories", {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      setCourseCategories(result.data.courseCategories);
    };

    fetchCourseCategories();
  }, []);

  return (
    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
      {courseCategories.map((category) => (
        <Disclosure as="div" key={category.category_id} className="pt-6">
          {({ open }) => (
            <>
              <dt>
                <DisclosureButton className="flex w-full items-start justify-between text-left text-gray-900">
                  <span className="text-base font-semibold leading-7">
                    {category.categoryName}
                  </span>
                  <span className="ml-6 flex h-7 items-center">
                    {open ? (
                      <MinusIcon className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </span>
                </DisclosureButton>
              </dt>
              <DisclosurePanel as="dd" className="mt-2 pr-12">
                <p className="text-base leading-7 text-gray-600">
                  {category.categoryDescription}
                </p>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </dl>
  );
}

export default ShowCategories;

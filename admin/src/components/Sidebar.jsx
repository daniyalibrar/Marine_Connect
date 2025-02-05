import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  BookOpenIcon,
  HomeIcon,
  UserGroupIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

import { NavLink } from "react-router-dom";

function Sidebar({ onClose }) {
  const navigation = [
    { name: "Home", to: "/", icon: HomeIcon },
    {
      name: "Manage Courses",
      icon: BookOpenIcon,
      children: [
        { name: "Course Categories", to: "/course-categories" },
        { name: "Courses", to: "/courses" },
        { name: "Course Applications", to: "/course-applications" },
      ],
    },
    { name: "Manage Users", to: "/users", icon: UserGroupIcon },
    { name: "Manage Jobs", to: "/jobs", icon: BriefcaseIcon },
  ];

  const linkClassesOne = ({ isActive }) =>
    isActive
      ? "bg-gray-200 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700"
      : "hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700";

  const linkClassesTwo = ({ isActive }) =>
    isActive
      ? "bg-gray-200 block rounded-md py-2 pr-2 pl-12 text-sm leading-6 text-gray-700"
      : "hover:bg-gray-50 block rounded-md py-2 pr-2 pl-12 text-sm leading-6 text-gray-700";

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
      <div className="flex h-16 items-center border-b border-b-gray-200">
        <h1 className="text-xl">Marine Connect - Admin</h1>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  {!item.children ? (
                    <NavLink
                      to={item.to}
                      className={linkClassesOne}
                      onClick={onClose}
                    >
                      <item.icon
                        className="h-6 w-6 shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </NavLink>
                  ) : (
                    <Disclosure as="div" defaultOpen={true}>
                      {({ open }) => (
                        <>
                          <DisclosureButton className="hover:bg-gray-50 flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700">
                            <item.icon
                              className="h-6 w-6 shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            {item.name}
                            <ChevronRightIcon
                              className={`${
                                open
                                  ? "rotate-90 text-gray-500"
                                  : "text-gray-400"
                              } ml-auto h-5 w-5 shrink-0`}
                              aria-hidden="true"
                            />
                          </DisclosureButton>
                          <DisclosurePanel
                            as="ul"
                            className="mt-1 px-2 space-y-1"
                          >
                            {item.children.map((subItem) => (
                              <li key={subItem.name}>
                                {/* 44px */}
                                <NavLink
                                  to={subItem.to}
                                  className={linkClassesTwo}
                                  onClick={onClose}
                                >
                                  {subItem.name}
                                </NavLink>
                              </li>
                            ))}
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  )}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Sidebar;

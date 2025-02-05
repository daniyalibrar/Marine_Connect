import {
  BookOpenIcon,
  HomeIcon,
  UserIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

import { NavLink } from "react-router-dom";

function Sidebar({ onClose }) {
  const navigation = [
    { name: "Dashboard", to: "/student", icon: HomeIcon },
    { name: "Profile", to: "/student/profile", icon: UserIcon },
    { name: "My Courses", to: "/student/enrollments", icon: BookOpenIcon },
    {
      name: "Course Applications",
      to: "/student/applications",
      icon: DocumentTextIcon,
    },
  ];

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-4">
      <div className="flex h-16 items-center border-b border-b-gray-200">
        <h1 className="text-lg">Student Dashboard</h1>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.to}
                    className="hover:bg-gray-200 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700"
                    onClick={onClose}
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
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

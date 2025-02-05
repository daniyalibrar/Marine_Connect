import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import profilePic from "../assets/profile.png";

function NavDropdown() {
  const { user } = useSelector((state) => state.auth);

  if (user.role === "student") {
    return <StudentDropdown user={user} />;
  }
  if (user.role === "job_seeker") {
    return <JobSeekerDropdown user={user} />;
  }
  if (user.role === "employer") {
    return <EmployerDropdown user={user} />;
  }
}

export default NavDropdown;

function StudentDropdown({ user }) {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <img
            alt="profile_image"
            src={user?.profilePicture ? user.profilePicture : profilePic}
            className="size-8 rounded-full object-cover"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <div className="flex items-center justify-end">
            <p className="text-sm w-fit px-2 py-0.5 shadow-sm shadow-gray-500 hover:bg-blue-500 rounded-s-full bg-blue-600 text-white">
              Student
            </p>
          </div>
          <p className="px-4 text-sm font-semibold text-gray-500">
            {user.firstName}
          </p>
        </div>
        <div className="py-1">
          <MenuItem>
            <Link
              to="/student"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            >
              Dashboard
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/student/profile"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            >
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/student/enrollments"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            >
              My Courses
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/student/applications"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            >
              Course Applications
            </Link>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            <Link
              to="/logout"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-red-400 data-[focus]:text-white data-[focus]:outline-none"
            >
              Logout
            </Link>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}

function JobSeekerDropdown({ user }) {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <img
            alt="profile_image"
            src={user?.profilePicture ? user.profilePicture : profilePic}
            className="size-8 rounded-full object-cover"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <div className="flex items-center justify-end">
            <p className="text-sm w-fit px-2 py-0.5 shadow-sm shadow-gray-500 hover:bg-green-500 rounded-s-full bg-green-600 text-white">
              Job Seeker
            </p>
          </div>
          <p className="px-4 text-sm font-semibold text-gray-500">
            {user.firstName}
          </p>
        </div>
        <div className="py-1">
          <MenuItem>
            <Link
              to="/job-seeker"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            >
              Dashboard
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/job-seeker/profile"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            >
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/job-seeker/applications"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            >
              Job Applications
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/job-seeker/resume"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            >
              Resume
            </Link>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            <Link
              to="/logout"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-red-400 data-[focus]:text-white data-[focus]:outline-none"
            >
              Logout
            </Link>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}

function EmployerDropdown({ user }) {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <img
            alt="profile_image"
            src={user?.profilePicture ? user.profilePicture : profilePic}
            className="size-8 rounded-full object-cover"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <div className="flex items-center justify-end">
            <p className="text-sm w-fit px-2 py-0.5 shadow-sm shadow-gray-500 hover:bg-gray-600 rounded-s-full bg-gray-700 text-white">
              Employer
            </p>
          </div>
          <p className="px-4 text-sm font-semibold text-gray-500">
            {user.firstName}
          </p>
        </div>
        <div className="py-1">
          <MenuItem>
            <Link
              to="/employer"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            >
              Dashboard
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/employer/profile"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            >
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/employer/jobs"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            >
              Job Listings
            </Link>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            <Link
              to="/logout"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-red-400 data-[focus]:text-white data-[focus]:outline-none"
            >
              Logout
            </Link>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import { useSelector } from "react-redux";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const navigation = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about" },
    { name: "Courses", to: "/courses" },
    { name: "Jobs", to: "/jobs" },
    { name: "Hire", to: "/hire" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const desktopLinkClasses = ({ isActive }) =>
    isActive
      ? "text-sm font-semibold text-indigo-600 bg-white px-4 py-1 rounded-full"
      : "text-sm font-semibold text-white";

  const mobileLinkClasses = ({ isActive }) =>
    isActive
      ? "-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-white bg-gray-900"
      : "-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-white hover:bg-gray-600";

  return (
    <>
      <Transition show={mobileMenuOpen}>
        <Dialog
          className="relative z-50 lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
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
              <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-gray-900 backdrop-blur-lg bg-opacity-50 p-6 pt-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <Link to="/" className="text-lg text-white font-bold">
                    Marine Connect
                  </Link>
                  <button
                    type="button"
                    className="rounded-md text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-4 flow-root">
                  <div className="-my-6 divide-y divide-gray-300">
                    <div className="space-y-2 py-6">
                      {navigation.map((item) => (
                        <NavLink
                          onClick={() => setMobileMenuOpen(false)}
                          key={item.name}
                          to={item.to}
                          className={mobileLinkClasses}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                    {!user && (
                      <div className="py-6">
                        <Link
                          onClick={() => setMobileMenuOpen(false)}
                          to="/login"
                          className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-white hover:bg-gray-600"
                        >
                          Log in
                        </Link>
                        <Link
                          onClick={() => setMobileMenuOpen(false)}
                          to="/register"
                          className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-white hover:bg-gray-600"
                        >
                          Register
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
      <header className="fixed inset-x-0 top-0 z-50 bg-gray-900 backdrop-blur-lg bg-opacity-50">
        <nav
          className="flex items-center justify-between p-4 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 items-center">
            <Link to="/" className="text-lg text-white font-bold">
              Marine Connect
            </Link>
          </div>
          <div className="flex lg:hidden">
            {user && (
              <div className="mr-4">
                <NavDropdown />
              </div>
            )}
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-2 items-center">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="w-24 flex items-center justify-center"
              >
                <NavLink to={item.to} className={desktopLinkClasses}>
                  {item.name}
                </NavLink>
              </div>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Login <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                  to="/register"
                  className="ml-2 rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Register <span aria-hidden="true">&rarr;</span>
                </Link>
              </>
            ) : (
              <NavDropdown />
            )}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;

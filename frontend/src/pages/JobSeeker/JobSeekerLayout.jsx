import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import JobSeekerSidebar from "./JobSeekerSidebar";
import { Outlet } from "react-router-dom";

function JobSeekerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Sidebar for tablet and mobile */}
      <Transition show={sidebarOpen}>
        <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <TransitionChild
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                <TransitionChild
                  enter="transition-opacity ease-linear duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </TransitionChild>
                <JobSeekerSidebar onClose={() => setSidebarOpen(false)} />
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
      {!sidebarOpen && (
        <div className="absolute z-50 top-[16px] right-28 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex justify-center items-center rounded-full bg-indigo-600 p-1 shadow-sm shadow-gray-500 hover:bg-indigo-500"
          >
            <Bars3Icon className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
      <section className="min-h-screen mt-16 flex flex-row">
        <div className="hidden lg:flex lg:w-72">
          <JobSeekerSidebar />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </section>
    </>
  );
}
export default JobSeekerLayout;

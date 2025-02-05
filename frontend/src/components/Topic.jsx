import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import TopicViewer from "./TopicViewer";

function Topic({ sequence, title, description, pdf_url, video_url }) {
  return (
    <Disclosure
      as="div"
      className="p-4 bg-blue-100 rounded-xl"
      defaultOpen={false}
    >
      <DisclosureButton className="group flex w-full items-center justify-between">
        <div className="size-8 rounded-md flex items-center justify-center bg-white text-gray-900 font-semibold mr-4">
          {sequence}
        </div>
        <h3 className="font-semibold text-left flex-1">{title}</h3>
        <ChevronDownIcon className="size-8 rounded-md bg-white text-gray-900 group-data-[open]:rotate-180" />
      </DisclosureButton>

      <DisclosurePanel className="mt-2 space-y-2">
        <p className="text-gray-600 text-sm">{description}</p>
        {pdf_url && video_url ? (
          <TopicViewer pdf_url={pdf_url} video_url={video_url} />
        ) : (
          ""
        )}
      </DisclosurePanel>
    </Disclosure>
  );
}

export default Topic;

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

function TopicViewer({ pdf_url, video_url }) {
  const cloud_name = "dalvo7czi";
  const public_id = video_url;
  return (
    <div className="rounded-xl bg-white w-full h-full overflow-hidden">
      <TabGroup className="w-full h-full">
        <TabList className="flex items-center border-b-4 border-b-blue-100">
          <Tab
            key={1}
            className="flex-1 py-4 text-sm font-semibold text-gray-900 data-[selected]:bg-gray-300 focus:outline-none"
          >
            Topic PDF file
          </Tab>
          <Tab
            key={2}
            className="flex-1 py-4 text-sm font-semibold text-gray-900 data-[selected]:bg-gray-300 focus:outline-none"
          >
            Topic Video
          </Tab>
        </TabList>
        <TabPanels className="w-full h-full">
          <TabPanel key={1} className="w-full h-full">
            <div className="p-4 w-full h-full">
              <iframe
                src={pdf_url}
                style={{ width: "100%", height: "100%" }}
              ></iframe>
            </div>
          </TabPanel>
          <TabPanel key={2} className="w-full h-full">
            <div className="p-4 w-full h-full">
              <iframe
                src={`https://player.cloudinary.com/embed/?public_id=${public_id}&cloud_name=${cloud_name}&player[showJumpControls]=true&player[pictureInPictureToggle]=true&profile=cld-adaptive-stream`}
                style={{ width: "100%", height: "70%", border: "none" }}
                allowFullScreen
              ></iframe>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}

export default TopicViewer;

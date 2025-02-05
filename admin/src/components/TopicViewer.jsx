import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

function TopicViewer({ pdf_url, video_url }) {
  const cloud_name = "dalvo7czi";
  const public_id = video_url;
  return (
    <div className="rounded-xl bg-white w-full h-[648px] overflow-hidden">
      <TabGroup>
        <TabList className="flex items-center border-b-4 border-b-blue-100">
          <Tab
            key={1}
            className="flex-1 py-4 text-sm font-semibold text-gray-900 data-[selected]:bg-gray-300"
          >
            Topic PDF file
          </Tab>
          <Tab
            key={2}
            className="flex-1 py-4 text-sm font-semibold text-gray-900 data-[selected]:bg-gray-300"
          >
            Topic Video
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel key={1}>
            <div className="p-4">
              <iframe
                src={pdf_url}
                style={{ width: "100%", height: "560px" }}
              ></iframe>
            </div>
          </TabPanel>
          <TabPanel key={2}>
            <div className="p-4">
              <iframe
                src={`https://player.cloudinary.com/embed/?public_id=${public_id}&cloud_name=${cloud_name}&profile=cld-adaptive-stream`}
                style={{ width: "100%", height: "560px", border: "none" }}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
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

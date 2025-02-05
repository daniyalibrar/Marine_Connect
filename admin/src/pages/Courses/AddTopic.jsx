import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import API from "../../api";

function AddTopic() {
  const { admin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const { id: courseId } = useParams();

  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const topicPDFRef = useRef(null);
  const topicVideoRef = useRef(null);

  const handleAddTopic = async (event) => {
    event.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("topicPdf", topicPDFRef.current.files[0]);
    formData.append("topicVideo", topicVideoRef.current.files[0]);

    const headers = {
      Authorization: `Bearer ${admin.token}`,
      "Content-Type": "multipart/form-data",
    };
    await API.post(`/courses/${courseId}/topics`, formData, { headers })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Topic created successfully!");
          navigate(`..`);
        }
      })
      .catch((error) => {
        if (error.status === 409) {
          toast.error("Topic with this name for this course already exists");
        }
        toast.error("Unable to add new topic to this course");
        console.log(error);
      });
    setUploading(false);
  };

  return (
    <div className="w-full space-y-2">
      <h3 className="font-semibold">Add a new topic to this course</h3>
      <p className="text-gray-600 text-sm">
        Fill the form to add new topic to this course
      </p>
      <form onSubmit={handleAddTopic} className="space-y-3 relative">
        {/* Topic Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Topic title
          </label>
          <div className="mt-2">
            <input
              ref={titleRef}
              type="text"
              required
              name="title"
              id="title"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Topic description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Topic description {"(50-80 words)"}
          </label>
          <div className="mt-2">
            <textarea
              ref={descriptionRef}
              required
              name="description"
              id="description"
              rows="4"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-y"
            ></textarea>
          </div>
        </div>

        {/* Topic PDF file */}
        <div>
          <label
            htmlFor="pdf_file"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Upload topic PDF file
          </label>
          <div className="mt-2">
            <input
              ref={topicPDFRef}
              type="file"
              required
              accept=".pdf"
              name="pdf_file"
              id="pdf_file"
              className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Topic Video */}
        <div>
          <label
            htmlFor="topic_video"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Upload topic video file
          </label>
          <div className="mt-2">
            <input
              ref={topicVideoRef}
              type="file"
              required
              accept="video/*"
              name="topic_video"
              id="topic_video"
              className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <input
          disabled={uploading}
          type="submit"
          value={
            uploading
              ? "Uploading files and creating topic..."
              : "Add topic to course"
          }
          className="rounded-md bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
        />
      </form>
    </div>
  );
}

export default AddTopic;

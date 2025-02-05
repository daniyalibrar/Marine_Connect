import { useRef, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import API from "../../api";
import store from "../../store/store";
import { Editor } from "@tinymce/tinymce-react";

function EditJobPost() {
  const { admin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { job } = useLoaderData();

  const titleRef = useRef("");
  const jobDetailsRef = useRef(null);
  const jobTypeRef = useRef("");
  const minSalaryRef = useRef("");
  const maxSalaryRef = useRef("");
  const jobLevelRef = useRef("");
  const jobLocationRef = useRef("");

  const getJobDetails = () => {
    if (jobDetailsRef.current) {
      return jobDetailsRef.current.getContent();
    }
  };

  const handleUpdateJobPost = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", titleRef.current.value);
      formData.append("details", getJobDetails());
      formData.append("jobType", jobTypeRef.current.value);
      formData.append("minSalary", minSalaryRef.current.value);
      formData.append("maxSalary", maxSalaryRef.current.value);
      formData.append("jobLevel", jobLevelRef.current.value);
      formData.append("jobLocation", jobLocationRef.current.value);

      const headers = {
        Authorization: `Bearer ${admin.token}`,
      };
      const response = await API.put(`/jobs/${job.job_id}/${job.user_id}`, formData, {
        headers,
      });
      if (response.status === 200) {
        toast.success("Job Post updated Successfully!");
        navigate("/jobs");
      }
    } catch (error) {
      toast.error("Unable to update a Job Post");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 pb-24 space-y-2">
      <h3 className="text-lg font-semibold text-gray-900">Update a Job Post</h3>
      <p className="text-sm text-gray-500">
        Edit the form below to update a job post.
      </p>
      <div className="w-[548px] pt-4">
        <form onSubmit={handleUpdateJobPost} className="space-y-3">
          {/* Job Title */}
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Job Title
            </label>
            <div className="mt-2">
              <input
                ref={titleRef}
                name="title"
                type="text"
                defaultValue={job.title}
                required
                placeholder="Electrical Engineer, Software Engineer etc."
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 disabled:bg-indigo-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
          {/* Job Details */}
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Job Details
            </label>
            <div className="mt-2">
              <Editor
                apiKey="Your-tiny-mce-api-key"
                onInit={(_evt, editor) => (jobDetailsRef.current = editor)}
                initialValue={job.details}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style: "body { font-family:Inter; font-size:12px }",
                }}
              />
            </div>
          </div>
          {/* Job Type */}
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Job Type
            </label>
            <div className="mt-2">
              <select
                ref={jobTypeRef}
                name="jobType"
                defaultValue={job.jobType}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              >
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>
          {/* Job Salary */}
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              {`Job Salary in Dollars($)`}
            </label>
          </div>
          <div className="flex gap-x-4">
            <div className="flex-1">
              <label className="block text-sm/6 font-medium text-gray-900">
                {`Minimum($)`}
              </label>
              <div className="mt-2">
                <input
                  ref={minSalaryRef}
                  name="minSalary"
                  type="number"
                  defaultValue={job.minSalary}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm/6 font-medium text-gray-900">
                {`Maximum($)`}
              </label>
              <div className="mt-2">
                <input
                  ref={maxSalaryRef}
                  name="maxSalary"
                  type="number"
                  defaultValue={job.maxSalary}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          {/* Job Level and Job Location */}
          <div className="flex gap-x-4">
            <div className="flex-1">
              <label className="block text-sm/6 font-medium text-gray-900">
                Job Level
              </label>
              <div className="mt-2">
                <select
                  ref={jobLevelRef}
                  name="jobLevel"
                  defaultValue={job.jobLevel}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                >
                  <option value="training">Training</option>
                  <option value="entry_level">Entry Level</option>
                  <option value="junior">Junior Level</option>
                  <option value="middle">Middle Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="team_lead">Team Lead</option>
                  <option value="manager">Manager</option>
                  <option value="leadership">
                    Leadership/Director/CEO etc.
                  </option>
                </select>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm/6 font-medium text-gray-900">
                Job Location
              </label>
              <div className="mt-2">
                <select
                  ref={jobLocationRef}
                  name="jobLocation"
                  defaultValue={job.jobLocation}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                >
                  <option value="onsite">Onsite</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <input
              value={loading ? "Submitting..." : "Update Job Post"}
              disabled={loading}
              type="submit"
              className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditJobPost;

export async function jobloader({ params }) {
  const { admin } = store.getState().auth;
  const response = await API.get(`/jobs/${params.job_id}/${params.user_id}`, {
    headers: {
      Authorization: `Bearer ${admin.token}`,
    },
  });
  return response.data;
}

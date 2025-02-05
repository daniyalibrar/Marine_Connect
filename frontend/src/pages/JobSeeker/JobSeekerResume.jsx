import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import API from "../../api";
import sampleResume from "../../assets/sample_resume.pdf";

function JobSeekerResume() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState({});
  const resumeFileRef = useRef(null);

  const [resumeFile, setResumeFile] = useState(null);
  const handleResume = (e) => {
    setResumeFile(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    const fetchJobSeekerResume = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${user.token}`,
        };
        const response = await API.get(`/job-seeker/resume/${user.user_id}`, {
          headers,
        });
        if (response.status === 200) {
          setResume(response.data.resume);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobSeekerResume();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", resumeFileRef.current.files[0]);
      const headers = {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      };
      const response = await API.put(
        `/job-seeker/resume/${user.user_id}`,
        formData,
        { headers }
      );
      if (response.status === 201) {
        toast.success("Resume Uploaded/Updated Successfully!");
        console.log(response.data);
        navigate("/job-seeker");
      }
    } catch (error) {
      toast.error("Unable to Update Resume");
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-900">Job Seeker Resume</h3>
      <p className="text-sm text-gray-500">
        The following resume will be included in your Job Applications.
      </p>
      <h3 className="font-bold py-4">Your Resume/CV</h3>
      <div className="flex items-end space-x-4">
        <div className="flex items-center justify-center w-64 h-96 rounded-lg overflow-hidden">
          <iframe
            className="w-full h-full object-cover"
            src={
              resumeFile
                ? resumeFile
                : resume?.resume_url
                ? resume.resume_url
                : sampleResume
            }
            alt="profile_image"
          />
        </div>
        <div>
          <a
            href={resume.resume_url}
            target="_blank"
            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            View Resume
          </a>
        </div>
      </div>
      <form onSubmit={handleUpdate} className="space-y-3 mt-4">
        <div>
          <label className="block text-sm/6 font-bold text-gray-900">
            Upload a new Resume
          </label>
          <div className="mt-2">
            <input
              ref={resumeFileRef}
              required
              onChange={handleResume}
              type="file"
              accept=".pdf"
              disabled={loading}
              className="block rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 disabled:bg-indigo-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
        <div>
          <input
            value={loading ? "Submitting..." : "Upload Resume"}
            disabled={loading}
            type="submit"
            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed"
          />
        </div>
      </form>
    </div>
  );
}

export default JobSeekerResume;

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import API from "../../api";
import { Editor } from "@tinymce/tinymce-react";

function AddCourse() {
  const { admin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);

  const titleRef = useRef("");
  const imageRef = useRef(null);
  const shortDescriptionRef = useRef("");
  const longDescriptionRef = useRef(null);
  const courseCategoryRef = useRef("");
  const levelRef = useRef("");
  const durationHoursRef = useRef("");

  const [courseCategories, setCourseCategories] = useState([]);

  const [image, setImage] = useState();
  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const getLongDescription = () => {
    if (longDescriptionRef.current) {
      return longDescriptionRef.current.getContent();
    }
  };

  useEffect(() => {
    const fetchCourseCategories = async () => {
      const result = await API.get("/course-categories", {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      setCourseCategories(result.data.courseCategories);
    };

    fetchCourseCategories();
  }, []);

  const handleAddCourse = async (event) => {
    event.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("image", imageRef.current.files[0]);
    formData.append("shortDescription", shortDescriptionRef.current.value);
    formData.append("longDescription", getLongDescription());
    formData.append("category_id", courseCategoryRef.current.value);
    formData.append("level", levelRef.current.value);
    formData.append("durationHours", durationHoursRef.current.value);

    const headers = {
      Authorization: `Bearer ${admin.token}`,
      "Content-Type": "multipart/form-data",
    };
    await API.post("/courses", formData, { headers })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Course Created Successfully!");
          navigate("/courses");
        }
      })
      .catch((error) => {
        toast.error("Unable to Create a New Course");
        console.log(error);
      });
    setUploading(false);
  };

  return (
    <div className="pt-10 pb-20">
      <h3 className="mt-6 text-base/7 font-semibold text-gray-900">
        Add a New Course
      </h3>
      <p className="mt-1 text-sm/6 text-gray-500">
        Fill the form below to create a new Course
      </p>
      <div className="mt-6 w-full">
        <form
          onSubmit={handleAddCourse}
          className="space-y-3"
          encType="multipart/form-data"
        >
          {/* Course Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Enter Course Title
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

          {/* Course Image */}
          <div className="w-56 flex overflow-hidden justify-start">
            <img
              src={image}
              alt="image"
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Upload Course Image
            </label>
            <div className="mt-2">
              <input
                ref={imageRef}
                onChange={handleImage}
                type="file"
                required
                accept="image/*"
                name="image"
                id="image"
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Course short description */}
          <div>
            <label
              htmlFor="shortDescription"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Enter Short Description for Course {"(100-150 words)"}
            </label>
            <div className="mt-2">
              <textarea
                ref={shortDescriptionRef}
                required
                name="shortDescription"
                id="shortDescription"
                rows="6"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-y"
              ></textarea>
            </div>
          </div>
          {/* Long Description */}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Enter Detailed Description for Course
            </label>
            <div className="mt-2">
              <Editor
                apiKey=""
                onInit={(_evt, editor) => (longDescriptionRef.current = editor)}
                initialValue="<h3>Enter course details here</h3>"
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
                  content_style: "body { font-family:Inter; font-size:14px }",
                }}
              />
            </div>
          </div>

          {/* Course Category */}
          <div>
            <label
              htmlFor="level"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Select Course Category
            </label>
            <div className="mt-2">
              <select
                ref={courseCategoryRef}
                id="category_id"
                name="category_id"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              >
                {courseCategories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Course Level */}
          <div>
            <label
              htmlFor="level"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Select Course Level
            </label>
            <div className="mt-2">
              <select
                ref={levelRef}
                id="level"
                name="level"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Course Duration Hours */}
          <div>
            <label
              htmlFor="durationHours"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Estimated Duration Hours
            </label>
            <div className="mt-2">
              <input
                ref={durationHoursRef}
                type="number"
                required
                name="durationHours"
                id="durationHours"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex justify-center items-center">
            <input
              value={uploading ? "Adding Course..." : "Add Course"}
              disabled={uploading}
              type="submit"
              className="block rounded-md bg-indigo-600 px-10 py-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;

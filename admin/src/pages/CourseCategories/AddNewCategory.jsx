import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import API from "../../api";

function AddNewCategory() {
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.auth);

  const categoryNameRef = useRef("");
  const categoryDescriptionRef = useRef("");

  const handleAddCourseCategory = async (event) => {
    event.preventDefault();
    const data = {
      categoryName: categoryNameRef.current.value,
      categoryDescription: categoryDescriptionRef.current.value,
    };
    const headers = {
      Authorization: `Bearer ${admin.token}`,
    };
    await API.post("/course-categories", data, { headers })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Course Category Created Successfully!");
          navigate("/course-categories");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="mt-10">
      <h3 className="mt-6 text-base/7 font-semibold text-gray-900">
        Add a new Course Category
      </h3>
      <p className="mt-1 text-sm/6 text-gray-500">
        Fill the form below to add a new course category
      </p>
      <div className="mt-6 w-full">
        <form onSubmit={handleAddCourseCategory} className="space-y-3">
          <div>
            <label
              htmlFor="categoryName"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Category Name
            </label>
            <div className="mt-2">
              <input
                ref={categoryNameRef}
                id="categoryName"
                name="categoryName"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="categoryDescription"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Category Description
            </label>
            <div className="mt-2">
              <textarea
                ref={categoryDescriptionRef}
                id="categoryDescription"
                name="categoryDescription"
                rows="5"
                required
                className="block w-full resize-y rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddNewCategory;

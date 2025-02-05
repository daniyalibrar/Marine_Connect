import { Link } from "react-router-dom";

function CourseCard({
  id,
  title,
  image,
  shortDescription,
  level,
  durationHours,
  courseLink,
}) {
  const levelColorClasses = (level) => {
    if (level === "Beginner") return "bg-green-600 hover:bg-green-500";
    if (level === "Intermediate") return "bg-blue-600 hover:bg-blue-500";
    if (level === "Advanced") return "bg-red-600 hover:bg-red-500";
  };
  return (
    <div className="bg-white flex flex-col justify-between rounded-xl shadow-md overflow-hidden">
      <div className="relative flex-1">
        <img loading="lazy" className="w-full h-52 object-cover" src={image} />
        <div
          className={`absolute top-0 right-0 ${levelColorClasses(
            level
          )} text-white px-3 py-1 mr-0 mt-4 shadow-sm shadow-gray-600 rounded-s-full rounded-e-none text-xs`}
        >
          {level}
        </div>
        <div className="absolute bottom-0 left-0 bg-gray-900 hover:bg-gray-700 text-white px-3 py-1 ml-0 mb-4 shadow-sm shadow-gray-600 rounded-e-full rounded-s-none text-xs">
          {durationHours} hours
        </div>
      </div>
      <div className="px-4 py-2 flex-1">
        <div className="text-lg font-bold text-gray-800 mb-2">{title}</div>
        <p className="text-gray-500 text-sm text-left">
          {shortDescription.substring(0, 260) + "..."}
        </p>
      </div>
      <div className="px-4 pb-4 pt-2 flex items-center justify-center">
        {courseLink ? (
          <Link
            to={courseLink}
            className="w-full whitespace-nowrap rounded-full bg-indigo-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Go to Course
          </Link>
        ) : (
          <Link
            to={`/courses/${id}`}
            className="w-full whitespace-nowrap rounded-full bg-indigo-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            View Course
          </Link>
        )}
      </div>
    </div>
  );
}

export default CourseCard;

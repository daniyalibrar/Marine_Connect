import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../../../components/CourseCard";
import Loader from "../../../components/Loader/Loader";
import API from "../../../api";

function PopularCourses() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchPopularCourses = async () => {
      setLoading(true);
      const result = await API.get("/courses/popular-courses");
      setCourses(result.data.courses);
      setLoading(false);
    };

    fetchPopularCourses();
  }, []);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto px-6">
        <div className="mx-auto text-center">
          <h2 className="text-base font-semibold leading-8 text-indigo-600">
            Courses
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Popular Courses
          </p>
          <p className="mt-2 text-md leading-8 text-gray-600">
            Take a look at these trending courses or explore form the wide range
            of courses offered.
          </p>
        </div>
        <div className="container mx-auto mt-4">
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <CourseCard
                  key={course.course_id}
                  id={course.course_id}
                  title={course.title}
                  image={course.image}
                  shortDescription={course.shortDescription}
                  level={course.level}
                  durationHours={course.durationHours}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center items-center mt-8">
          <Link
            to="/courses"
            className="whitespace-nowrap rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Explore Courses <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PopularCourses;

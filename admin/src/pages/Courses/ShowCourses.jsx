import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import API from "../../api";
import CourseCard from "../../components/CourseCard";

function ShowCourses() {
  const { admin } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await API.get("/courses", {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      setCourses(result.data.courses);
    };

    fetchCourses();
  }, []);

  return (
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-10">
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
    </div>
  );
}

export default ShowCourses;

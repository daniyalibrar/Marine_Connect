import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../api";
import { Link, useParams } from "react-router-dom";

function CourseTopics() {
  const { enrollment_id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      await API.get(
        `/student/${user.user_id}/enrollments/${enrollment_id}/topics`,
        {
          headers,
        }
      )
        .then((response) => {
          if (response.status === 200) {
            setTopics(response.data.topics);
          }
        })
        .catch((error) => {
          if (error.status === 404) {
            console.log("Topics not found");
          } else {
            console.log(error);
          }
        });
    };

    fetchTopics();
  }, []);

  return (
    <div className="p-4 h-full">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Course Topics</h1>
        <Link
          to={`/student/enrollments/${enrollment_id}`}
          className="bg-gray-900 text-sm text-white px-4 py-2 rounded-lg"
        >
          &larr; Go back
        </Link>
      </div>

      <div className="mt-4 mb-16 space-y-2">
        {topics.map((topic) => (
          <Link
            to={`${topic.topic_id}`}
            key={topic.topic_id}
            className="w-full p-2 bg-blue-100 rounded-lg flex items-center"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-gray-900 text-white text-bold rounded-lg">
              {topic.sequence}
            </div>
            <div className="flex-1 pl-4">
              <p className="font-bold text-sm">{topic.title}</p>
              <p className="text-sm">{topic.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CourseTopics;

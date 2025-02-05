import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../../api";
import Topic from "../../components/Topic";

function CourseTopics() {
  const { admin } = useSelector((state) => state.auth);
  const { id: courseId } = useParams();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const result = await API.get(`/courses/${courseId}/topics`, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      setTopics(result.data.topics);
    };

    fetchTopics();
  }, []);
  return (
    <>
      {topics.length ? (
        topics.map((topic) => (
          <Topic
            key={topic.topic_id}
            sequence={topic.sequence}
            title={topic.title}
            description={topic.description}
            pdf_url={topic.pdf_url}
            video_url={topic.video_url}
          />
        ))
      ) : (
        <p className="text-center text-gray-600 text-sm">
          No topics exist for this course add topics
        </p>
      )}
    </>
  );
}

export default CourseTopics;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../api";
import { Link, useParams } from "react-router-dom";
import TopicViewer from "../../components/TopicViewer";

function CourseTopicViewer() {
  const { enrollment_id } = useParams();
  const { topic_id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [topic, setTopic] = useState({});

  useEffect(() => {
    const fetchTopic = async () => {
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      await API.get(
        `/student/${user.user_id}/enrollments/${enrollment_id}/topics/${topic_id}`,
        {
          headers,
        }
      )
        .then((response) => {
          if (response.status === 200) {
            setTopic(response.data.topic);
          }
        })
        .catch((error) => {
          if (error.status === 404) {
            console.log("Topic not found");
          } else {
            console.log(error);
          }
        });
    };

    fetchTopic();
  }, []);

  return (
    <div className="p-4 w-full h-full bg-gray-100 space-y-4 flex flex-col">
      <div className="py-2">
        <Link
          to={`/student/enrollments/${enrollment_id}/topics`}
          className="px-4 py-2 text-white text-sm bg-gray-900 rounded-lg"
        >
          &larr; Go to course topics
        </Link>
      </div>
        <p className="font-bold text-center">{`${topic.sequence}. ${topic.title}`}</p>
      <TopicViewer pdf_url={topic.pdf_url} video_url={topic.video_url} />
    </div>
  );
}

export default CourseTopicViewer;

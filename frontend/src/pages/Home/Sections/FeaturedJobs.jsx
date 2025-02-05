import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JobCard from "../../../components/JobCard";
import Loader from "../../../components/Loader/Loader";
import API from "../../../api";

function FeaturedJobs() {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      setLoading(true);
      try {
        const result = await API.get("/jobs/featured-jobs");
        setJobs(result.data.jobs);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, []);

  return (
    <section className="bg-white pb-24 sm:pb-32">
      <div className="mx-auto px-6">
        <div className="mx-auto text-center">
          <h2 className="text-base font-semibold leading-8 text-indigo-600">
            Jobs
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Featured Jobs
          </p>
          <p className="mt-2 text-md leading-8 text-gray-600">
            Comprehensive job listings tailored to your needs and skills set.
          </p>
        </div>
        <div className="container mx-auto mt-4">
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job) => (
                <JobCard key={job.job_id} job={job} />
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center items-center mt-8">
          <Link
            to="/jobs"
            className="whitespace-nowrap rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Browse Jobs <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedJobs;

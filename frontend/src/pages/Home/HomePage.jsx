import HeroSection from "./Sections/HeroSection";
import PopularCourses from "./Sections/PopularCourses";
import FeaturedJobs from "./Sections/FeaturedJobs";
import Hire from "./Sections/Hire";

function Home() {
  return (
    <>
      <HeroSection />
      <PopularCourses />
      <FeaturedJobs />
      <Hire />
    </>
  );
}

export default Home;

import {
  AcademicCapIcon,
  BriefcaseIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

function AboutUs() {
  const features = [
    {
      name: "Maritime Education",
      description:
        "A wide range of courses designed to equip individuals with the skills and certifications needed to excel in the maritime industry. Expert-led training programs covering topics from basic seamanship to advanced navigation and maritime law.",
      to: "/courses",
      icon: AcademicCapIcon,
    },
    {
      name: "Career Opportunities",
      description:
        "Comprehensive job listings tailored to the maritime sector. Tools to help job seekers connect with leading employers worldwide.",
      to: "/Jobs",
      icon: BriefcaseIcon,
    },
    {
      name: "Talent Acquisition",
      description:
        "A dedicated platform for organizations to discover and hire top-tier maritime professionals. Streamlined processes to match talent with the specific needs of the maritime industry.",
      to: "/hire",
      icon: UserGroupIcon,
    },
  ];

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            About Us
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Who We Are
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Marine Connect is the ultimate platform bridging the gap between
            maritime education, employment opportunities, and talent
            acquisition. Our mission is to empower individuals and organizations
            within the maritime industry by providing a one-stop destination for
            learning, career advancement, and hiring solutions.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    className="h-10 w-10 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <Link
                      to={feature.to}
                      className="text-sm font-semibold leading-6 text-indigo-600"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;

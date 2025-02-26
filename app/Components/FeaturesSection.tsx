import React from "react";
import { FaBookOpen, FaUserTie, FaUsers, FaEye, FaLightbulb, FaEnvelope } from "react-icons/fa";

// Define TypeScript type for feature items
type Feature = {
  icon: JSX.Element;
  title: string;
};

// Feature data
const features: Feature[] = [
  { icon: <FaBookOpen />, title: "Learn More Anywhere" },
  { icon: <FaUserTie />, title: "Expert Instructor" },
  { icon: <FaUsers />, title: "Team Management" },
  { icon: <FaEye />, title: "Course Planning" },
  { icon: <FaLightbulb />, title: "Teacher Monitoring" },
  { icon: <FaEnvelope />, title: "24/7 Strong Support" },
];

// FeatureCard component with TypeScript props
const FeatureCard: React.FC<Feature> = ({ icon, title }) => (
  <div className="bg-white shadow-md p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-lg transition">
    <div className="text-green-500 text-4xl bg-green-100 p-3 rounded-full">{icon}</div>
    <h3 className="text-xl font-semibold mt-4">{title}</h3>
    <p className="text-gray-500 mt-2 text-sm">
      Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore.
    </p>
  </div>
);

// FeaturesSection component
const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 px-8 bg-gray-50">
      <div className="text-center mb-10">
        <h5 className="text-green-500 font-semibold uppercase">Why Choose Edusion</h5>
        <h2 className="text-4xl font-bold mt-2">
          Find The <span className="text-green-500">Best Features</span> Of Edusion
        </h2>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <FeatureCard key={index} icon={feature.icon} title={feature.title} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

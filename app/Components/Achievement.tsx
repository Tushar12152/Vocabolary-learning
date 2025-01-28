import React, { lazy, Suspense } from "react";
import { FaSmile, FaBook, FaAward, FaUserGraduate } from "react-icons/fa";

// Lazy-load react-countup
const CountUp = lazy(() => import("react-countup"));

const achievements = [
  {
    icon: FaSmile,
    number: 854,
    label: "Enrolled Students",
  },
  {
    icon: FaBook,
    number: 521,
    label: "Academic Programs",
  },
  {
    icon: FaAward,
    number: 163,
    label: "Winning Awards",
  },
  {
    icon: FaUserGraduate,
    number: 93,
    label: "Certified Students",
  },
];

const Achievement = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="w-[80%] mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-2 ml-1">
          <p className="text-green-500 text-lg">Some Fun Fact</p>
          <span className="block w-32 border-b-2 border-green-500"></span>
        </div>
        <h1 className="text-5xl font-bold text-blue-900 mt-3">
          Our Great{" "}
          <span className="text-green-500 border-b-2 border-green-500">
            Achievement
          </span>
        </h1>

        {/* Achievements Grid */}
        <section className="py-12">
          <div className="container mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {achievements.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center transition-transform hover:scale-105"
                  >
                    <IconComponent className="text-blue-500 text-4xl" />
                    
                    {/* Suspense for CountUp */}
                    <Suspense fallback={<p className="text-5xl font-bold text-gray-800">0</p>}>
                      <h3 className="text-5xl font-bold text-gray-800 my-4">
                        <CountUp start={0} end={item.number} duration={2} />
                      </h3>
                    </Suspense>

                    <p className="text-gray-600 text-lg">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Achievement;

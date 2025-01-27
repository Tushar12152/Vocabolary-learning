import React from 'react';
import CountUp from "react-countup"; // Ensure this library is installed
import { FaSmile, FaBook, FaAward, FaUserGraduate } from "react-icons/fa";

const achievements = [
  {
    icon: <FaSmile className="text-blue-500 text-4xl" />,
    number: 854,
    label: "Enrolled Students",
  },
  {
    icon: <FaBook className="text-orange-500 text-4xl" />,
    number: 521,
    label: "Academic Programs",
  },
  {
    icon: <FaAward className="text-green-500 text-4xl" />,
    number: 163,
    label: "Winning Awards",
  },
  {
    icon: <FaUserGraduate className="text-pink-500 text-4xl" />,
    number: 93,
    label: "Certified Students",
  },
];

const Achievement = () => {
  return (
    <div className=' bg-gray-100'>
      <div className='w-[80%] mx-auto'>
        <div className='pt-20 flex  items-center gap-2 ml-1' >
          <p className="text-green-500 text-lg  ">Some Fun Fact   </p>
          <span className='block w-32 border-b-2 border-green-500 '></span>
        </div>
        <h1 className="text-5xl font-bold text-blue-900 mt-3">Our Great <span className='text-green-500 border-b-2 border-green-500 '>Achievement</span></h1>


        <div>
          <section className="py-16 ">
            <div className="container mx-auto text-center">
             
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                {achievements.map((item: any, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center transition-transform hover:scale-105"
                  >
                    {item.icon}
                    <h3 className="text-5xl font-bold text-gray-800 my-4">
                      <CountUp start={0} end={item.number} duration={2} />
                    </h3>
                    <p className="text-gray-600 text-lg">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>


      </div>
    </div>
  );
};

export default Achievement;







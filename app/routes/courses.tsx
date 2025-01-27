import React from 'react';
import background from '../../public/Banner1.png';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from 'Hooks/useAxiosSecure';

const Courses = () => {

  const axiosSecure = useAxiosSecure()
  const { data: courses = [], refetch } = useQuery({
    queryKey: ['course'],
    queryFn: async () => {
      const res = await axiosSecure.get('/courses');
      return res.data;
    },
  });


  return (
    <div>
    {/* Header Section */}
    <div
      className="h-72 bg-center bg-cover flex items-center justify-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h1 className="text-4xl font-bold text-blue-900 bg-white/70 px-6 py-3 rounded-lg shadow-md">
        Courses
      </h1>
    </div>
  
    {/* Courses Grid */}
    <div className="w-[80%] mx-auto mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {courses.map((course: any) => (
        <div
          key={course?._id}
          className="rounded-xl shadow-lg bg-white hover:shadow-2xl transition duration-300 transform hover:scale-105"
        >
          {/* Course Image */}
          <div className="relative">
            <img
              className="w-full h-56 object-cover rounded-t-xl"
              src={course?.imageUrl}
              alt={course?.title}
            />
            <span className="absolute top-4 left-4 bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-lg">
              {course?.categories}
            </span>
          </div>
  
          {/* Course Content */}
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-800 hover:text-green-500 cursor-pointer">
              {course?.title}
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              {course?.description || "Explore the details of this exciting course!"}
            </p>
          </div>
  
          {/* Footer Section */}
          <div className="flex justify-between items-center px-6 py-4 bg-gray-100 rounded-b-xl">
            <span className="text-gray-700 text-sm">
              ⭐ {course?.rating || "4.5"} / 5.0
            </span>
            <button className="text-sm text-green-500 font-semibold hover:underline">
              Learn More
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default Courses;

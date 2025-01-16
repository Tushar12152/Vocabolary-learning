import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from 'Hooks/useAxiosSecure';
import React from 'react';

const AllCoursesTable = () => {
  const axiosSecure = useAxiosSecure();

  const { data: courses = [] } = useQuery({
    queryKey: ['course'],
    queryFn: async () => {
      const res = await axiosSecure.get('/courses');
      return res.data;
    },
  });

  console.log(courses)

  return (
    <div className="mt-20">
      <div>
        {courses.map((course) => (
          <div key={course._id}>
            <h1>{course.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCoursesTable;

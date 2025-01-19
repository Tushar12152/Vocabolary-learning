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
      <div className=" bg-center h-72" style={{ backgroundImage: `url(${background})` }}>
        <h1 className='text-center font-bold text-blue-900 text-4xl pt-20'>Courses</h1>
      </div>


      <div className='w-[80%] mx-auto mt-28 grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {
          courses.map((course: any) => (<div key={course?._id}>
            <div className='rounded-xl shadow-lg p-2'>
                <img className='w-[400PX] rounded-xl h-[250px] mx-auto' src={course?.imageUrl} alt="" />

                <h1 className="text-white bg-green-400 p-2  w-40 m-8 rounded-lg text-center">{course?.categories}</h1>

                <h1 className="text-lg font-bold p-2 ml-8 hover:text-green-400 hover:cursor-pointer">{course?.title}</h1>

                
            </div>
          </div>))
        }
      </div>

    </div>
  );
};

export default Courses;

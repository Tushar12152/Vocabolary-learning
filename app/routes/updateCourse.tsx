import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from 'Hooks/useAxiosSecure';
import React from 'react';
import { useParams } from 'react-router';

const updateCourse = () => {

    const { id } = useParams();

        const axiosSecure = useAxiosSecure()
        const { data: course = [], refetch } = useQuery({
          queryKey: ['course'],
          queryFn: async () => {
            const res = await axiosSecure.get(`courses/${id}`);
            return res.data;
          },
        });

        console.log('fffdds',id)
    
    return (
        <div>
              {/* <h1 className="text-center font-bold text-4xl text-gray-800 border border-green-500 p-4 shadow-lg rounded-lg bg-white max-w-md mx-auto">
                Edit {course?.title}
            </h1> */}
        </div>
    );
};

export default updateCourse;
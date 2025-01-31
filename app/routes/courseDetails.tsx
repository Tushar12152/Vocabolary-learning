import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from 'Hooks/useAxiosSecure';
import React from 'react';
import { useParams } from 'react-router';

const courseDetails = () => {
    const {id}=useParams()
    const axiosSecure=useAxiosSecure()

    const { data: courses = [] } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
          const res = await axiosSecure.get(`/courses/${id}`);
          return res.data;
        },
      });

      console.log(courses)

    return (
        <div className='w-[80%] mx-auto'>
             <h1>{courses?.title}</h1>
        </div>
    );
};

export default courseDetails;
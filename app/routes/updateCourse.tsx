import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from 'Hooks/useAxiosSecure';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const updateCourse = () => {

    const { id } = useParams();

       const [course,setCourse] = useState({})

        useEffect(()=>{
                // fetch(`http://localhost:5001/courses/${id}`)
                // .then(data=>data.json())

                fetch(`http://localhost:5001/courses/${id}`, { 
                    method: 'GET'
                  })
                  .then(function(response) { return response.json(); })
                  .then(function(data) {
                    setCourse(data)
                  });


        },[])


        // const axiosSecure = useAxiosSecure()
        // const { data: course = [], refetch } = useQuery({
        //   queryKey: ['course'],
        //   queryFn: async () => {
        //     const res = await axiosSecure.get(`courses/${id}`);
        //     return res.data;
        //   },
        // });

        console.log('fffdds',course)
    
    return (
        <div>

            update
              {/* <h1 className="text-center font-bold text-4xl text-gray-800 border border-green-500 p-4 shadow-lg rounded-lg bg-white max-w-md mx-auto">
                Edit {course?.title}
            </h1> */}
        </div>
    );
};

export default updateCourse;
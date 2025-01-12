import React from 'react';
import CorsesAddField from '~/Components/CorsesAddField';

const addCources = () => {
    return (
        <div>
             <h1 className="text-center font-bold text-3xl border border-green-500 p-2 shadow-2xl shadow-black w-72 mx-auto">Add Courses</h1>

             <CorsesAddField/>
        </div>
    );
};

export default addCources;
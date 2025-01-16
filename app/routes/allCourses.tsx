import React from 'react';
import AlllCoursesTable from '~/Components/AlllCoursesTable';

const allCourses = () => {
    return (
        <div>
             <h1 className="text-center font-bold text-3xl border border-green-500 p-2 shadow-2xl shadow-black w-72 mx-auto">All Courses</h1>

             <AlllCoursesTable/>
        </div>
    );
};

export default allCourses;
import React from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';

const Quality = () => {
    return (
        <div className='flex'>
            <div className='bg-white p-10 border-r-2 border-white'>
                <h1 className="text-xl font-bold text-blue-900">Quality Education</h1>
                <p className='py-5 text-gray-400'>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore.</p>
                <button className="flex items-center gap-2 p-4 bg-green-200 text-black border border-transparent rounded transition duration-700 ease-in-out hover:bg-green-500 hover:text-white hover:border-green-500 hover:rounded-full">
                    Explore Courses <FaArrowAltCircleRight />
                </button>
            </div>
            <div className='bg-white p-10 border-r-2 border-white'>
                <h1 className="text-xl font-bold text-blue-900">Experienced Teachers</h1>
                <p className='py-5 text-gray-400'>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore.</p>
                <button className="flex items-center gap-2 p-4 bg-green-200 text-black border border-transparent rounded transition duration-700 ease-in-out hover:bg-green-500 hover:text-white hover:border-green-500 hover:rounded-full">
                    Explore Courses <FaArrowAltCircleRight />
                </button>
            </div>
            <div className='bg-white p-10 border-r-2 border-white'>
                <h1 className="text-xl font-bold text-blue-900">Delicious Food</h1>
                <p className='py-5 text-gray-400'>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore.</p>
                <button className="flex items-center gap-2 p-4 bg-green-200 text-black border border-transparent rounded transition duration-700 ease-in-out hover:bg-green-500 hover:text-white hover:border-green-500 hover:rounded-full">
                    Explore Courses <FaArrowAltCircleRight />
                </button>
            </div>
            
        </div>
    );
};

export default Quality;
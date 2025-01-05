import React from 'react';
import background from '../../public/Main-banner.png'
import { FaArrowAltCircleRight } from 'react-icons/fa';
import backgroundImage from '../../public/Banner-man.png'

const Banner = () => {
    return (
        <div className="h-[calc(100vh-120px)] bg-center bg-cover " style={{ backgroundImage: `url(${background})` }}>

            <div className='w-[80%] mx-auto flex justify-between'>
                {/* left side */}
                <div>
                    <div className='mt-28'>
                        <h1 className='text-7xl font-bold py-10 text-blue-900 leading-tight'>Better <span className='text-green-500'>Learning <br /> Future</span> Starts <br /> With Edusion</h1>

                        <p className="my-5 text-gray-500">It is a long established fact that reader will be distracted readable content <br />of a page when.</p>

                        <button className="flex items-center gap-2 p-4 bg-green-200 text-black border border-transparent rounded transition duration-700 ease-in-out hover:bg-green-500 hover:text-white hover:border-green-500 hover:rounded-full">
                            Explore Courses <FaArrowAltCircleRight />
                        </button>

                    </div>
                </div>

                {/* right side */}
                <div>

                    <img src={backgroundImage} alt="" />
                </div>
            </div>

        </div>
    );
};

export default Banner;
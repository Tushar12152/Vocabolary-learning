import React from 'react';
import skill from "../../public/skill.png"
import { TfiMedall } from "react-icons/tfi";
import { TfiWand } from "react-icons/tfi";

const Skills = () => {
    return (
        <div className='bg-gray-100 py-20'>
            <div className='w-[80%] flex items-center justify-between mx-auto'>
                <div className='w-[50%]'>
                    <img className='' src={skill} alt="" />
                </div>

                <div className='w-[50%]'>
                    <div>
                        <h1 className="text-5xl font-bold">
                            Learn new skills to <span className='text-green-500'>ahead <br /> for your</span> go  career.</h1>
                        <p className='text-gray-400 py-5'>
                            Lorem ipsum dolor sit amet, consectetur notted adipisicing elit sed do eiusmod tempor incididunt ut labore et simply.
                        </p>

                        <div className='flex items-center gap-6 justify-center border border-gray-400 p-10 rounded-lg mt-2 hover:border-l-4 duration-500 hover:border-l-green-500'>
                            <div className="">
                                <span className="inline-flex items-center p-5 justify-center w-20 h-20 bg-green-200 text-black rounded-full">
                                    <TfiMedall className="text-3xl text-green-500" />
                                </span>
                            </div>
                            <div className=''>
                                <h1 className="text-lg text-blue-900">Our Mission</h1>
                                <p className='text-gray-400 '>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore.</p>
                            </div>
                        </div>


                        <div className='flex items-center  gap-6 justify-center border border-gray-400 p-10 rounded-lg mt-4 hover:border-l-4 duration-500 hover:border-l-green-500'>
                            <div className="">
                                <span className="inline-flex items-center p-5 justify-center w-20 h-20 bg-green-200 text-black rounded-full">
                                    <TfiWand className="text-3xl text-green-500" />
                                </span>
                            </div>
                            <div className=''>
                                <h1 className="text-lg text-blue-900">Our Vision</h1>
                                <p className='text-gray-400 '>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore.</p>
                            </div>
                        </div>

                        <button className="mt-10 items-center rounded-full gap-2 p-4 px-5 text-white bg-green-500  border border-transparent transition duration-700 ease-in-out hover:bg-blue-900  hover:border-green-500 hover:rounded-full">
                            Discover More
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};


export default Skills;
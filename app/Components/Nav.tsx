import { Link, Links, NavLink } from 'react-router';
import logo from '../../public/logo.png'
import { useState } from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { ImCross } from "react-icons/im";



const Nav = () => {

    const [search, setSearch] = useState(true)
    return (
        <div>
            <div className='w-[80%] mx-auto flex justify-between items-center gap-10 py-5'>
                {/* start */}
                <div className='flex justify-between items-center w-[60%]'>
                    {/* logo */}
                    <div>
                        <img src={logo} alt="" />
                    </div>

                    {/* routs */}
                    <div className="flex flex-row gap-6">
                        <NavLink
                            to="/home"
                            style={({ isActive }) => ({ color: isActive ? "green" : "black" })}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/about"
                            style={({ isActive }) => ({ color: isActive ? "green" : "black" })}
                        >
                            About
                        </NavLink>
                        <NavLink
                            to="/courses"
                            style={({ isActive }) => ({ color: isActive ? "green" : "black" })}
                        >
                            Courses
                        </NavLink>
                        <NavLink
                            to="/blog"
                            style={({ isActive }) => ({ color: isActive ? "green" : "black" })}
                        >
                            Blog
                        </NavLink>

                    </div>
                </div>


                {/* end */}
                <div className='flex gap-6 items-center justify-between'>
                    <div className='flex gap-6'>
                        <div className='relative'>
                            <button className='w-12 text-xl' onClick={() => setSearch(!search)}> {search ? <FaSearch /> : <ImCross />}  </button>
                            {!search? <label className="input input-bordered flex items-center gap-2 absolute mt-8">
                                <input type="text" className="grow" placeholder="Search" />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        fillRule="evenodd"
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                        clipRule="evenodd" />
                                </svg>
                            </label>:''}
                        </div>

                        <button className='w-12 text-xl'>  <FaShoppingCart />  </button>


                    </div>
                    <div>
                        <button className="border border-l-green-500 hover:bg-green-500 hover:text-white transition duration-300 px-4 py-2 rounded">
                            <Link to='/contact'>
                                Contact
                            </Link>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Nav;
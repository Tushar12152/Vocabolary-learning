import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { NavLink, Outlet } from "react-router";

const Dashboard = () => {
    return (
        <div>
             <div className="grid grid-cols-12 h-full ">
            <div className="col-span-4 md:col-span-3 min-h-screen text-center text-white bg-gradient-to-b from-green-100 to-gray-100">

    
  
  {/* {
    Admin? <AdminSide/>:"User Dashboard"
  } */}




                <div className="mt-20 text-black  menu">
                    <hr />
                    <li >
                        <NavLink to="/">
                            <FaHome />
                            Home</NavLink>
                    </li>
                    <li >
                        <NavLink to='' >
                            <FaSignOutAlt/>
                            Log Out</NavLink>
                    </li>
                </div>
            </div>


            <div className="col-span-8 md:col-span-9 p-10 min-h-screen">
                <Outlet></Outlet>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
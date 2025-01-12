import toast from "react-hot-toast";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router";
import { MdNoteAdd } from "react-icons/md";
import ProtectRouter from "./ProtectRouter";

const Dashboard = () => {
  // const navigate=useNavigate()

  const handleLogout = () => {
    // Remove the current user from localStorage
    localStorage.removeItem("currentUser");

    // Optionally, redirect to the login page or any other page
    // <Navigate to='/' />
    toast.success("Logged out successfully!");
  };


  return (
    <div>
      <div className="grid grid-cols-12 h-full ">
        <div className="col-span-4 md:col-span-3 min-h-screen text-center text-black menu bg-gradient-to-b from-green-100 to-gray-100">


          <li >
            <NavLink to="/dashboard/add-courses">
            <MdNoteAdd />
              Add Courses</NavLink>
          </li>
          <li >
            <NavLink to="/dashboard/all-courses">
            <MdNoteAdd />
              All Courses</NavLink>
          </li>



          <div className="mt-20 text-black  menu">
            <hr />
            <li >
              <NavLink to="/">
                <FaHome />
                Home</NavLink>
            </li>
            <li >
              <NavLink onClick={handleLogout} to='' >
                <FaSignOutAlt />
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

export default function ProtectedDashboard() {
  return (
    <ProtectRouter>
      <Dashboard />
    </ProtectRouter>
  );
}
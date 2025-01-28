// import { Navigate } from "react-router";

// const ProtectRouter = ({children}) => {

//     const currentUser= JSON.parse(localStorage.getItem("currentUser") || "{}");
//     console.log(currentUser)

   
//   if (!currentUser) {
//     // Redirect to login if no user is logged in
//     return <Navigate to="/" />;
//   } else{

//     return children;
//   }

// };


// export default ProtectRouter;


import React from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router";

interface ProtectRouterProps {
  children: React.ReactNode;
}

const ProtectRouter: React.FC<ProtectRouterProps> = ({ children }) => {
  let currentUser = null;

  // Check if we're in a browser environment before accessing localStorage
  if (typeof window !== "undefined") {
    currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  }

  console.log("Current User:", currentUser?.Role);

  if (!currentUser) {
    // Redirect to login if no user is logged in
    return <Navigate to="/" replace />;


  } else{
     
     if( currentUser?.Role==='admin'){
      return <>{children}</>;
     } 
      toast.error('You are not admin')
     return <Navigate to="/home" replace />;
    
  }

 
};

export default ProtectRouter;
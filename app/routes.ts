import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/login.tsx"), 
                route('register','routes/register.tsx'),
            
                route('/dashboard','routes/dashboard.tsx',[ 
                    route('/dashboard/add-courses','routes/addCources.tsx'),
                    route('/dashboard/all-courses','routes/allCourses.tsx'),
                    route('/dashboard/all-users','routes/allUsers.tsx'),
                    route('/dashboard/updateCourse/:id','routes/updateCourse.tsx',{
                                    // loader:({params any})=>fetch(`http://localhost:5001/courses/${Params.id}`) 
                                }),
                    
                ]),

                route('/','routes/layout.tsx',[ 
                    route('/home','routes/home.tsx'),
                route('/courses','routes/courses.tsx'),
                    
                ]),
               
                     
            
            ] satisfies RouteConfig;



// import { type RouteConfig, index, route } from "@react-router/dev/routes";
// import { type LoaderFunction } from "react-router-dom";

// // Define the loader function for the updateCourse route
// const updateCourseLoader: LoaderFunction = async ({ params }) => {
//     const { id } = params;
    
//     // Fetch the course data based on the id
//     const response = await fetch(`/api/courses/${id}`);
//     if (!response.ok) {
//         throw new Error('Course not found');
//     }
    
//     const course = await response.json();
//     return { course };
// };

// export default [
//     index("routes/login.tsx"),
//     route('register', 'routes/register.tsx'),
    
//     route('/dashboard', 'routes/dashboard.tsx', [
//         route('/dashboard/add-courses', 'routes/addCources.tsx'),
//         route('/dashboard/all-courses', 'routes/allCourses.tsx'),
//         route('/dashboard/all-users', 'routes/allUsers.tsx'),
//         route('/dashboard/uddateCourse/:id', 'routes/updateCourse.tsx', {
//             loader: updateCourseLoader, // Correctly attach the loader function here
//         }),
//     ]),

//     route('/', 'routes/layout.tsx', [
//         route('/home', 'routes/home.tsx'),
//         route('/courses', 'routes/courses.tsx'),
//     ]),
// ] satisfies RouteConfig;
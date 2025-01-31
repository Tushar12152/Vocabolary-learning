import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/login.tsx"), 
                route('register','routes/register.tsx'),
            
                route('/dashboard','routes/dashboard.tsx',[ 
                    route('/dashboard/add-courses','routes/addCources.tsx'),
                    route('/dashboard/all-courses','routes/allCourses.tsx'),
                    route('/dashboard/all-users','routes/allUsers.tsx'),
                    route('/dashboard/updateCourse/:id','routes/updateCourse.tsx',{
                                    // loader:({params: any})=>fetch(`http://localhost:5001/courses/${Params.id}`) 
                                }),
                    
                ]),

                route('/','routes/layout.tsx',[ 
                    route('/home','routes/home.tsx'),
                route('/courses','routes/courses.tsx'),
                route('/courseDetails/:id','routes/courseDetails.tsx'),
                    
                ]),
               
                     
            
            ] satisfies RouteConfig;


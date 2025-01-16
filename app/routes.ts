import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/login.tsx"), 
                route('register','routes/register.tsx'),
            
                route('/dashboard','routes/dashboard.tsx',[ 
                    route('/dashboard/add-courses','routes/addCources.tsx'),
                    route('/dashboard/all-courses','routes/allCourses.tsx'),
                    
                ]),
                route('/home','routes/home.tsx'),
                     
            
            ] satisfies RouteConfig;

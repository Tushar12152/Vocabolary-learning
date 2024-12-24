import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "Hooks/useAxiosSecure";

import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";


const Login = () => {

  const navigate=useNavigate
  const axiosSecure = useAxiosSecure()


  const { data: users = [] } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });


  console.log('users from db', users)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Corrected typo

    const email = e.currentTarget.email.value; // Access email field
    const password = e.currentTarget.password.value; // Access password field
    console.log("Email:", email, "Password:", password);

    const match = users.find((user: any) => user?.Email === email);

    if (match?.Email === email && match?.Password === password) {

      toast.success('logged in....')
      
    }

  };




  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left"></div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit} className="card-body">
              <h1 className="text-2xl font-bold text-center">Login Now!!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <p>
                Don't have any account? Please{" "}
                <Link to="register" className="text-red-300">
                  register
                </Link>
              </p>
              <div className="form-control mt-6">
                <button className="btn bg-gradient-to-b from-green-100 to-gray-100">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

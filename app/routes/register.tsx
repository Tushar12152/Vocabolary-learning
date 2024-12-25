import { useState } from "react";
import { Link } from "react-router"; // Use react-router-dom for navigation
import { imageUpload } from "Hooks/imageUpload"; // Ensure this hook is correctly implemented and imported
import useAxiosSecure from "Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Register = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const axiosSecure = useAxiosSecure()
  const [show,setShow]=useState(true)


  const { data: users = [] } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });




  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const imageFile = form.image.files[0];

    if (imageFile) {
      try {
        const img = await imageUpload(imageFile);
        const photo = img?.data?.display_url;

        const user = { Name: name, Email: email, Password: password, Photo: photo }

        const duplicate = users.find((user: any) => user?.Email === email);

        console.log(duplicate)

        if (!duplicate) {
          const result = await axiosSecure.post('/users', user)
          if (result?.data?.insertedId) {
            toast.success('Registration complete.......')
          }
        } else{
          toast.error('This email already used, please try with another email..')
        }



        // console.log(user);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    } else {
      console.warn("No image file selected.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
        <form onSubmit={handleSubmit} className="card-body">
          <h1 className="text-2xl font-bold text-center mb-4">Sign Up Now!</h1>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Profile Image</span>
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="input input-bordered"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="h-20 w-20 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="form-control mb-4 relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type={show? "password":'text'}
              placeholder="Password"
              className="input input-bordered"
              required
            />
      
            <span onClick={()=>setShow(!show)} className="absolute mt-12 ml-60"> {show? <FaEye />: <FaEyeSlash/>} </span>

          </div>

          <p className="mb-4">
            Already have an account?{" "}
            <Link to="/" className="text-red-500 hover:underline">
              Login
            </Link>
          </p>

          <div className="form-control mt-6">
            <button type="submit" className="btn bg-green-500 text-white">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

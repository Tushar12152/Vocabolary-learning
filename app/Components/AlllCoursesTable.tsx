import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from 'Hooks/useAxiosSecure';
import Swal from "sweetalert2";
import { MdDelete, MdUpdate } from 'react-icons/md';

const AllCoursesTable = () => {
    const axiosSecure = useAxiosSecure();

    const { data: courses = [], refetch } = useQuery({
        queryKey: ['course'],
        queryFn: async () => {
            const res = await axiosSecure.get('/courses');
            return res.data;
        },
    });

    console.log(courses)

    const handleDelete = (id: any) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {


                axiosSecure.delete(`courses/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            })
                            refetch()

                        }
                    })
            }
        });

    }

    
    const handleUpdate = (id: any) => {
        console.log(id)
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className=" text-gray-800   shadow-lg rounded-lg bg-white max-w-md  text-center font-bold text-3xl border border-green-500 p-2  shadow-black w-72 mx-auto">
                All Courses
            </h1>

            <div className="mt-12">
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Title</th>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Category</th>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Rating</th>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Update</th>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course: any, index: number) => (
                                <tr
                                    key={course?._id}
                                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                        } hover:bg-gray-100 transition-all`}
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={course?.imageUrl || 'https://via.placeholder.com/150'}
                                                        alt={`${course?.title} cover`}
                                                        className="object-cover rounded-full"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-gray-800 font-semibold">{course?.title}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{course?.categories}</td>
                                    <td className="px-4 py-3 text-gray-600">{course?.rating}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleUpdate(course._id)}
                                            className="text-blue-600 hover:text-blue-800 transition"
                                            title="Update course"
                                        >
                                            <MdUpdate className="text-2xl" />
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleDelete(course._id)}
                                            className="text-red-600 hover:text-red-800 transition"
                                            title="Delete course"
                                        >
                                            <MdDelete className="text-2xl" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default AllCoursesTable;

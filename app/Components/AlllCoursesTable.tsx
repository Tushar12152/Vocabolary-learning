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


    return (
        <div className="mt-20">
            <div>


                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Rting</th>
                                <th>Update</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                courses.map(course => (<tr key={course?._id}>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={course?.imageUrl}
                                                        alt="image cover" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{course?.title}</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {course?.categories}
                                    </td>
                                    <td>{course?.rating}</td>
                                    <th>
                                        <button className=" text-xl "><MdUpdate /></button>
                                    </th>
                                    <th>
                                        <button onClick={() => handleDelete(course?._id)} className=" text-xl"><MdDelete /></button>
                                    </th>
                                </tr>))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllCoursesTable;

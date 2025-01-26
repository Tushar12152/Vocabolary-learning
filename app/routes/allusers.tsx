import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from 'Hooks/useAxiosSecure';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';



const allusers = () => {

    const axiosSecure = useAxiosSecure();
    const [status, setStatus] = useState(true)
    const [loading, setloading] = useState(false)

    const { data: users = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    const handleEdit = async (id: any): Promise<void> => {
        const role = status ? 'admin' : 'user';
        loading ? '' : toast(`Updating role to: ${role}`)

        try {
            const res = await axios.patch(`http://localhost:5001/users/${id}`, { role }); // Payload must be an object
            console.log('Server response:', res.data);

            if (res.data.modifiedCount > 0) {
                refetch(); // Refresh user list after a successful update
                toast.success('User role updated successfully.');
                setloading(true)
            } else {
                toast.error('No changes made.');
                setloading(true)
            }
        } catch (error) {
            toast.error(`Error updating user role:, ${error}`);
            setloading(true)
        }
    };

    const handleDelete = async (id: any) => {
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


                axiosSecure.delete(`/users/${id}`)
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
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-center font-bold text-4xl text-gray-800 border border-green-500 p-4 shadow-lg rounded-lg bg-white max-w-md mx-auto">
                All Users
            </h1>

            <div className="mt-12">
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Name</th>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Email</th>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Password</th>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Role</th>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user: any, index: number) => (
                                <tr
                                    key={user?._id}
                                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                        } hover:bg-gray-100 transition-all`}
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user?.Photo || 'https://via.placeholder.com/150'}
                                                        alt={`${user?.Name}'s avatar`}
                                                        className="object-cover rounded-full"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-gray-800 font-semibold">{user?.Name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{user?.Email}</td>
                                    <td className="px-4 py-3 text-gray-600">{user?.Password}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            onClick={() => {
                                                setStatus(!status);
                                                handleEdit(user?._id);
                                            }}
                                            className={`inline-block cursor-pointer rounded-full px-3 py-1 text-sm font-medium ${user?.Role === 'admin'
                                                    ? 'bg-red-100 text-red-600'
                                                    : 'bg-blue-100 text-blue-600'
                                                }`}
                                        >
                                            {user?.Role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleDelete(user?._id)}
                                            className="text-red-600 hover:text-red-800 transition"
                                            title="Delete user"
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

export default allusers;
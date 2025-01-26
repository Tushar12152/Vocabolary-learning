import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from 'Hooks/useAxiosSecure';
import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';



const allusers = () => {

    const axiosSecure = useAxiosSecure();
    const [status, setStatus]=useState(true)

    const { data: users = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    const handleEdit = async (id: any): Promise<void> => {
        const role = status ? 'admin' : 'user';
        console.log('Updating role to:', role);
    
        try {
            const res = await axios.patch(`http://localhost:5001/users/${id}`, { role }); // Payload must be an object
            console.log('Server response:', res.data);
    
            if (res.data.modifiedCount > 0) {
                refetch(); // Refresh user list after a successful update
                console.log('User role updated successfully.');
            } else {
                console.log('No changes made.');
            }
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    return (
        <div>
              <h1 className="text-center font-bold text-3xl border border-green-500 p-2 shadow-2xl shadow-black w-72 mx-auto">All Users</h1>


              <div className="mt-20">
            <div>


                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Role</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user:any) => (<tr className='shadow-2xl' key={user?._id}>

                                    <td className=''>
                                        <div className="flex items-center gap-3 ">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user?.Photo}
                                                        alt="image cover" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user?.Name}</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user?.Email}
                                    </td>
                                    <td>{user?.Password}</td>
                                    <th onClick={()=>handleEdit(user?._id)}>
                                        <button onClick={()=>setStatus(!status)} className=" text-xl "> {user?.Role} </button>
                                    </th>
                                    <th>
                                        <button  className=" text-xl"><MdDelete /></button>
                                    </th>
                                </tr>))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    );
};

export default allusers;
import React from 'react';
import { Outlet } from 'react-router';
import Nav from '~/Components/Nav';

const layout = () => {
    return (
        <div>
             <Nav/>
             <Outlet/>
        </div>
    );
};

export default layout;
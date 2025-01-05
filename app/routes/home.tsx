import React from 'react';
import Banner from '~/Components/Banner';
import Nav from '~/Components/Nav';

const home = () => {
  return (
    <div>
       <Nav/>
        <Banner/>
         Home page for users
    </div>
  );
};

export default home;
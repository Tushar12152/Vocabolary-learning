import React from 'react';
import Banner from '~/Components/Banner';
import Nav from '~/Components/Nav';
import Quality from '~/Components/Quality';
import Skills from '~/Components/Skills';

const home = () => {
  return (
    <div>
       <Nav/>
        <Banner/>
        <Quality/>
        <Skills/>
         Home page for users
    </div>
  );
};

export default home;
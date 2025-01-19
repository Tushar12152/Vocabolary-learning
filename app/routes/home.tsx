import React from 'react';
import Achievement from '~/Components/Achievement';
import Banner from '~/Components/Banner';
import Quality from '~/Components/Quality';
import Skills from '~/Components/Skills';

const home = () => {
  return (
    <div>
      
        <Banner/>
        <Quality/>
        <Skills/>
        <Achievement/>
         Home page for users
    </div>
  );
};

export default home;
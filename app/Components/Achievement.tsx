import React from 'react';

const Achievement = () => {
    return (
      <div className=' bg-gray-100'>
          <div className='w-[80%] mx-auto'>
             <div className='pt-20 flex  items-center gap-2 ml-1' >
                 <p className="text-green-500 text-lg  ">Some Fun Fact   </p>
                 <span className='block w-32 border-b-2 border-green-500 '></span> 
             </div>
              <h1 className="text-5xl font-bold text-blue-900 mt-3">Our Great <span className='text-green-500 border-b-2 border-green-500 '>Achievement</span></h1>

        </div>
      </div>
    );
};

export default Achievement;
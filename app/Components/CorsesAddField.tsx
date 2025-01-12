import React from 'react';

const CoursesAddField = () => {
  const handleCourse = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Extracting individual fields
    const title = formData.get('title');
    const description = formData.get('description');
    const categories = formData.get('categories');
    const additionalInfo = formData.get('additionalInfo');
    const image = formData.get('image'); // This will be a File object
    const rating = formData.get('rating');
    const courseURL = formData.get('courseURL');

    // Logging the extracted data
    console.log({
      title,
      description,
      categories,
      additionalInfo,
      image,
      rating,
      courseURL,
    });

    // If you need to handle multiple values for the same field name
    // const allTitles = formData.getAll('title');
    // console.log(allTitles);
  };

  return (
    <div className='mt-36'>
      <form onSubmit={handleCourse}>
        <div className='w-full flex gap-6'>
          <input
            className='p-5 border w-[50%] border-green-500 rounded-md'
            placeholder='Title'
            type='text'
            name='title'
            required
          />
          <input
            className='p-5 border w-[50%] border-green-500 rounded-md'
            placeholder='Description'
            type='text'
            name='description'
            required
          />
        </div>

        <div className='w-full flex gap-6 mt-4'>
          <select
            className='p-5 border w-[50%] border-green-500 rounded-md'
            name='categories'
            defaultValue=''
            required
          >
            <option value='' disabled>
              Select Category
            </option>
            <option value='programming'>Programming</option>
            <option value='design'>Design</option>
            <option value='marketing'>Marketing</option>
          </select>
          <input
            className='p-5 border w-[50%] border-green-500 rounded-md'
            placeholder='Additional Info'
            type='text'
            name='additionalInfo'
            required
          />
        </div>

        <div className='w-full flex gap-6 mt-4'>
          {/* Image Upload */}
          <div className='w-[50%]'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Upload Image
            </label>
            <input
              className='p-5 border w-full border-green-500 rounded-md'
              type='file'
              name='image'
              accept='image/*'
              required
            />
          </div>

          {/* Rating */}
          <div className='w-[50%]'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Rating
            </label>
            <input
              className='p-5 border w-full border-green-500 rounded-md'
              type='number'
              name='rating'
              placeholder='Enter rating (e.g., 1-5)'
              min='1'
              max='5'
              required
            />
          </div>
        </div>

        <div className='w-full mt-4 flex gap-6'>
          <input
            className='p-5 border w-[50%] border-green-500 rounded-md'
            placeholder='Course URL'
            type='url'
            name='courseURL'
            required
          />
          <button
            className='p-5 w-[50%] bg-green-500 text-white rounded-md'
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CoursesAddField;

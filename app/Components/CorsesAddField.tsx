import React, { useState } from 'react';
import axios from 'axios';
import useAxiosSecure from 'Hooks/useAxiosSecure';
import toast from 'react-hot-toast';

interface CourseData {
  title: string;
  description: string;
  categories: string;
  additionalInfo: string;
  imageUrl: string;
  rating: number;
  courseURL: string;
}

const CoursesAddField: React.FC = () => {
  const [courseData, setCourseData] = useState<Omit<CourseData, 'imageUrl'>>({
    title: '',
    description: '',
    categories: '',
    additionalInfo: '',
    rating: 1,
    courseURL: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const axiosSecure=useAxiosSecure()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const uploadImageToImgBB = async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', image);
    const { data } = await axios.post(
      'https://api.imgbb.com/1/upload?key=400a20a4420cbd865f5a97bb6cd5db43',
      formData
    );
    return data.data.url;
  };

  const handleCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) {
      setUploadStatus('Please select an image to upload.');
      return;
    }

    try {
      setUploadStatus('Uploading image...');
      const imageUrl = await uploadImageToImgBB(imageFile);
      setUploadStatus('Image uploaded successfully.');

      const completeCourseData: CourseData = {
        ...courseData,
        imageUrl,
      };

      console.log('Course Data:', completeCourseData);
      // Replace with your backend API endpoint
      const result = await axiosSecure.post('/courses', completeCourseData);
      if(result?.data){
        toast.success('Successfully added course')
      }
      
    } catch (error) {
      setUploadStatus('Image upload failed. Please try again.');
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className=" max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-20  border border-green-500 p-2 shadow-lg shadow-black w-72 mx-auto">Add New Course</h2>
   
    <form onSubmit={handleCourse} className="space-y-8">
      {/* Title and Description */}
      <div className="flex flex-col sm:flex-row gap-6">
        <input
          className="p-4 border border-gray-300 w-full sm:w-1/2 rounded-md focus:ring focus:ring-green-300 focus:outline-none"
          placeholder="Course Title"
          type="text"
          name="title"
          value={courseData.title}
          onChange={handleInputChange}
          required
        />
        <input
          className="p-4 border border-gray-300 w-full sm:w-1/2 rounded-md focus:ring focus:ring-green-300 focus:outline-none"
          placeholder="Course Description"
          type="text"
          name="description"
          value={courseData.description}
          onChange={handleInputChange}
          required
        />
      </div>
  
      {/* Category and Additional Info */}
      <div className="flex flex-col sm:flex-row gap-6">
        <select
          className="p-4 border border-gray-300 w-full sm:w-1/2 rounded-md focus:ring focus:ring-green-300 focus:outline-none"
          name="categories"
          value={courseData.categories}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="programming">Programming</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
        </select>
        <input
          className="p-4 border border-gray-300 w-full sm:w-1/2 rounded-md focus:ring focus:ring-green-300 focus:outline-none"
          placeholder="Additional Info"
          type="text"
          name="additionalInfo"
          value={courseData.additionalInfo}
          onChange={handleInputChange}
          required
        />
      </div>
  
      {/* Image Upload and Preview */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
          <input
            className="p-4 border border-gray-300 w-full rounded-md focus:ring focus:ring-green-300 focus:outline-none"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
  
        {/* Image Preview */}
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
          <div
            className={`border border-gray-300 rounded-md h-40 flex items-center justify-center ${
              imagePreview ? 'shadow-md' : 'bg-gray-100'
            }`}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Uploaded Preview"
                className="h-full w-full object-cover rounded-md"
              />
            ) : (
              <span className="text-gray-400">No image uploaded</span>
            )}
          </div>
        </div>
      </div>
  
      {/* Rating */}
      <div className="flex flex-col sm:flex-row gap-6">
        <input
          className="p-4 border border-gray-300 w-full sm:w-1/2 rounded-md focus:ring focus:ring-green-300 focus:outline-none"
          type="number"
          name="rating"
          value={courseData.rating}
          onChange={handleInputChange}
          placeholder="Enter rating (1-5)"
          min="1"
          max="5"
          required
        />
        <input
          className="p-4 border border-gray-300 w-full sm:w-1/2 rounded-md focus:ring focus:ring-green-300 focus:outline-none"
          placeholder="Course URL"
          type="url"
          name="courseURL"
          value={courseData.courseURL}
          onChange={handleInputChange}
          required
        />
      </div>
  
      {/* Submit Button */}
      <button
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-md transition duration-200 focus:outline-none focus:ring focus:ring-green-300"
        type="submit"
      >
        Submit Course
      </button>
    </form>
  
    {/* Upload Status */}
    {uploadStatus && (
      <p className="mt-6 text-center text-sm font-medium text-red-500">{uploadStatus}</p>
    )}
  </div>
  

  );
};

export default CoursesAddField;

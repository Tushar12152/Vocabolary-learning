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
  courseSummaryVideo: string; // New field for video link
}

const CoursesAddFieldWithSummary: React.FC = () => {
  const [courseData, setCourseData] = useState<Omit<CourseData, 'imageUrl'>>({
    title: '',
    description: '',
    categories: '',
    additionalInfo: '',
    rating: 1,
    courseURL: '',
    courseSummaryVideo: '', // Initialize new field
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const axiosSecure = useAxiosSecure();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=4bc01cc94bda9032ec20e7c1f7b31d85`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data && response.data.data && response.data.data.url) {
        return response.data.data.url; // Return the uploaded image URL
      } else {
        throw new Error('Invalid response from ImgBB');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Image upload failed');
    }
  };

  const handleCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const imageput = (e.target as HTMLFormElement).image.value;


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
      if (result?.data) {
        toast.success('Successfully added course');
        // Reset form after successful submission
        setCourseData({
          title: '',
          description: '',
          categories: '',
          additionalInfo: '',
          rating: 1,
          courseURL: '',
          courseSummaryVideo: '',
        });
        setImageFile(null);
        setImagePreview(null);
        setUploadStatus('');
      }
    } catch (error) {
      setUploadStatus('Image upload failed. Please try again.');
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg p-8 transform transition-all hover:shadow-3xl hover:scale-105">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10 border-b-4 border-green-500 pb-4">
        Add New Course
      </h2>

      <form onSubmit={handleCourse} className="space-y-8">
        {/* Title and Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
            <input
              className="p-4 border border-gray-300 w-full rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none transition-all"
              placeholder="Course Title"
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course Description</label>
            <input
              className="p-4 border border-gray-300 w-full rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none transition-all"
              placeholder="Course Description"
              type="text"
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Category and Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              className="p-4 border border-gray-300 w-full rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none transition-all"
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
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Info</label>
            <input
              className="p-4 border border-gray-300 w-full rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none transition-all"
              placeholder="Additional Info"
              type="text"
              name="additionalInfo"
              value={courseData.additionalInfo}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Course Summary Video Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Course Summary Video Link</label>
          <input
            className="p-4 border border-gray-300 w-full rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none transition-all"
            placeholder="Enter the video link for course summary"
            type="url"
            name="courseSummaryVideo"
            value={courseData.courseSummaryVideo}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Image Upload and Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
            <input
              className="p-4 border border-gray-300 w-full rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none transition-all"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image Preview</label>
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

        {/* Rating and Course URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <input
              className="p-4 border border-gray-300 w-full rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none transition-all"
              type="number"
              name="rating"
              value={courseData.rating}
              onChange={handleInputChange}
              placeholder="Enter rating (1-5)"
              min="1"
              max="5"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course URL</label>
            <input
              className="p-4 border border-gray-300 w-full rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none transition-all"
              placeholder="Course URL"
              type="url"
              name="courseURL"
              value={courseData.courseURL}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 transform hover:scale-105"
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

export default CoursesAddFieldWithSummary;
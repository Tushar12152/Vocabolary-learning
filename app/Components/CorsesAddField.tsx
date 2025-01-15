import React, { useState } from 'react';
import axios from 'axios';
import useAxiosSecure from 'Hooks/useAxiosSecure';

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
      'https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY',
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
      console.log(result);
    } catch (error) {
      setUploadStatus('Image upload failed. Please try again.');
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="mt-36">
      <form onSubmit={handleCourse}>
        <div className="w-full flex gap-6">
          <input
            className="p-5 border w-[50%] border-green-500 rounded-md"
            placeholder="Title"
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleInputChange}
            required
          />
          <input
            className="p-5 border w-[50%] border-green-500 rounded-md"
            placeholder="Description"
            type="text"
            name="description"
            value={courseData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="w-full flex gap-6 mt-4">
          <select
            className="p-5 border w-[50%] border-green-500 rounded-md"
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
            className="p-5 border w-[50%] border-green-500 rounded-md"
            placeholder="Additional Info"
            type="text"
            name="additionalInfo"
            value={courseData.additionalInfo}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="w-full flex gap-6 mt-4">
          <div className="w-[50%]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              className="p-5 border w-full border-green-500 rounded-md"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="mt-2 h-32 w-32 object-cover"
              />
            )}
          </div>

          <div className="w-[50%]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <input
              className="p-5 border w-full border-green-500 rounded-md"
              type="number"
              name="rating"
              value={courseData.rating}
              onChange={handleInputChange}
              placeholder="Enter rating (e.g., 1-5)"
              min="1"
              max="5"
              required
            />
          </div>
        </div>

        <div className="w-full mt-4 flex gap-6">
          <input
            className="p-5 border w-[50%] border-green-500 rounded-md"
            placeholder="Course URL"
            type="url"
            name="courseURL"
            value={courseData.courseURL}
            onChange={handleInputChange}
            required
          />
          <button
            className="p-5 w-[50%] bg-green-500 text-white rounded-md"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {uploadStatus && (
        <p className="mt-4 text-center text-red-500">{uploadStatus}</p>
      )}
    </div>
  );
};

export default CoursesAddField;

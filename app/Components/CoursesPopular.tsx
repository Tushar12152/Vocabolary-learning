import React from "react";

interface CourseCardProps {
  image: string;
  price: string;
  category: string;
  title: string;
  lessons: number;
  duration: string;
  rating: number;
  level: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  image,
  price,
  category,
  title,
  lessons,
  duration,
  rating,
  level,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">{category}</span>
        <h3 className="text-lg font-semibold mt-2">{title}</h3>
        <div className="flex items-center text-gray-600 text-sm mt-2">
          <span className="mr-2">📚 {lessons} Lessons</span>
          <span className="mr-2">⏳ {duration}</span>
          <span>⭐ {rating.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-700 text-sm">{level}</span>
          <span className="bg-green-600 text-white px-3 py-1 rounded-full">{price}</span>
        </div>
      </div>
    </div>
  );
};

const CourseList: React.FC = () => {
  const courses = [
    {
      image: "https://via.placeholder.com/300",
      price: "$265",
      category: "Business",
      title: "Financial Security Thinking And Principles Theory",
      lessons: 6,
      duration: "4 hours",
      rating: 4.5,
      level: "All Levels",
    },
    {
      image: "https://via.placeholder.com/300",
      price: "$250",
      category: "Finance",
      title: "Professional Ceramic Moulding For Beginners",
      lessons: 15,
      duration: "4 hours",
      rating: 5.0,
      level: "All Levels",
    },
    {
      image: "https://via.placeholder.com/300",
      price: "Free",
      category: "UI/UX Design",
      title: "Basic Fundamentals Of Interior & Graphics Design",
      lessons: 16,
      duration: "22 hours 30 minutes",
      rating: 5.0,
      level: "Intermediate",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
        Choose Our <span className="text-green-600">Top Courses</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;

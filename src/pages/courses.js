import React, { useEffect, useState, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Fallback data shown if API fails or times out
const fallbackCourses = [
  {
    id: '1',
    title: 'React Mastery',
    price: '₹499',
    thumbnail: 'https://via.placeholder.com/350x200?text=React+Course',
  },
  {
    id: '2',
    title: 'Node.js Bootcamp',
    price: '₹699',
    thumbnail: 'https://via.placeholder.com/350x200?text=Node+Course',
  },
];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const usedFallback = useRef(false); // ✅ fix for ESLint warning

  useEffect(() => {
    const fetchWithTimeout = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort(); // cancel the request
        setCourses(fallbackCourses); // set fallback data
        usedFallback.current = true;
        setLoading(false);
      }, 2000); // 2 second timeout

      try {
        const response = await fetch('https://lms-course-data.onrender.com/view/data', {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        if (!usedFallback.current) {
          setCourses(fallbackCourses);
        }
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWithTimeout();
  }, []);

  if (loading) {
    return (
      <div className='pt-[130px] p-[20px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <h1 className='text-3xl text-center mb-4'>Our Online Courses</h1>
        <div className='text-center mb-4 animate-pulse'>Loading...</div>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className='h-[400px] w-[370px] bg-gray-800 text-white p-2'>
            <Skeleton height={200} />
            <Skeleton height={30} className='mt-4' />
            <Skeleton height={30} className='mt-2' />
            <Skeleton height={40} className='mt-4' />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='pt-[160px] px-[100px]'>
      <h1 className='text-3xl text-center mb-4'>Our Online Courses</h1>
      <div  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {courses.map((course) => (
        <div key={course.id} className='h-[400px] w-[370px] bg-gray-800 text-white p-2'>
          <img
            src={course.thumbnail}
            alt={course.title}
            className='w-full h-[200px] object-cover'
          />
          <h1 className='text-2xl text-center p-4 font-semibold'>{course.title}</h1>
          <h1 className='text-2xl text-green-400 text-center p-2 font-semibold'>{course.price}</h1>
          <button className='bg-green-500 text-white p-2 rounded w-full'>Read More</button>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Courses; 
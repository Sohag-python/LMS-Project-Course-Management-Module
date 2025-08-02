import { useEffect, useState } from 'react';
import { fetchCourses, fetchCategories, fetchInstructors } from '../services/api';
import { Link } from 'react-router-dom';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterInstructor, setFilterInstructor] = useState('');

  useEffect(() => {
    // Load courses, categories, instructors when component mounts
    const loadData = async () => {
      try {
        const [courseRes, categoryRes, instructorRes] = await Promise.all([
          fetchCourses({ category: filterCategory, instructor: filterInstructor }),
          fetchCategories(),
          fetchInstructors(),
        ]);
        if (courseRes?.data) setCourses(courseRes.data);
        if (categoryRes?.data) setCategories(categoryRes.data);
        if (instructorRes?.data) setInstructors(instructorRes.data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [filterCategory, filterInstructor]);

  return (
    <div>
      {/* Example filter UI */}
      <select onChange={e => setFilterCategory(e.target.value)} value={filterCategory}>
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <select onChange={e => setFilterInstructor(e.target.value)} value={filterInstructor}>
        <option value="">All Instructors</option>
        {instructors.map(inst => (
          <option key={inst.id} value={inst.id}>{inst.name}</option>
        ))}
      </select>

      {/* Courses list */}
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`}>{course.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

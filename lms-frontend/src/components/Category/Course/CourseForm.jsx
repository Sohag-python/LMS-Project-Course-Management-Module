import { useState, useEffect } from 'react';
import { fetchCourse, createCourse, updateCourse, fetchCategories, fetchInstructors } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function CourseForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [instructorIds, setInstructorIds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchCategories().then(res => setCategories(res.data));
    fetchInstructors().then(res => setInstructors(res.data));
    if (id) {
      fetchCourse(id).then(res => {
        const course = res.data;
        setTitle(course.title);
        setDescription(course.description);
        setCategoryId(course.category.id);
        setInstructorIds(course.instructors.map(i => i.id));
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      category_id: categoryId,
      instructor_ids: instructorIds,
    };
    if (id) {
      await updateCourse(id, data);
    } else {
      await createCourse(data);
    }
    navigate('/courses');
  };

  const handleInstructorChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(parseInt(options[i].value));
      }
    }
    setInstructorIds(selected);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit' : 'Add'} Course</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      /><br />

      <label>Category:</label>
      <select
        value={categoryId}
        onChange={e => setCategoryId(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select><br />

      <label>Instructors (Ctrl+Click to select multiple):</label><br />
      <select
        multiple
        value={instructorIds}
        onChange={handleInstructorChange}
        required
        style={{ width: '200px', height: '100px' }}
      >
        {instructors.map(ins => (
          <option key={ins.id} value={ins.id}>
            {ins.user.first_name} {ins.user.last_name} ({ins.user.username})
          </option>
        ))}
      </select><br />

      <button type="submit">Save</button>
    </form>
  );
}

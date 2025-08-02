import { useEffect, useState } from 'react';
import { fetchCategories, deleteCategory } from '../services/api';
import { Link } from 'react-router-dom';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await fetchCategories();
    setCategories(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete?')) {
      await deleteCategory(id);
      loadCategories();
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <Link to="/categories/new">Add Category</Link>
      <ul>
        {categories.map(cat => (
          <li key={cat.id}>
            {cat.name} - {cat.description} {' '}
            <Link to={`/categories/edit/${cat.id}`}>Edit</Link> {' '}
            <button onClick={() => handleDelete(cat.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { createCategory, updateCategory, fetchCategory } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function CategoryForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchCategory(id).then(res => {
        setName(res.data.name);
        setDescription(res.data.description);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateCategory(id, { name, description });
    } else {
      await createCategory({ name, description });
    }
    navigate('/categories');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit' : 'Add'} Category</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      /><br/>
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      /><br/>
      <button type="submit">Save</button>
    </form>
  );
}

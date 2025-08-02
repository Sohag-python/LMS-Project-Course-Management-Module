import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,  // for session auth
});

export const login = (username, password) =>
  api.post('/api-auth/login/', { username, password });

export const logout = () => api.post('/api-auth/logout/');

export const fetchCategories = () => api.get('/categories/');
export const fetchCategory = (id) => api.get(`/categories/${id}/`);
export const createCategory = (data) => api.post('/categories/', data);
export const updateCategory = (id, data) => api.put(`/categories/${id}/`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}/`);

export const fetchInstructors = () => api.get('/instructors/');
export const fetchCourses = (params = {}) => api.get('/courses/', { params });
export const createCourse = (data) => api.post('/courses/', data);
export const updateCourse = (id, data) => api.put(`/courses/${id}/`, data);
export const deleteCourse = (id) => api.delete(`/courses/${id}/`);

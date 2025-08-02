import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CategoryList from "./components/CategoryList.jsx";
import CategoryForm from "./components/CategoryForm.jsx";
import CourseList from "./components/CourseList.jsx";
import CourseForm from "./components/CourseForm.jsx";
import InstructorList from "./components/InstructorList.jsx";
import Login from "./components/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Category Routes */}
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/new" element={<CategoryForm />} />
        <Route path="/categories/edit/:id" element={<CategoryForm />} />

        {/* Course Routes */}
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/new" element={<CourseForm />} />
        <Route path="/courses/edit/:id" element={<CourseForm />} />

        {/* Instructor List */}
        <Route path="/instructors" element={<InstructorList />} />

        {/* Default redirect to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

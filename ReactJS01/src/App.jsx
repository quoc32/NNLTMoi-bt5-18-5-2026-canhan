import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import SearchResults from './pages/SearchResults';
import CoursePlayer from './pages/CoursePlayer';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/learn/:id" element={<CoursePlayer />} />
        <Route path="/courses" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;

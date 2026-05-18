import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const getHomeCourses = () => api.get('/courses/home');
export const getCourses = (params) => api.get('/courses', { params });
export const getCourseDetails = (id) => api.get(`/courses/${id}`);

export default api;

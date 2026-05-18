const express = require('express');
const router = express.Router();
const { 
    getHomeCourses, 
    getCourses, 
    getCourseDetails 
} = require('../controllers/courseController');

router.get('/home', getHomeCourses);
router.get('/', getCourses);
router.get('/:id', getCourseDetails);

module.exports = router;

const User = require('./User');
const Course = require('./Course');
const Lesson = require('./Lesson');

// Relationships
Course.hasMany(Lesson, { as: 'lessons', foreignKey: 'courseId' });
Lesson.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = {
    User,
    Course,
    Lesson
};

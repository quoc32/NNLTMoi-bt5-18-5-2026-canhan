const { Course, Lesson } = require('../models');
const { Op } = require('sequelize');

// Get courses for Home Page (Latest, Best Seller, Flash Sale)
exports.getHomeCourses = async (req, res) => {
    try {
        const latestCourses = await Course.findAll({
            limit: 8,
            order: [['createdAt', 'DESC']]
        });

        const bestSellers = await Course.findAll({
            where: { isBestSeller: true },
            limit: 8,
            order: [['studentCount', 'DESC']]
        });

        const flashSale = await Course.findAll({
            where: {
                flashSaleEnd: { [Op.gt]: new Date() },
                discount: { [Op.gt]: 0 }
            },
            limit: 4
        });

        res.status(200).json({
            success: true,
            data: {
                latest: latestCourses,
                bestSellers,
                flashSale
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Search and Filter Courses
exports.getCourses = async (req, res) => {
    try {
        const { 
            search, category, level, minPrice, maxPrice, 
            minRating, sort, type 
        } = req.query;

        let where = {};

        if (search) {
            where[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { instructor: { [Op.like]: `%${search}%` } }
            ];
        }

        if (category) {
            where.category = category;
        }

        if (level) {
            where.level = level;
        }

        // Price filter
        if (type === 'Miễn phí') {
            where.price = 0;
        } else if (type === 'Có phí') {
            where.price = { [Op.gt]: 0 };
        }

        if (minPrice || maxPrice) {
            where.price = {
                ...(where.price || {}),
                ...(minPrice && { [Op.gte]: minPrice }),
                ...(maxPrice && { [Op.lte]: maxPrice })
            };
        }

        if (minRating) {
            where.rating = { [Op.gte]: minRating };
        }

        // Sorting
        let order = [['createdAt', 'DESC']];
        if (sort === 'Giá cao đến thấp') order = [['price', 'DESC']];
        if (sort === 'Giá thấp đến cao') order = [['price', 'ASC']];
        if (sort === 'Đánh giá cao nhất') order = [['rating', 'DESC']];

        const courses = await Course.findAll({ where, order });

        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Single Course Details
exports.getCourseDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByPk(id, {
            include: [{ model: Lesson, as: 'lessons' }]
        });

        if (!course) {
            return res.status(404).json({ success: false, message: 'Khóa học không tồn tại' });
        }

        // Get similar courses
        const similarCourses = await Course.findAll({
            where: {
                category: course.category,
                id: { [Op.ne]: id }
            },
            limit: 4
        });

        res.status(200).json({
            success: true,
            data: {
                course,
                similarCourses
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const { Course, Lesson } = require('../models');
const { Op } = require('sequelize');

// Get courses for Home Page (Latest, Best Seller, Most Viewed, Flash Sale)
exports.getHomeCourses = async (req, res) => {
    try {
        const latestCourses = await Course.findAll({
            limit: 8,
            order: [['createdAt', 'DESC']]
        });

        // Top 10 Best Sellers
        const bestSellers = await Course.findAll({
            limit: 10,
            order: [['studentCount', 'DESC']]
        });

        // Top 10 Most Viewed
        const mostViewed = await Course.findAll({
            limit: 10,
            order: [['views', 'DESC']]
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
                mostViewed,
                flashSale
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Search and Filter Courses with Pagination
exports.getCourses = async (req, res) => {
    try {
        const { 
            search, category, level, minPrice, maxPrice, 
            minRating, sort, type, page, limit 
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
        if (sort === 'Xem nhiều nhất') order = [['views', 'DESC']];
        if (sort === 'Bán chạy nhất') order = [['studentCount', 'DESC']];

        // Pagination setup
        const pageNum = page ? parseInt(page) : null;
        const limitNum = limit ? parseInt(limit) : 6;

        let queryOptions = { where, order };
        if (pageNum) {
            queryOptions.limit = limitNum;
            queryOptions.offset = (pageNum - 1) * limitNum;
        }

        const { count, rows } = await Course.findAndCountAll(queryOptions);

        res.status(200).json({
            success: true,
            count,
            totalPages: pageNum ? Math.ceil(count / limitNum) : 1,
            currentPage: pageNum || 1,
            limit: pageNum ? limitNum : count,
            data: rows
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

const { sequelize } = require('./config/db');
const { Course, Lesson } = require('./models');

const seedData = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced for seeding...');

        const courses = await Course.bulkCreate([
            {
                title: 'Khóa học React Pro cho người mới bắt đầu',
                instructor: 'Sơn Đặng',
                category: 'Lập trình',
                level: 'Mới bắt đầu',
                price: 1200000,
                discount: 20,
                rating: 4.8,
                studentCount: 1540,
                thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
                trailerUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
                description: 'Học React từ cơ bản đến nâng cao với dự án thực tế.',
                isBestSeller: true,
                flashSaleEnd: new Date(Date.now() + 86400000 * 2) // 2 days from now
            },
            {
                title: 'Thiết kế UI/UX hiện đại với Figma',
                instructor: 'Trần Mạnh',
                category: 'Thiết kế',
                level: 'Trung cấp',
                price: 850000,
                discount: 15,
                rating: 4.9,
                studentCount: 890,
                thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800',
                trailerUrl: 'https://www.youtube.com/embed/jwCm9zkp1U8',
                description: 'Làm chủ Figma và quy trình thiết kế sản phẩm số.',
                isBestSeller: true,
                flashSaleEnd: new Date(Date.now() + 86400000) // 1 day from now
            },
            {
                title: 'Digital Marketing Thực Chiến 2024',
                instructor: 'Hoàng Lan',
                category: 'Marketing',
                level: 'Mới bắt đầu',
                price: 500000,
                discount: 50,
                rating: 4.5,
                studentCount: 2100,
                thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
                trailerUrl: 'https://www.youtube.com/embed/Z0p97O_f7eY',
                description: 'Chiến lược marketing đa kênh cho doanh nghiệp nhỏ.',
                isBestSeller: false,
                flashSaleEnd: new Date(Date.now() + 3600000 * 5) // 5 hours from now
            },
            {
                title: 'Node.js & Express - Xây dựng Backend chuyên nghiệp',
                instructor: 'Lê Quang',
                category: 'Lập trình',
                level: 'Trung cấp',
                price: 1500000,
                discount: 10,
                rating: 4.7,
                studentCount: 560,
                thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
                trailerUrl: 'https://www.youtube.com/embed/vJEO57B05Sg',
                description: 'Xây dựng API bảo mật và hiệu năng cao.',
                isBestSeller: false,
                slots: 20,
                availableSlots: 5
            }
        ]);

        // Add some lessons
        for (const course of courses) {
            await Lesson.bulkCreate([
                { title: 'Giới thiệu khóa học', duration: '5:00', chapter: 'Chương 1: Tổng quan', order: 1, courseId: course.id },
                { title: 'Cài đặt môi trường', duration: '12:00', chapter: 'Chương 1: Tổng quan', order: 2, courseId: course.id },
                { title: 'Bài học đầu tiên', duration: '15:00', chapter: 'Chương 2: Kiến thức cơ bản', order: 3, courseId: course.id },
            ]);
        }

        console.log('✅ Seeding completed!');
        process.exit();
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedData();

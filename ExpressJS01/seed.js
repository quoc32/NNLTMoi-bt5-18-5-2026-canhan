const { sequelize } = require('./config/db');
const { Course, Lesson } = require('./models');

const seedData = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced for seeding...');

        const courses = await Course.bulkCreate([
            // Lập trình
            {
                title: 'Khóa học React Pro cho người mới bắt đầu',
                instructor: 'Sơn Đặng',
                category: 'Lập trình',
                level: 'Mới bắt đầu',
                price: 1200000,
                discount: 20,
                rating: 4.8,
                studentCount: 1540,
                views: 8200,
                thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
                trailerUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
                description: 'Học React từ cơ bản đến nâng cao với dự án thực tế.',
                isBestSeller: true,
                flashSaleEnd: new Date(Date.now() + 86400000 * 2)
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
                views: 3400,
                thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
                trailerUrl: 'https://www.youtube.com/embed/vJEO57B05Sg',
                description: 'Xây dựng API bảo mật và hiệu năng cao.',
                isBestSeller: false
            },
            {
                title: 'Lập trình Javascript Fullstack từ Zero',
                instructor: 'Sơn Đặng',
                category: 'Lập trình',
                level: 'Mới bắt đầu',
                price: 2000000,
                discount: 30,
                rating: 4.9,
                studentCount: 2200,
                views: 11000,
                thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800',
                description: 'Làm chủ JavaScript từ cơ bản đến nâng cao và trở thành Fullstack Developer.',
                isBestSeller: true
            },
            {
                title: 'Lập trình Python và Khoa học dữ liệu',
                instructor: 'Nguyễn Văn Nam',
                category: 'Lập trình',
                level: 'Trung cấp',
                price: 1800000,
                discount: 15,
                rating: 4.6,
                studentCount: 950,
                views: 4200,
                thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800',
                description: 'Học Python cơ bản, phân tích dữ liệu, trực quan hóa và cơ bản Machine Learning.',
                isBestSeller: false
            },
            {
                title: 'Cấu trúc dữ liệu và Giải thuật với C++',
                instructor: 'Trần Bình',
                category: 'Lập trình',
                level: 'Trung cấp',
                price: 990000,
                discount: 25,
                rating: 4.5,
                studentCount: 450,
                views: 1800,
                thumbnail: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800',
                description: 'Nền tảng tư duy lập trình vững chắc với cấu trúc dữ liệu và giải thuật phổ biến.',
                isBestSeller: false
            },
            {
                title: 'Lập trình di động React Native thực chiến',
                instructor: 'Lê Quang',
                category: 'Lập trình',
                level: 'Chuyên gia',
                price: 2500000,
                discount: 10,
                rating: 4.8,
                studentCount: 300,
                views: 1500,
                thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
                description: 'Xây dựng ứng dụng di động cho cả iOS và Android chỉ với một cơ sở mã nguồn duy nhất.',
                isBestSeller: false
            },

            // Thiết kế
            {
                title: 'Thiết kế UI/UX hiện đại với Figma',
                instructor: 'Trần Mạnh',
                category: 'Thiết kế',
                level: 'Trung cấp',
                price: 850000,
                discount: 15,
                rating: 4.9,
                studentCount: 890,
                views: 5000,
                thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800',
                trailerUrl: 'https://www.youtube.com/embed/jwCm9zkp1U8',
                description: 'Làm chủ Figma và quy trình thiết kế sản phẩm số.',
                isBestSeller: true,
                flashSaleEnd: new Date(Date.now() + 86400000)
            },
            {
                title: 'Thiết kế đồ họa Photoshop chuyên nghiệp',
                instructor: 'Nguyễn Thị Hoa',
                category: 'Thiết kế',
                level: 'Mới bắt đầu',
                price: 750000,
                discount: 20,
                rating: 4.6,
                studentCount: 780,
                views: 4100,
                thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
                description: 'Cắt ghép, chỉnh sửa ảnh nghệ thuật và thiết kế ấn phẩm truyền thông bằng Photoshop.',
                isBestSeller: false
            },
            {
                title: 'Làm chủ Adobe Illustrator trong 30 ngày',
                instructor: 'Nguyễn Thị Hoa',
                category: 'Thiết kế',
                level: 'Mới bắt đầu',
                price: 790000,
                discount: 10,
                rating: 4.5,
                studentCount: 410,
                views: 2300,
                thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
                description: 'Thiết kế vector, logo, icon và vẽ minh họa chuyên nghiệp cùng Illustrator.',
                isBestSeller: false
            },
            {
                title: 'Thiết kế 3D với Blender cho người mới',
                instructor: 'Phạm Hùng',
                category: 'Thiết kế',
                level: 'Mới bắt đầu',
                price: 1100000,
                discount: 30,
                rating: 4.7,
                studentCount: 320,
                views: 1900,
                thumbnail: 'https://images.unsplash.com/photo-1617791160505-6f006e121980?w=800',
                description: 'Dựng hình 3D, tạo chất liệu và ánh sáng cơ bản cho mô hình game hoặc phim hoạt hình.',
                isBestSeller: false
            },

            // Marketing
            {
                title: 'Digital Marketing Thực Chiến 2024',
                instructor: 'Hoàng Lan',
                category: 'Marketing',
                level: 'Mới bắt đầu',
                price: 500000,
                discount: 50,
                rating: 4.5,
                studentCount: 2100,
                views: 9500,
                thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
                trailerUrl: 'https://www.youtube.com/embed/Z0p97O_f7eY',
                description: 'Chiến lược marketing đa kênh cho doanh nghiệp nhỏ.',
                isBestSeller: false,
                flashSaleEnd: new Date(Date.now() + 3600000 * 5)
            },
            {
                title: 'Quảng cáo Facebook & Google hiệu quả từ A-Z',
                instructor: 'Hoàng Lan',
                category: 'Marketing',
                level: 'Trung cấp',
                price: 1200000,
                discount: 25,
                rating: 4.7,
                studentCount: 1320,
                views: 6800,
                thumbnail: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=800',
                description: 'Tối ưu chi phí chạy ads, target đúng khách hàng mục tiêu để nâng cao doanh số.',
                isBestSeller: true
            },
            {
                title: 'SEO Website lên Top bền vững',
                instructor: 'Đỗ Minh',
                category: 'Marketing',
                level: 'Trung cấp',
                price: 950000,
                discount: 20,
                rating: 4.4,
                studentCount: 640,
                views: 2900,
                thumbnail: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800',
                description: 'Kỹ thuật tối ưu SEO onpage, offpage, nghiên cứu từ khóa giúp website tăng traffic tự nhiên.',
                isBestSeller: false
            },
            {
                title: 'Content Marketing - Nghệ thuật viết chạm cảm xúc',
                instructor: 'Đặng Mai',
                category: 'Marketing',
                level: 'Mới bắt đầu',
                price: 600000,
                discount: 40,
                rating: 4.8,
                studentCount: 510,
                views: 2400,
                thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800',
                description: 'Bí quyết viết bài bán hàng thu hút, xây dựng kế hoạch nội dung truyền thông đỉnh cao.',
                isBestSeller: false
            },

            // Kinh doanh
            {
                title: 'Khởi nghiệp kinh doanh online thực chiến',
                instructor: 'Nguyễn Phi Vân',
                category: 'Kinh doanh',
                level: 'Mới bắt đầu',
                price: 1600000,
                discount: 35,
                rating: 4.9,
                studentCount: 1750,
                views: 7200,
                thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
                description: 'Tất tần tật kinh nghiệm lập kế hoạch, lựa chọn sản phẩm, vận hành và quản trị dòng tiền.',
                isBestSeller: true
            },
            {
                title: 'Quản trị doanh nghiệp vừa và nhỏ',
                instructor: 'Trần Quốc Bảo',
                category: 'Kinh doanh',
                level: 'Chuyên gia',
                price: 2200000,
                discount: 15,
                rating: 4.7,
                studentCount: 480,
                views: 1600,
                thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
                description: 'Các mô hình quản lý nhân sự, quản lý tài chính và xây dựng văn hóa doanh nghiệp hiệu quả.',
                isBestSeller: false
            },
            {
                title: 'Kỹ năng bán hàng đỉnh cao - Telesales',
                instructor: 'Nguyễn Văn Minh',
                category: 'Kinh doanh',
                level: 'Mới bắt đầu',
                price: 690000,
                discount: 30,
                rating: 4.5,
                studentCount: 690,
                views: 3100,
                thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
                description: 'Kịch bản telesale thu hút, nghệ thuật xử lý từ chối và chốt sale nhanh chóng.',
                isBestSeller: false
            },
            {
                title: 'Đầu tư tài chính cá nhân thông minh',
                instructor: 'Nguyễn Phi Vân',
                category: 'Kinh doanh',
                level: 'Trung cấp',
                price: 1300000,
                discount: 20,
                rating: 4.8,
                studentCount: 1100,
                views: 5400,
                thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800',
                description: 'Hiểu về cổ phiếu, quỹ mở, vàng, bất động sản và cách xây dựng danh mục đầu tư an toàn.',
                isBestSeller: false
            },

            // Ngoại ngữ
            {
                title: 'Tiếng Anh giao tiếp tự tin từ mất gốc',
                instructor: 'Ms. Hana',
                category: 'Ngoại ngữ',
                level: 'Mới bắt đầu',
                price: 900000,
                discount: 40,
                rating: 4.8,
                studentCount: 2300,
                views: 12500,
                thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
                description: 'Lấy lại căn bản ngữ pháp, từ vựng và tự tin phát âm chuẩn Tây chỉ sau 3 tháng.',
                isBestSeller: true
            },
            {
                title: 'Luyện thi IELTS 6.5+ cấp tốc',
                instructor: 'Mr. David',
                category: 'Ngoại ngữ',
                level: 'Trung cấp',
                price: 2800000,
                discount: 15,
                rating: 4.9,
                studentCount: 1250,
                views: 6100,
                thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
                description: 'Chiến thuật làm bài nghe, nói, đọc, viết đạt điểm cao cùng ngân hàng đề thi thử mới nhất.',
                isBestSeller: true
            },
            {
                title: 'Tiếng Nhật N5-N4 cho người mới bắt đầu',
                instructor: 'Yuki Sensei',
                category: 'Ngoại ngữ',
                level: 'Mới bắt đầu',
                price: 1100000,
                discount: 25,
                rating: 4.6,
                studentCount: 850,
                views: 3900,
                thumbnail: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800',
                description: 'Học bảng chữ cái Hiragana, Katakana, Kanji cơ bản và cấu trúc câu đàm thoại hàng ngày.',
                isBestSeller: false
            },
            {
                title: 'Tiếng Trung giao tiếp thương mại thực tế',
                instructor: 'Vương Lão Sư',
                category: 'Ngoại ngữ',
                level: 'Trung cấp',
                price: 1500000,
                discount: 20,
                rating: 4.7,
                studentCount: 710,
                views: 3300,
                thumbnail: 'https://images.unsplash.com/photo-1525920980468-f140e797193f?w=800',
                description: 'Từ vựng chuyên ngành thương mại, đàm phán hợp đồng, giao dịch buôn bán với đối tác Trung Quốc.',
                isBestSeller: false
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

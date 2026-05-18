import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
    Users, Star, Clock, Calendar, ChevronRight, 
    PlayCircle, CheckCircle2, ShoppingCart, Info, 
    Share2, Heart, ArrowRight
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import { getCourseDetails } from '../utils/api';

const CourseDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [duration, setDuration] = useState(1); // 1, 6, 12 months

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getCourseDetails(id);
                setData(res.data.data);
            } catch (error) {
                console.error('Error fetching details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData(id);
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!data) return <div className="min-h-screen flex items-center justify-center">Course not found</div>;

    const { course, similarCourses } = data;

    // Group lessons by chapter
    const chapters = course.lessons?.reduce((acc, lesson) => {
        if (!acc[lesson.chapter]) acc[lesson.chapter] = [];
        acc[lesson.chapter].push(lesson);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar />

            {/* Breadcrumbs */}
            <div className="bg-white border-b border-gray-100 px-4 md:px-8 py-4">
                <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <Link to="/" className="hover:text-indigo-600 transition-colors">Trang chủ</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link to="/courses" className="hover:text-indigo-600 transition-colors">{course.category}</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 truncate">{course.title}</span>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Content */}
                    <div className="lg:col-span-2">
                        {/* Media Slider */}
                        <div className="bg-black rounded-[2.5rem] overflow-hidden shadow-2xl mb-10 relative group">
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                navigation
                                pagination={{ clickable: true }}
                                className="aspect-video"
                            >
                                <SwiperSlide>
                                    <div className="relative w-full h-full">
                                        <iframe 
                                            src={course.trailerUrl} 
                                            className="w-full h-full"
                                            title="YouTube video player" 
                                            frameBorder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={course.thumbnail} className="w-full h-full object-cover" alt="Banner 1" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200" className="w-full h-full object-cover" alt="Banner 2" />
                                </SwiperSlide>
                            </Swiper>
                        </div>

                        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100 mb-10">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{course.title}</h1>
                            
                            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
                                <div className="flex items-center gap-2 text-orange-500">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star key={s} className={`w-4 h-4 fill-current ${s <= course.rating ? '' : 'text-gray-200'}`} />
                                        ))}
                                    </div>
                                    <span className="font-bold text-gray-900">({course.rating})</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Users className="w-5 h-5 text-indigo-500" />
                                    <span className="font-medium">{course.studentCount} học viên đã tham gia</span>
                                </div>
                                {course.availableSlots && (
                                    <div className="flex items-center gap-2 text-red-500 bg-red-50 px-3 py-1 rounded-full animate-pulse">
                                        <Info className="w-4 h-4" />
                                        <span className="font-bold">Chỉ còn {course.availableSlots} chỗ trống (Mentor kèm 1:1)</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900">Mô tả khóa học</h2>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {course.description} Khóa học này được thiết kế để mang lại cho bạn những kiến thức thực tiễn nhất. Chúng tôi không chỉ dạy lý thuyết, mà tập trung vào việc giúp bạn xây dựng những dự án thật.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        'Hơn 50 bài giảng chất lượng cao',
                                        'Hỗ trợ giải đáp thắc mắc 24/7',
                                        'Chứng chỉ hoàn thành khóa học',
                                        'Truy cập trọn đời các tài liệu'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-gray-700">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Curriculum */}
                        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Nội dung khóa học</h2>
                            <div className="space-y-4">
                                {Object.entries(chapters).map(([chapter, lessons], idx) => (
                                    <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden">
                                        <div className="bg-gray-50/50 p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
                                            <h3 className="font-bold text-gray-900">{chapter}</h3>
                                            <span className="text-sm text-gray-500 font-medium">{lessons.length} bài học</span>
                                        </div>
                                        <div className="p-2 space-y-1">
                                            {lessons.map((lesson, lIdx) => (
                                                <div key={lIdx} className="flex items-center justify-between p-3 hover:bg-indigo-50/50 rounded-xl group cursor-pointer transition-all">
                                                    <div className="flex items-center gap-3">
                                                        <PlayCircle className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                                                        <span className="text-gray-700 group-hover:text-indigo-900 font-medium">{lesson.title}</span>
                                                    </div>
                                                    <span className="text-sm text-gray-400 font-medium">{lesson.duration}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Sticky Pricing */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-indigo-500/10 border border-indigo-50">
                            <div className="mb-8">
                                <div className="flex items-end gap-3 mb-2">
                                    <span className="text-4xl font-black text-indigo-600">
                                        {(course.price * (1 - course.discount/100) * duration).toLocaleString('vi-VN')}đ
                                    </span>
                                    {course.discount > 0 && (
                                        <span className="text-lg text-gray-400 line-through mb-1">
                                            {(Number(course.price) * duration).toLocaleString('vi-VN')}đ
                                        </span>
                                    )}
                                </div>
                                <div className="inline-block bg-red-50 text-red-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Giảm giá {course.discount}% trong thời gian hạn chế
                                </div>
                            </div>

                            {/* Duration Selector */}
                            <div className="mb-10">
                                <p className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-indigo-500" />
                                    Thời hạn gia hạn gói học
                                </p>
                                <div className="grid grid-cols-3 gap-3">
                                    {[1, 6, 12].map(m => (
                                        <button 
                                            key={m}
                                            onClick={() => setDuration(m)}
                                            className={`py-3 px-2 rounded-2xl border-2 transition-all font-bold text-sm ${
                                                duration === m 
                                                ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-lg shadow-indigo-200' 
                                                : 'border-gray-100 text-gray-500 hover:border-indigo-200'
                                            }`}
                                        >
                                            {m} Tháng
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button 
                                    onClick={() => navigate(`/learn/${course.id}`)}
                                    className="w-full bg-indigo-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 text-lg"
                                >
                                    <ShoppingCart className="w-6 h-6" />
                                    Đăng ký học ngay
                                </button>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center gap-2 py-4 rounded-2xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-all">
                                        <Heart className="w-5 h-5" />
                                        Yêu thích
                                    </button>
                                    <button className="flex items-center justify-center gap-2 py-4 rounded-2xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-all">
                                        <Share2 className="w-5 h-5" />
                                        Chia sẻ
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Instructor" className="w-full h-full object-cover" alt="Instructor" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Giảng viên</p>
                                        <p className="font-bold text-gray-900">{course.instructor}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Courses */}
                <section className="mt-24">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Khóa học tương tự</h2>
                        <Link to="/courses" className="text-indigo-600 font-bold flex items-center gap-2 hover:underline">
                            Xem tất cả <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {similarCourses.map(c => (
                            <CourseCard key={c.id} course={c} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CourseDetail;

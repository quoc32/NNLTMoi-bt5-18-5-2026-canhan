import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import Countdown from '../components/Countdown';
import { getHomeCourses } from '../utils/api';
import { Sparkles, Trophy, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [courses, setCourses] = useState({ latest: [], bestSellers: [], flashSale: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getHomeCourses();
                setCourses(res.data.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#FDFDFF]">
            <Navbar />
            
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 px-4 md:px-8">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full -z-10"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-violet-600/10 blur-[100px] rounded-full -z-10"></div>

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-full text-indigo-600 font-bold text-sm mb-8 animate-bounce">
                            <Sparkles className="w-4 h-4" />
                            Khám phá tiềm năng của bạn
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-8">
                            Học mọi lúc, <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                                Phát triển mọi nơi
                            </span>
                        </h1>
                        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Tham gia cùng hơn 2 triệu học viên trên toàn cầu. Học từ những giảng viên hàng đầu và xây dựng sự nghiệp mơ ước của bạn ngay hôm nay.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <button className="bg-indigo-600 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all flex items-center gap-3 w-full sm:w-auto justify-center group">
                                Bắt đầu ngay
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="bg-white text-gray-700 font-bold py-4 px-10 rounded-2xl border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-all w-full sm:w-auto">
                                Tìm khóa học
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex-1 relative">
                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img 
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80" 
                                alt="Students" 
                                className="w-full aspect-[4/3] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Flash Sale Section */}
            {courses.flashSale?.length > 0 && (
                <section className="px-4 md:px-8 mb-24">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-indigo-600/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                            
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 relative z-10">
                                <div className="text-center md:text-left">
                                    <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
                                            <Rocket className="w-6 h-6 animate-pulse" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-white">Flash Sale Giờ Vàng</h2>
                                    </div>
                                    <p className="text-indigo-100 text-lg">Cơ hội duy nhất trong ngày. Giảm giá lên đến 70%!</p>
                                </div>
                                <Countdown targetDate={courses.flashSale[0].flashSaleEnd} />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                                {courses.flashSale.map(course => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Latest Courses */}
            <section className="px-4 md:px-8 mb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Khóa học mới nhất</h2>
                            <div className="w-12 h-1.5 bg-indigo-600 rounded-full"></div>
                        </div>
                        <Link to="/courses" className="text-indigo-600 font-bold flex items-center gap-2 hover:underline">
                            Xem tất cả <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {courses.latest.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Best Sellers */}
            <section className="px-4 md:px-8 mb-24 bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Khóa học bán chạy nhất</h2>
                            <div className="w-12 h-1.5 bg-orange-500 rounded-full"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {courses.bestSellers.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

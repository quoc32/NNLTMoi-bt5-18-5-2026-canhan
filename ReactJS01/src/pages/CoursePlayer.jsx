import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
    ChevronLeft, Play, CheckCircle2, Menu, 
    MessageSquare, FileText, Settings, HelpCircle
} from 'lucide-react';
import { getCourseDetails } from '../utils/api';

const CoursePlayer = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getCourseDetails(id);
                setData(res.data.data);
                if (res.data.data.course.lessons?.length > 0) {
                    setCurrentLesson(res.data.data.course.lessons[0]);
                }
            } catch (error) {
                console.error('Error fetching course for player:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="h-screen flex items-center justify-center bg-gray-900 text-white">Loading Player...</div>;
    if (!data) return <div className="h-screen flex items-center justify-center bg-gray-900 text-white">Course not found</div>;

    const { course } = data;

    // Group lessons by chapter
    const chapters = course.lessons?.reduce((acc, lesson) => {
        if (!acc[lesson.chapter]) acc[lesson.chapter] = [];
        acc[lesson.chapter].push(lesson);
        return acc;
    }, {});

    return (
        <div className="h-screen flex flex-col bg-[#0F172A] overflow-hidden">
            {/* Player Header */}
            <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0F172A] z-20">
                <div className="flex items-center gap-4">
                    <Link to={`/course/${course.id}`} className="text-gray-400 hover:text-white transition-colors">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <div className="h-6 w-[1px] bg-white/10"></div>
                    <h1 className="text-white font-bold truncate max-w-md hidden md:block">{course.title}</h1>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex flex-col items-end">
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Tiến độ của bạn</p>
                        <div className="flex items-center gap-3">
                            <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="w-1/3 h-full bg-indigo-500"></div>
                            </div>
                            <span className="text-xs text-white font-bold">33%</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-all"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Main Content (Video Player) */}
                <main className="flex-1 flex flex-col overflow-y-auto">
                    <div className="w-full aspect-video bg-black relative">
                        {currentLesson ? (
                            <iframe 
                                src={course.trailerUrl} // In real app, this would be lesson video
                                className="w-full h-full"
                                title="Video lesson"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                Chọn một bài học để bắt đầu
                            </div>
                        )}
                    </div>

                    <div className="p-8 max-w-4xl mx-auto w-full">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-white">{currentLesson?.title || 'Tổng quan'}</h2>
                            <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all">
                                Đã hoàn thành
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-8 border-b border-white/10 mb-8">
                            {['Tổng quan', 'Tài liệu', 'Hỏi đáp', 'Đánh giá'].map((tab, idx) => (
                                <button 
                                    key={tab} 
                                    className={`pb-4 text-sm font-bold transition-all relative ${idx === 0 ? 'text-indigo-500' : 'text-gray-500 hover:text-white'}`}
                                >
                                    {tab}
                                    {idx === 0 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"></div>}
                                </button>
                            ))}
                        </div>

                        <div className="text-gray-400 leading-relaxed space-y-4">
                            <p>Chào mừng bạn đến với bài học này. Trong phần này, chúng ta sẽ tìm hiểu về các khái niệm cốt lõi của khóa học {course.title}.</p>
                            <p>Hãy chắc chắn rằng bạn đã tải xuống các tài liệu đính kèm trong tab "Tài liệu" để theo dõi tốt nhất.</p>
                        </div>
                    </div>
                </main>

                {/* Sidebar Lesson List */}
                <aside className={`w-80 border-l border-white/10 bg-[#0F172A] flex flex-col transition-all duration-300 ${sidebarOpen ? 'mr-0' : '-mr-80'}`}>
                    <div className="p-6 border-b border-white/10">
                        <h3 className="text-white font-bold uppercase text-xs tracking-widest">Nội dung khóa học</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {Object.entries(chapters).map(([chapter, lessons], idx) => (
                            <div key={idx} className="border-b border-white/5">
                                <div className="bg-white/5 p-4 flex flex-col gap-1">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase">{chapter}</h4>
                                    <span className="text-[10px] text-gray-600">{lessons.length} bài học</span>
                                </div>
                                <div className="py-2">
                                    {lessons.map((lesson, lIdx) => (
                                        <button 
                                            key={lIdx}
                                            onClick={() => setCurrentLesson(lesson)}
                                            className={`w-full text-left px-6 py-4 flex items-center gap-4 transition-all hover:bg-white/5 ${currentLesson?.id === lesson.id ? 'bg-indigo-600/20 border-r-4 border-indigo-600' : ''}`}
                                        >
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${currentLesson?.id === lesson.id ? 'bg-indigo-600 text-white' : 'bg-white/10 text-gray-500'}`}>
                                                {currentLesson?.id === lesson.id ? <Play className="w-4 h-4 fill-current" /> : <span className="text-xs font-bold">{lIdx + 1}</span>}
                                            </div>
                                            <div className="flex-1">
                                                <p className={`text-sm font-medium leading-tight ${currentLesson?.id === lesson.id ? 'text-white' : 'text-gray-400'}`}>{lesson.title}</p>
                                                <span className="text-[10px] text-gray-600 mt-1 block">{lesson.duration}</span>
                                            </div>
                                            {lIdx === 0 && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default CoursePlayer;

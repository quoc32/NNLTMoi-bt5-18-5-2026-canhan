import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronDown, Star, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import { getCourses } from '../utils/api';

const SearchResults = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        level: '',
        type: '', // Miễn phí, Có phí
        minRating: 0,
        sort: 'Mới nhất'
    });
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        const fetchFiltered = async () => {
            setLoading(true);
            try {
                const res = await getCourses(filters);
                setCourses(res.data.data);
            } catch (error) {
                console.error('Filter error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFiltered();
    }, [filters]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: prev[key] === value ? '' : value }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                {/* Header & Search */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 mb-2">Tất cả khóa học</h1>
                        <p className="text-gray-500 font-medium">Tìm thấy {courses.length} kết quả phù hợp</p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <input 
                                type="text" 
                                placeholder="Tìm theo tên, giảng viên..."
                                className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all shadow-sm"
                                value={filters.search}
                                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            />
                            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                        </div>
                        
                        <div className="relative group">
                            <button className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-2xl font-bold text-gray-700 hover:border-indigo-600 transition-all shadow-sm whitespace-nowrap">
                                <span>Sắp xếp: {filters.sort}</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                                {['Mới nhất', 'Giá cao đến thấp', 'Giá thấp đến cao', 'Đánh giá cao nhất'].map(s => (
                                    <button 
                                        key={s}
                                        onClick={() => setFilters(prev => ({ ...prev, sort: s }))}
                                        className={`w-full text-left px-5 py-3 text-sm font-medium hover:bg-indigo-50 transition-colors ${filters.sort === s ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button 
                            onClick={() => setShowMobileFilters(true)}
                            className="lg:hidden p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-600/30"
                        >
                            <SlidersHorizontal className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar Filters */}
                    <aside className={`fixed lg:relative inset-0 z-40 lg:z-0 lg:block w-full lg:w-72 transform transition-transform duration-300 ${showMobileFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                        <div className="h-full lg:h-auto bg-white lg:bg-transparent p-8 lg:p-0 overflow-y-auto">
                            <div className="flex items-center justify-between mb-8 lg:hidden">
                                <h2 className="text-xl font-bold">Bộ lọc</h2>
                                <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-gray-100 rounded-xl">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {/* Category */}
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Danh mục</h3>
                                    <div className="space-y-3">
                                        {['Lập trình', 'Thiết kế', 'Marketing', 'Kinh doanh', 'Ngoại ngữ'].map(cat => (
                                            <label key={cat} className="flex items-center gap-3 group cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={filters.category === cat}
                                                    onChange={() => handleFilterChange('category', cat)}
                                                    className="w-5 h-5 rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-600/20"
                                                />
                                                <span className={`font-medium transition-colors ${filters.category === cat ? 'text-indigo-600' : 'text-gray-600 group-hover:text-gray-900'}`}>{cat}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Level */}
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Cấp độ</h3>
                                    <div className="space-y-3">
                                        {['Mới bắt đầu', 'Trung cấp', 'Chuyên gia'].map(lvl => (
                                            <label key={lvl} className="flex items-center gap-3 group cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={filters.level === lvl}
                                                    onChange={() => handleFilterChange('level', lvl)}
                                                    className="w-5 h-5 rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-600/20"
                                                />
                                                <span className={`font-medium transition-colors ${filters.level === lvl ? 'text-indigo-600' : 'text-gray-600 group-hover:text-gray-900'}`}>{lvl}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Type */}
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Giá cả</h3>
                                    <div className="space-y-3">
                                        {['Miễn phí', 'Có phí'].map(t => (
                                            <label key={t} className="flex items-center gap-3 group cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={filters.type === t}
                                                    onChange={() => handleFilterChange('type', t)}
                                                    className="w-5 h-5 rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-600/20"
                                                />
                                                <span className={`font-medium transition-colors ${filters.type === t ? 'text-indigo-600' : 'text-gray-600 group-hover:text-gray-900'}`}>{t}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Rating */}
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Đánh giá</h3>
                                    <div className="space-y-3">
                                        {[4, 3].map(star => (
                                            <label key={star} className="flex items-center gap-3 group cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={filters.minRating === star}
                                                    onChange={() => handleFilterChange('minRating', star)}
                                                    className="w-5 h-5 rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-600/20"
                                                />
                                                <div className="flex items-center gap-1">
                                                    <span className="font-medium text-gray-700">Từ {star}</span>
                                                    <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                                                    <span className="font-medium text-gray-700">trở lên</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Results Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="bg-gray-100 animate-pulse aspect-video rounded-3xl h-80"></div>
                                ))}
                            </div>
                        ) : courses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {courses.map(course => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-[2.5rem] p-12 text-center border border-gray-100">
                                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-10 h-10 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy khóa học</h3>
                                <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SearchResults;

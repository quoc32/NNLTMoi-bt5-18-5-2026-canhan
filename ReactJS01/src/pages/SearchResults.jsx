import React, { useState, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal, ChevronDown, Star, X, Layers, Sparkles, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import { getCourses } from '../utils/api';

const SearchResults = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [viewMode, setViewMode] = useState('lazy'); // 'lazy' or 'paginated'
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const [filters, setFilters] = useState({
        search: '',
        category: '',
        level: '',
        type: '', // Miễn phí, Có phí
        minRating: 0,
        sort: 'Mới nhất'
    });

    const sentinelRef = useRef(null);
    const isFirstRender = useRef(true);

    const categories = ['Tất cả', 'Lập trình', 'Thiết kế', 'Marketing', 'Kinh doanh', 'Ngoại ngữ'];

    // Core Fetch Function
    const fetchCourses = async (pageNumber, replaceExisting = false) => {
        if (pageNumber === 1 || replaceExisting) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }

        try {
            const apiFilters = {
                ...filters,
                // Clean category for "Tất cả"
                category: filters.category === 'Tất cả' || filters.category === '' ? undefined : filters.category,
                page: pageNumber,
                limit: 6
            };

            const res = await getCourses(apiFilters);
            const newCourses = res.data.data;
            setTotalPages(res.data.totalPages);
            setTotalCount(res.data.count);

            if (replaceExisting || pageNumber === 1) {
                setCourses(newCourses);
            } else {
                setCourses(prev => {
                    // Prevent duplicate course additions (helps with React dev mode double-mounting)
                    const existingIds = new Set(prev.map(c => c.id));
                    const uniqueNew = newCourses.filter(c => !existingIds.has(c.id));
                    return [...prev, ...uniqueNew];
                });
            }
        } catch (error) {
            console.error('Filter / Pagination error:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // 1. Trigger when filters or sorting changes -> RESET to Page 1
    useEffect(() => {
        setPage(1);
        fetchCourses(1, true);
    }, [filters.category, filters.level, filters.type, filters.minRating, filters.sort, filters.search]);

    // 2. Trigger when Page state changes (e.g. click pagination page, or observer triggers next page)
    useEffect(() => {
        if (page === 1) return;
        fetchCourses(page, viewMode === 'paginated');
    }, [page]);

    // 3. Trigger when View Mode (Lazy scroll / Pagination Buttons) changes -> RESET to Page 1
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setPage(1);
        fetchCourses(1, true);
    }, [viewMode]);

    // 4. Setup IntersectionObserver for Lazy Loading
    useEffect(() => {
        if (viewMode !== 'lazy' || page >= totalPages || loading || loadingMore) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage(prev => prev + 1);
            }
        }, {
            root: null,
            rootMargin: '100px', // start loading before user hits absolute bottom
            threshold: 0.1
        });

        const currentSentinel = sentinelRef.current;
        if (currentSentinel) {
            observer.observe(currentSentinel);
        }

        return () => {
            if (currentSentinel) {
                observer.unobserve(currentSentinel);
            }
        };
    }, [viewMode, page, totalPages, loading, loadingMore]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: prev[key] === value ? '' : value }));
    };

    const selectCategoryTab = (cat) => {
        setFilters(prev => ({ 
            ...prev, 
            category: cat === 'Tất cả' ? '' : cat 
        }));
    };

    const handlePageChange = (pageNum) => {
        if (pageNum < 1 || pageNum > totalPages) return;
        setPage(pageNum);
        // Smooth scroll to top of list
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#FDFDFF]">
            <Navbar />
            
            {/* Top Showcase Area */}
            <div className="bg-gradient-to-r from-indigo-900 via-indigo-850 to-violet-950 text-white pt-24 pb-36 px-4 md:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.15),transparent)] pointer-events-none" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
                
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest text-indigo-200 mb-6 border border-white/10">
                        <BookOpen className="w-3.5 h-3.5" />
                        Danh mục bài giảng trực tuyến
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 tracking-tight">
                        Khám Phá Các Khóa Học
                    </h1>
                    <p className="text-indigo-200 max-w-xl mx-auto font-medium text-base lg:text-lg">
                        Xây dựng lộ trình học tập tối ưu cùng các chuyên gia đầu ngành. Phát triển kỹ năng chuyên môn từ cơ bản đến chuyên sâu.
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 pb-24 relative z-20">
                {/* Search & Mode Bar */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 md:p-8 mb-12 flex flex-col gap-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        {/* Search Input */}
                        <div className="relative w-full lg:w-[480px]">
                            <input 
                                type="text" 
                                placeholder="Tìm theo tên khóa học hoặc giảng viên..."
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-medium text-gray-700 shadow-inner"
                                value={filters.search}
                                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            />
                            <Search className="absolute left-4 top-4.5 text-gray-400 w-5 h-5" />
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200/50 w-full md:w-auto self-stretch md:self-center justify-center">
                            <button 
                                onClick={() => setViewMode('lazy')}
                                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex-1 md:flex-initial whitespace-nowrap ${viewMode === 'lazy' ? 'bg-white text-indigo-600 shadow-md border border-gray-100' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                <Sparkles className="w-4 h-4" />
                                Cuộn vô tận (Lazy Load)
                            </button>
                            <button 
                                onClick={() => setViewMode('paginated')}
                                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex-1 md:flex-initial whitespace-nowrap ${viewMode === 'paginated' ? 'bg-white text-indigo-600 shadow-md border border-gray-100' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                <Layers className="w-4 h-4" />
                                Phân trang nút bấm
                            </button>
                        </div>
                    </div>

                    {/* Horizontal Interactive Category Tabs */}
                    <div className="border-t border-gray-100 pt-6">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent -mx-2 px-2">
                            {categories.map((cat) => {
                                const isSelected = (cat === 'Tất cả' && !filters.category) || filters.category === cat;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => selectCategoryTab(cat)}
                                        className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all duration-350 ${
                                            isSelected 
                                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 scale-[1.03]' 
                                                : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-gray-100/50'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Main Directory Area */}
                <div className="flex flex-col lg:flex-row gap-10">
                    
                    {/* Sidebar Filters */}
                    <aside className={`fixed lg:relative inset-0 z-40 lg:z-0 lg:block w-full lg:w-72 transform transition-transform duration-300 ${showMobileFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                        <div className="h-full lg:h-auto bg-white lg:bg-white p-8 lg:p-6 lg:rounded-3xl lg:border lg:border-gray-100 lg:shadow-md overflow-y-auto">
                            <div className="flex items-center justify-between mb-8 lg:hidden">
                                <h2 className="text-xl font-bold text-gray-900">Bộ lọc chi tiết</h2>
                                <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-gray-100 rounded-xl">
                                    <X className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {/* Sort Dropdown */}
                                <div>
                                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">Sắp xếp</h3>
                                    <div className="relative group">
                                        <button className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 px-4 py-3 rounded-2xl font-bold text-sm text-gray-700 hover:border-indigo-600 transition-all shadow-sm">
                                            <span>{filters.sort}</span>
                                            <ChevronDown className="w-4 h-4 text-gray-400" />
                                        </button>
                                        <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30 overflow-hidden">
                                            {['Mới nhất', 'Xem nhiều nhất', 'Bán chạy nhất', 'Giá cao đến thấp', 'Giá thấp đến cao', 'Đánh giá cao nhất'].map(s => (
                                                <button 
                                                    key={s}
                                                    onClick={() => setFilters(prev => ({ ...prev, sort: s }))}
                                                    className={`w-full text-left px-5 py-3.5 text-xs font-bold hover:bg-indigo-50 transition-colors ${filters.sort === s ? 'text-indigo-600 bg-indigo-50/50' : 'text-gray-600'}`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Level */}
                                <div>
                                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">Cấp độ</h3>
                                    <div className="space-y-3">
                                        {['Mới bắt đầu', 'Trung cấp', 'Chuyên gia'].map(lvl => (
                                            <label key={lvl} className="flex items-center gap-3.5 group cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={filters.level === lvl}
                                                    onChange={() => handleFilterChange('level', lvl)}
                                                    className="w-5 h-5 rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-600/20 transition-all"
                                                />
                                                <span className={`font-semibold text-sm transition-colors ${filters.level === lvl ? 'text-indigo-600' : 'text-gray-500 group-hover:text-gray-900'}`}>{lvl}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Type */}
                                <div>
                                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">Giá bán</h3>
                                    <div className="space-y-3">
                                        {['Miễn phí', 'Có phí'].map(t => (
                                            <label key={t} className="flex items-center gap-3.5 group cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={filters.type === t}
                                                    onChange={() => handleFilterChange('type', t)}
                                                    className="w-5 h-5 rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-600/20 transition-all"
                                                />
                                                <span className={`font-semibold text-sm transition-colors ${filters.type === t ? 'text-indigo-600' : 'text-gray-500 group-hover:text-gray-900'}`}>{t}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Rating */}
                                <div>
                                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">Đánh giá</h3>
                                    <div className="space-y-3">
                                        {[4, 3].map(star => (
                                            <label key={star} className="flex items-center gap-3.5 group cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={filters.minRating === star}
                                                    onChange={() => handleFilterChange('minRating', star)}
                                                    className="w-5 h-5 rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-600/20 transition-all"
                                                />
                                                <div className="flex items-center gap-1">
                                                    <span className="font-semibold text-sm text-gray-500">Từ {star}</span>
                                                    <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                                                    <span className="font-semibold text-sm text-gray-500">trở lên</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Results Area */}
                    <div className="flex-1">
                        {/* Results Count & Mobile Trigger */}
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-sm font-bold text-gray-400 bg-gray-100/50 px-4 py-1.5 rounded-full">
                                Tìm thấy <span className="text-indigo-600">{totalCount}</span> bài giảng
                            </p>
                            
                            <button 
                                onClick={() => setShowMobileFilters(true)}
                                className="lg:hidden flex items-center gap-2 bg-indigo-600 text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-indigo-600/30"
                            >
                                <SlidersHorizontal className="w-5 h-5" />
                                Bộ lọc
                            </button>
                        </div>

                        {/* Loading skeletons for first page */}
                        {loading && courses.length === 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="bg-white border border-gray-100 rounded-[2rem] p-5 space-y-4 animate-pulse">
                                        <div className="bg-gray-150 aspect-video rounded-2xl w-full" />
                                        <div className="h-4 bg-gray-150 rounded w-1/3" />
                                        <div className="h-6 bg-gray-150 rounded w-5/6" />
                                        <div className="h-4 bg-gray-150 rounded w-2/3" />
                                        <div className="flex justify-between items-center pt-2">
                                            <div className="h-4 bg-gray-150 rounded w-1/4" />
                                            <div className="h-4 bg-gray-150 rounded w-1/4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : courses.length > 0 ? (
                            <div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {courses.map(course => (
                                        <div key={course.id} className="transform transition-all duration-350 hover:-translate-y-1.5">
                                            <CourseCard course={course} />
                                        </div>
                                    ))}
                                </div>

                                {/* Loading skeletons for lazy loading more page */}
                                {loadingMore && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
                                        {[1, 2, 3].map(i => (
                                            <div key={`more-${i}`} className="bg-white border border-gray-100 rounded-[2rem] p-5 space-y-4 animate-pulse">
                                                <div className="bg-gray-150 aspect-video rounded-2xl w-full" />
                                                <div className="h-4 bg-gray-150 rounded w-1/3" />
                                                <div className="h-6 bg-gray-150 rounded w-5/6" />
                                                <div className="h-4 bg-gray-150 rounded w-2/3" />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Pagination Controls (PAGINATED VIEW MODE ONLY) */}
                                {viewMode === 'paginated' && totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2.5 mt-16 select-none">
                                        <button
                                            onClick={() => handlePageChange(page - 1)}
                                            disabled={page === 1}
                                            className={`p-3 rounded-2xl border transition-all duration-300 ${
                                                page === 1 
                                                    ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed' 
                                                    : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-600 hover:text-indigo-600 shadow-sm'
                                            }`}
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>

                                        {Array.from({ length: totalPages }).map((_, idx) => {
                                            const pageNum = idx + 1;
                                            const isActive = pageNum === page;
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => handlePageChange(pageNum)}
                                                    className={`w-12 h-12 rounded-2xl font-bold text-sm transition-all duration-300 ${
                                                        isActive 
                                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 scale-[1.03]' 
                                                            : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 shadow-sm'
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}

                                        <button
                                            onClick={() => handlePageChange(page + 1)}
                                            disabled={page === totalPages}
                                            className={`p-3 rounded-2xl border transition-all duration-300 ${
                                                page === totalPages 
                                                    ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed' 
                                                    : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-600 hover:text-indigo-600 shadow-sm'
                                            }`}
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}

                                {/* Sentinel observer indicator (LAZY LOAD VIEW MODE ONLY) */}
                                {viewMode === 'lazy' && page < totalPages && (
                                    <div ref={sentinelRef} className="h-16 flex items-center justify-center mt-12 mb-4">
                                        <div className="w-7 h-7 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                                    </div>
                                )}
                                
                                {viewMode === 'lazy' && page >= totalPages && totalCount > 6 && (
                                    <div className="text-center font-bold text-gray-400 text-xs uppercase tracking-wider mt-16 mb-4 bg-gray-50/50 py-4.5 rounded-2xl border border-dashed border-gray-200/50">
                                        ✨ Bạn đã xem hết danh sách khóa học
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-white rounded-[2.5rem] p-16 text-center border border-gray-100 shadow-md">
                                <div className="w-24 h-24 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy khóa học</h3>
                                <p className="text-gray-500 font-medium">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SearchResults;

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CourseCard from './CourseCard';

const HorizontalPaginationSlider = ({ courses }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [cardsPerPage, setCardsPerPage] = useState(4);

    // Update cards per page based on viewport width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setCardsPerPage(1);
            } else if (window.innerWidth < 1024) {
                setCardsPerPage(2);
            } else {
                setCardsPerPage(4);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Reset page if cardsPerPage changes to prevent empty views
    useEffect(() => {
        setCurrentPage(0);
    }, [cardsPerPage]);

    if (!courses || courses.length === 0) {
        return <div className="text-center text-gray-500 py-8">Không có khóa học nào để hiển thị</div>;
    }

    // Dynamic chunking of courses into slides/pages
    const slides = [];
    for (let i = 0; i < courses.length; i += cardsPerPage) {
        slides.push(courses.slice(i, i + cardsPerPage));
    }

    const totalPages = slides.length;

    const nextSlide = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
        } else {
            // Loop back to start
            setCurrentPage(0);
        }
    };

    const prevSlide = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        } else {
            // Loop to the end
            setCurrentPage(totalPages - 1);
        }
    };

    return (
        <div className="relative select-none group/slider">
            {/* Slider Container with Viewport Mask */}
            <div className="overflow-hidden rounded-3xl p-4 -m-4">
                <div 
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentPage * 100}%)` }}
                >
                    {slides.map((slide, slideIdx) => (
                        <div 
                            key={slideIdx} 
                            className="w-full flex-shrink-0 grid gap-6"
                            style={{ 
                                gridTemplateColumns: `repeat(${cardsPerPage}, minmax(0, 1fr))` 
                            }}
                        >
                            {slide.map(course => (
                                <div key={course.id} className="h-full transform transition-all duration-300 hover:-translate-y-1">
                                    <CourseCard course={course} />
                                </div>
                            ))}
                            {/* Fill empty cells on the last page with placeholders to preserve grid layout */}
                            {slide.length < cardsPerPage && 
                                Array.from({ length: cardsPerPage - slide.length }).map((_, idx) => (
                                    <div key={`empty-${idx}`} className="hidden md:block opacity-0" />
                                ))
                            }
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons (Left/Right Arrows) */}
            {totalPages > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-gray-800 hover:bg-indigo-600 hover:text-white p-4 rounded-full shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 z-10 border border-gray-100 opacity-0 group-hover/slider:opacity-100 md:opacity-100"
                        aria-label="Previous Page"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white text-gray-800 hover:bg-indigo-600 hover:text-white p-4 rounded-full shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 z-10 border border-gray-100 opacity-0 group-hover/slider:opacity-100 md:opacity-100"
                        aria-label="Next Page"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </>
            )}

            {/* Pagination Indicators (Dots + Label) */}
            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 px-2">
                    {/* Dots */}
                    <div className="flex items-center gap-2.5">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentPage(idx)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${
                                    currentPage === idx 
                                        ? 'w-8 bg-indigo-600' 
                                        : 'w-2.5 bg-gray-200 hover:bg-gray-400'
                                }`}
                                aria-label={`Go to page ${idx + 1}`}
                            />
                        ))}
                    </div>

                    {/* Page counter display */}
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100/60 px-3.5 py-1.5 rounded-full">
                        Trang <span className="text-indigo-600">{currentPage + 1}</span> / {totalPages}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HorizontalPaginationSlider;

import React from 'react';
import { Star, Users, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    const discountedPrice = course.price * (1 - course.discount / 100);

    return (
        <div className="group bg-white rounded-3xl border border-gray-100 hover:border-indigo-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative aspect-video overflow-hidden">
                <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {course.isBestSeller && (
                        <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg shadow-orange-500/30">
                            <Zap className="w-3 h-3 fill-current" />
                            BEST-SELLER
                        </span>
                    )}
                    {course.discount > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg shadow-red-500/30">
                            -{course.discount}%
                        </span>
                    )}
                </div>

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <Link 
                        to={`/course/${course.id}`}
                        className="bg-white text-indigo-600 font-bold py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl"
                    >
                        Xem chi tiết
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md uppercase">
                        {course.category}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md uppercase">
                        {course.level}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                </h3>
                
                <p className="text-sm text-gray-500 mb-4">{course.instructor}</p>

                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-orange-400">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-bold text-gray-900">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                            <Users className="w-4 h-4" />
                            <span className="text-sm font-medium">{course.studentCount} học viên</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            {course.discount > 0 ? (
                                <>
                                    <span className="text-xs text-gray-400 line-through">
                                        {Number(course.price).toLocaleString('vi-VN')}đ
                                    </span>
                                    <span className="text-xl font-bold text-indigo-600">
                                        {discountedPrice.toLocaleString('vi-VN')}đ
                                    </span>
                                </>
                            ) : (
                                <span className="text-xl font-bold text-indigo-600">
                                    {Number(course.price) === 0 ? 'Miễn phí' : `${Number(course.price).toLocaleString('vi-VN')}đ`}
                                </span>
                            )}
                        </div>
                        <Link 
                            to={`/course/${course.id}`}
                            className="p-3 bg-gray-50 text-gray-400 group-hover:bg-indigo-600 group-hover:text-white rounded-2xl transition-all duration-300"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;

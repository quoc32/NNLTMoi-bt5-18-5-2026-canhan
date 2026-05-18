import React, { useState, useEffect } from 'react';
import { Search, Bell, BookOpen, LogOut, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return;
            try {
                const res = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(res.data.data);
            } catch (err) {
                console.error('Auth error:', err);
                localStorage.removeItem('token');
                setUser(null);
            }
        };
        fetchProfile();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 md:px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
                        E
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 hidden sm:block">
                        EduNext
                    </span>
                </Link>

                {/* Search Bar */}
                <div className="hidden md:flex flex-1 max-w-md relative">
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm khóa học, giảng viên..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-3 md:gap-6">
                    {user ? (
                        <>
                            <Link to="/courses" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                                <BookOpen className="w-5 h-5" />
                                <span className="hidden lg:block">Khóa học của tôi</span>
                            </Link>
                            
                            <button className="relative text-gray-600 hover:text-indigo-600 transition-colors">
                                <Bell className="w-6 h-6" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center border-2 border-white">
                                    3
                                </span>
                            </button>

                            <div className="h-8 w-[1px] bg-gray-200 hidden sm:block"></div>

                            {/* Member Info */}
                            <div className="flex items-center gap-3 group relative">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-gray-900 leading-none">{user.fullName || user.username}</p>
                                    <p className="text-[11px] text-gray-500 uppercase tracking-wider mt-1">Học viên</p>
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-indigo-100 overflow-hidden shadow-sm flex items-center justify-center bg-indigo-50">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <UserIcon className="w-5 h-5 text-indigo-400" />
                                    )}
                                </div>
                                
                                {/* Simple Dropdown for Logout */}
                                <button 
                                    onClick={handleLogout}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    title="Đăng xuất"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-indigo-600 px-4 py-2">
                                Đăng nhập
                            </Link>
                            <Link to="/register" className="text-sm font-bold bg-indigo-600 text-white px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
                                Đăng ký
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

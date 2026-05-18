import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng ký thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFDFF] px-4 py-12 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/50 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-100/50 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-md w-full relative z-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-indigo-600/20 mx-auto mb-6">
                        E
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">Tạo tài khoản mới</h2>
                    <p className="text-gray-500 font-medium">Bắt đầu hành trình chinh phục tri thức cùng EduNext</p>
                </div>

                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-500/5 border border-gray-100">
                    {error && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm font-bold mb-6 border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Tên người dùng</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    required
                                    placeholder="Ví dụ: quoc1"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none"
                                    value={formData.username}
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                />
                                <User className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email</label>
                            <div className="relative">
                                <input 
                                    type="email" 
                                    required
                                    placeholder="quoc1@gmail.com"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                                <Mail className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Mật khẩu</label>
                            <div className="relative">
                                <input 
                                    type="password" 
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                                <Lock className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                            </div>
                        </div>

                        <button 
                            disabled={loading}
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
                        >
                            {loading ? 'Đang đăng ký...' : 'Đăng ký tài khoản'}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-500 font-medium">
                            Đã có tài khoản?{' '}
                            <Link to="/login" className="text-indigo-600 font-bold hover:underline">Đăng nhập</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

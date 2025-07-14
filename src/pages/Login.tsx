import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, setEmail } from '../redux/slices/authSlice';
import type { RootState } from '../redux/store';

const LoginPage = () => {
    const [email, setEmailInput] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, error, isSuccess, requiresTwoFactor, token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isSuccess) {
            if (requiresTwoFactor) {
                // Lưu email vào Redux store khi yêu cầu 2FA
                dispatch(setEmail(email));
                navigate('/two_face');
            } else if (token) {
                navigate('/dashboard-admin');
            }
        }
    }, [isSuccess, requiresTwoFactor, token, navigate, dispatch, email]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(login({ email, password }) as any);
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-8">
            <div className="flex flex-col md:flex-row w-full max-w-7xl h-[800px] bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Left Side */}
                <div className="md:w-1/2 w-full bg-gradient-to-b from-[#DABEDB] to-[#C8A7CB] p-14 flex flex-col justify-center items-center text-white text-center">
                    <div className="text-4xl mb-4">✨</div>
                    <h2 className="text-3xl font-bold">Chào mừng đến với</h2>
                    <h1 className="text-5xl font-extrabold mb-6">FLAWLESS</h1>
                    <p className="text-lg leading-relaxed">
                        Đặt lịch makeup chuyên nghiệp<br />
                        Trải nghiệm làm đẹp hoàn hảo
                    </p>
                    <div className="mt-12">
                        <div className="rounded-full w-60 h-60 bg-[#fbe8fc] flex items-center justify-center shadow-2xl">
                            <img
                                src="/img/flawless.png"
                                alt="Logo"
                                className="w-60 h-60 rounded-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="md:w-1/2 w-full p-14 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">Đăng Nhập</h2>
                    <p className="text-lg text-gray-500 mb-8">Bắt đầu hành trình làm đẹp của bạn</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-base font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmailInput(e.target.value)}
                                className="w-full mt-2 px-5 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-base font-medium text-gray-700">Mật khẩu</label>
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-2 px-5 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 text-lg bg-[#C29BB5] hover:bg-[#b387a5] text-white rounded-lg font-semibold transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {isLoading ? 'Đang xử lý...' : 'Đăng Nhập'}
                        </button>
                    </form>

                    <div className="flex justify-between items-center text-sm mt-6 text-gray-500">
                        <a href="#" className="hover:underline">Quên mật khẩu?</a>
                        <a href="#" className="font-semibold hover:underline text-[#A67396]">Tạo tài khoản mới</a>
                    </div>

                    <div className="flex items-center my-8">
                        <div className="flex-grow h-px bg-gray-300" />
                        <span className="px-4 text-sm text-gray-400">Hoặc tiếp tục với</span>
                        <div className="flex-grow h-px bg-gray-300" />
                    </div>

                    <button className="w-full flex items-center justify-center border px-5 py-3 rounded-lg hover:bg-gray-100 text-lg">
                        <img
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            alt="Google"
                            className="w-6 h-6 mr-3"
                        />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

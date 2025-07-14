import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { RootState } from '../redux/store';
import { setCredentials } from '../redux/slices/authSlice';

const TwoFactorPage = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('Email', email || '');
      formData.append('Code', otp);

      const response = await axios.post(
        'https://flawless-a2exc2hwcge8bbfz.canadacentral-01.azurewebsites.net/api/user-account/two-factor',
        formData,
        {
          headers: {
            'accept': '*/*',
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.isSuccess) {
        dispatch(setCredentials(response.data));
        navigate('/dashboard-admin');
      } else {
        setError(response.data.errorMessage || 'Verification failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.errorMessage || 'Failed to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError(null);
    try {
      const formData = new FormData();
      formData.append('Email', email || '');

      await axios.post(
        'https://flawless-a2exc2hwcge8bbfz.canadacentral-01.azurewebsites.net/api/user-account/resend-code',
        formData,
        {
          headers: {
            'accept': '*/*',
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    } catch (err: any) {
      setError(err.response?.data?.errorMessage || 'Failed to resend code');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="flex flex-col md:flex-row w-full max-w-7xl h-[800px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side */}
        <div className="md:w-1/2 w-full bg-gradient-to-b from-[#DABEDB] to-[#C8A7CB] p-14 flex flex-col justify-center items-center text-white text-center">
          <div className="text-4xl mb-4">🔐</div>
          <h2 className="text-3xl font-bold">Xác minh bảo mật</h2>
          <h1 className="text-5xl font-extrabold mb-6">FLAWLESS</h1>
          <p className="text-lg leading-relaxed">
            Nhập mã xác minh<br />
            Để hoàn tất đăng nhập
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
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Xác minh 2 bước</h2>
          <p className="text-lg text-gray-500 mb-8">Vui lòng nhập mã xác thực được gửi đến email</p>

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
                value={email || ''}
                disabled
                className="w-full mt-2 px-5 py-3 border border-gray-300 rounded-lg text-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="text-base font-medium text-gray-700">Mã xác minh</label>
              <input
                type="text"
                placeholder="Nhập mã gồm 6 chữ số"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mt-2 px-5 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
                pattern="[0-9]{6}"
                maxLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 text-lg bg-[#C29BB5] hover:bg-[#b387a5] text-white rounded-lg font-semibold transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {isLoading ? 'Đang xử lý...' : 'Xác minh'}
            </button>
          </form>

          <div className="text-sm text-center text-gray-500 mt-6">
            <p>
              Không nhận được mã?{' '}
              <button
                onClick={handleResendCode}
                className="text-[#A67396] font-semibold hover:underline"
              >
                Gửi lại
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorPage;

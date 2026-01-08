import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigate = useNavigate();

  // State quản lý toàn bộ 5 trường dữ liệu + confirmPassword
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    userName: '',
    emailAddress: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu khớp nhau trước khi gửi
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      // Gửi 5 trường chính sang Backend (không gửi confirmPassword)
      const response = await axios.post('http://localhost:9000/Internote/signup-author', {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        userName: formData.userName,
        emailAddress: formData.emailAddress,
        password: formData.password
      });

      if (response.status === 200) {
        alert("Đăng ký Author thành công!");
        navigate('/SignIn'); // Chuyển sang trang đăng nhập sau khi thành công
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      alert("Đăng ký thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 pt-20">
      <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create an account</h2>

        {/* 1. Full Name */}
        <div className="relative z-0 w-full mb-5 group">
          <input 
            type="text" 
            name="fullName" 
            id="fullName" 
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder=" " 
            required 
          />
          <label htmlFor="fullName" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Full name
          </label>
        </div>

        {/* 2. Phone Number */}
        <div className="relative z-0 w-full mb-5 group">
          <input 
            type="tel" 
            name="phoneNumber" 
            id="phoneNumber" 
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder=" " 
            required 
          />
          <label htmlFor="phoneNumber" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Phone number
          </label>
        </div>

        {/* 3. User name */}
        <div className="relative z-0 w-full mb-5 group">
          <input 
            type="text" 
            name="userName" 
            id="userName" 
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder=" " 
            required 
          />
          <label htmlFor="userName" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            User name
          </label>
        </div>

        {/* 4. Email address */}
        <div className="relative z-0 w-full mb-5 group">
          <input 
            type="email" 
            name="emailAddress" 
            id="emailAddress" 
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder=" " 
            required 
          />
          <label htmlFor="emailAddress" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email address
          </label>
        </div>

        {/* 5. Password */}
        <div className="relative z-0 w-full mb-5 group">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            id="password" 
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-10" 
            placeholder=" " 
            required 
          />
          <label htmlFor="password" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-3 z-20 text-gray-400 hover:text-blue-600"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.399 8.049 7.21 5 12 5c4.79 0 8.601 3.049 9.964 6.678.07.23.07.468 0 .702-1.363 3.629-5.174 6.678-9.964 6.678-4.79 0-8.601-3.049-9.964-6.678z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
            )}
          </button>
        </div>

        {/* 6. Confirm password */}
        <div className="relative z-0 w-full mb-8 group">
          <input 
            type={showRepeatPassword ? "text" : "password"} 
            name="confirmPassword" 
            id="confirmPassword" 
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-10" 
            placeholder=" " 
            required 
          />
          <label htmlFor="confirmPassword" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Confirm password
          </label>
          <button
            type="button"
            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            className="absolute right-0 top-3 z-20 text-gray-400 hover:text-blue-600"
          >
            {showRepeatPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.399 8.049 7.21 5 12 5c4.79 0 8.601 3.049 9.964 6.678.07.23.07.468 0 .702-1.363 3.629-5.174 6.678-9.964 6.678-4.79 0-8.601-3.049-9.964-6.678z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
            )}
          </button>
        </div>

        <button 
          type="submit" 
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none transition-colors"
        >
          Sign Up
        </button>
        
      </form>
    </div>
  );
};

export default SignUp;
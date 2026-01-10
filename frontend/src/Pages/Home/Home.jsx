import React, { useState } from 'react'

const Home = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleGetStarted = () => {
    // CHỈNH SỬA: Kiểm tra trong sessionStorage theo đúng file SignIn_Admin bạn gửi
    const loggedInUser = sessionStorage.getItem('user');

    if (!loggedInUser) {
      setErrorMessage("You must log in to your account first.");
      setTimeout(() => setErrorMessage(""), 3000);
    } else {
      // Nếu đã đăng nhập, có thể chuyển hướng đến trang chính
      window.location.href = "/Home"; 
    }
  };

  return (
    <div className="home flex flex-col items-center justify-center min-h-screen w-full">
      <div className="hero text-center mb-10"> 
        <h1 className="text-5xl font-bold">Welcome to My Blog!</h1>
        
        <p className="mt-8 text-xl text-gray-700">
          Create, Share, and Explore content across a range of categories.
        </p>
        
        <div className="mt-10 flex flex-col items-center gap-4">
          {/* Thông báo lỗi hiện ra ở đây */}
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-600 px-4 py-2 shadow-sm animate-bounce">
               <p className="text-red-600 font-bold text-sm uppercase tracking-tighter">
                {errorMessage}
              </p>
            </div>
          )}

          <button 
            type="button" 
            onClick={handleGetStarted}
            className="text-white bg-green-700 box-border border-2 border-transparent hover:border-black hover:bg-green-600 focus:ring-4 focus:ring-green-300 shadow-xs font-medium leading-6 rounded-full text-xl px-8 py-4 focus:outline-none transition-all duration-200"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home

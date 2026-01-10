import React, { useState } from 'react'

const Home = () => {
  // 1. Tạo state để quản lý thông báo lỗi
  const [errorMessage, setErrorMessage] = useState("");

  const handleGetStarted = () => {
    // 2. Kiểm tra xem trong localStorage có 'user' (cho Author) hoặc 'admin' (cho Admin) không
    const user = localStorage.getItem('user');
    const admin = localStorage.getItem('admin');

    if (!user && !admin) {
      // 3. Nếu cả hai đều không tồn tại, hiển thị dòng chữ thông báo
      setErrorMessage("You must log in to your account first.");
      
      // Tự động xóa thông báo sau 3 giây để giao diện sạch sẽ
      setTimeout(() => setErrorMessage(""), 3000);
    } else {
      // Nếu đã đăng nhập, bạn có thể thực hiện chuyển hướng hoặc logic khác ở đây
      console.log("Logged in! Ready to explore.");
      // window.location.href = "/Explore"; // Ví dụ chuyển hướng
    }
  };

  return (
    <div className="home flex flex-col items-center justify-center min-h-screen w-full">
      <div className="hero text-center mb-10"> 
        <h1 className="text-5xl font-bold">Welcome to My Blog!</h1>
        
        <p className="mt-8 text-xl">
          Create, Share, and Explore content across a range of categories.
        </p>
        
        <div className="mt-10 flex flex-col items-center gap-4">
          {/* 4. Hiển thị dòng thông báo ngay trên nút bấm nếu có lỗi */}
          {errorMessage && (
            <p className="text-red-600 font-bold text-sm animate-pulse uppercase tracking-wider">
              {errorMessage}
            </p>
          )}

          <button 
            type="button" 
            onClick={handleGetStarted} // 5. Gán sự kiện click
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

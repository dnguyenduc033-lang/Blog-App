import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  // Hàm xử lý đăng xuất với chế độ an toàn
  const handleLogout = () => {
    // Hiển thị thông báo xác nhận Yes/No
    const confirmLogout = window.confirm("Do you want to log out?");
    
    if (confirmLogout) {
      // Nếu chọn Yes (OK)
      sessionStorage.removeItem('user');
      setUser(null);
      navigate('/');
    }
  };

  return (
    <div>
      <nav className="bg-yellow-600 fixed w-full z-20 top-0 start-0 border-b border-default">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
          
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse ml-30">
            <span className="self-center text-4xl font-black whitespace-nowrap text-blue-700">
              THE BLOG APP
            </span>
          </Link>

          <div className="flex md:order-2 space-x-5 md:space-x-2 rtl:space-x-reverse items-center">
            
            {!user ? (
              <>
                <div className="flex space-x-6">
                  <Link to="/SignIn_Admin">
                    <button type="button" className="text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-3 me-2 mb-2">
                      Sign in Admin
                    </button>
                  </Link>

                  <Link to="/SignIn">
                    <button type="button" className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:border-black font-medium rounded-lg text-sm px-6 py-3 me-2 mb-2">
                      Sign in Author 
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4 mb-2">
                
                {/* 3 MỤC CHO ADMIN ĐÃ CHUYỂN THÀNH CHỮ ĐEN (Bỏ thẻ button) */}
                {user.role === 'ADMIN' && (
                  <div className="flex space-x-6 text-lg">
                    <Link to="/dashboard" className="text-black font-bold hover:text-blue-800 transition-colors">
                      Dashboard
                    </Link>
                    <Link to="/UsersList" className="text-black font-bold hover:text-blue-800 transition-colors">
                      Users list
                    </Link>
                    
                  </div>
                )}

                {/* HIỂN THỊ CHO AUTHOR (MỚI THÊM) */}
                {user.role === 'AUTHOR' && (
                  <div className="flex space-x-6 text-lg">
                    <Link to="/NewPost" className="text-black font-bold hover:text-blue-800 transition-colors">
                      New post
                    </Link>
                    <Link to="/YourPosts" className="text-black font-bold hover:text-blue-800 transition-colors">
                      Your posts
                    </Link>
                    <Link to="/profile" className="text-black font-bold hover:text-blue-800 transition-colors">
                      Profile
                    </Link>
                  </div>
                )}

                <button 
                  onClick={handleLogout}
                  type="button" 
                  className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-10"
                >
                  Logout
                </button>
              </div>
            )}

            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft focus:outline-none focus:ring-2 focus:ring-neutral-tertiary">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
              </svg>
            </button>
          </div>

          
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Sử dụng đúng đường dẫn import bạn đã cung cấp để tránh lỗi
import Navbar from './Component/Navbar'; 
import Home from './Pages/Home/Home';
import SignIn_Admin from './Pages/Admin/SignIn_Admin';
import SignIn from './Pages/Author/SignIn';
import SignUp from './Pages/Author/SignUp'; 
import NewPost from './Pages/Author/NewPost';
import YourPosts from './Pages/Author/YourPosts';
import EditPost from './Pages/Author/EditPost';
import Profile from './Pages/Author/Profile';
import Dashboard from './Pages/Admin/Dashboard';
import UsersList from './Pages/Admin/UsersList';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi load trang
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      {/* Truyền user và setUser vào Navbar để hiển thị đúng trạng thái Login/Logout */}
      <Navbar user={user} setUser={setUser} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/SignIn" element={<SignIn setUser={setUser} />} />
        
        <Route path="/SignUp" element={<SignUp />} />

        <Route path="/SignIn_Admin" element={<SignIn_Admin setUser={setUser} />} />

        <Route path="/NewPost" element={<NewPost />} />

        <Route path="/YourPosts" element={<YourPosts />} />

        <Route path="/EditPost/:id" element={<EditPost />} />

        <Route path="/Profile" element={<Profile />} />

        <Route path="/Dashboard" element={<Dashboard />} />

        <Route path="/UsersList" element={<UsersList />} />
      </Routes>
    </Router>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Component/Navbar'; 
import Home from './Pages/Home/Home';
import SignIn_Admin from './Pages/Admin/SignIn_Admin';
import SignIn from './Pages/Author/SignIn';
import SignUp from './Pages/Author/SignUp'; 
import NewPost from './Pages/Author/NewPost';
import YourPosts from './Pages/Author/YourPosts';
import EditPost from './Pages/Author/EditPost';
import Profile from './Pages/Author/Profile';
import EditProfile from './Pages/Author/EditProfile';
import Dashboard from './Pages/Admin/Dashboard';
import UsersList from './Pages/Admin/UsersList';
import Posts from './Component/displayPost/Posts';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
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

        <Route path="/EditProfile" element={<EditProfile />} />

        <Route path="/Dashboard" element={<Dashboard />} />

        <Route path="/UsersList" element={<UsersList />} />

        <Route path="/Posts" element={<Posts />} />
      </Routes>
    </Router>
  );
}

export default App;

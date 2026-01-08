import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hàm lấy toàn bộ bài đăng từ hệ thống
    const fetchAllPosts = async () => {
        try {
            // API lấy tất cả bài viết dành cho Admin
            const response = await axios.get('http://localhost:9000/Post/all');
            setAllPosts(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching all posts:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllPosts();
    }, []);

    // Hàm xóa bài đăng
    const handleDeletePost = async (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await axios.delete(`http://localhost:9000/Post/delete/${postId}`);
                alert("Post deleted successfully!");
                fetchAllPosts(); 
            } catch (error) {
                console.error("Delete error:", error);
                alert("Failed to delete the post.");
            }
        }
    };

    if (loading) return (
        <div className="pt-32 text-center font-black uppercase tracking-widest text-gray-400">
            Loading System Data...
        </div>
    );

    return (
        <div className="pt-32 px-10 pb-20 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-4xl font-black text-black uppercase tracking-tighter">
                            Admin Dashboard
                        </h2>
                        <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-2 border-l-4 border-black pl-3">
                            Post Management System
                        </p>
                    </div>
                    
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-800 text-white uppercase text-[11px] tracking-widest">
                                <th className="p-5 font-black border-r border-gray-700">Post Title</th>
                                <th className="p-5 font-black border-r border-gray-700">User Name</th>
                                <th className="p-5 font-black border-r border-gray-700">Full Name</th>
                                <th className="p-5 font-black border-r border-gray-700">Email Address</th>
                                <th className="p-5 font-black text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {allPosts.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-gray-400 font-bold italic">
                                        No posts found in the system.
                                    </td>
                                </tr>
                            ) : (
                                allPosts.map((post) => (
                                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-5">
                                            <p className="font-bold text-gray-800 line-clamp-1">{post.title}</p>
                                        </td>
                                        <td className="p-5">
                                            <span className="text-blue-600 font-black text-sm">@{post.userName}</span>
                                        </td>
                                        <td className="p-5 text-gray-600 font-bold text-sm uppercase">
                                            {post.fullName || 'N/A'}
                                        </td>
                                        <td className="p-5 text-gray-600 font-bold text-sm">
                                            {post.emailAddress || post.email}
                                        </td>
                                        <td className="p-5 text-center">
                                            <button 
                                                onClick={() => handleDeletePost(post.id)}
                                                className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mx-auto">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:9000/Post/all');
                setPosts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bài đăng:", error);
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        setHasInteracted(true);
        const results = posts.filter(post => 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPosts(results);
    };

    // --- SỬA LẠI HÀM NÀY ĐỂ LỌC ĐÚNG ---
    const handleCategoryClick = (categoryName) => {
        setHasInteracted(true);
        if (categoryName === "ALL") {
            setFilteredPosts(posts);
        } else {
            // Lọc theo trường category từ backend
            const results = posts.filter(post => post.category === categoryName);
            setFilteredPosts(results);
        }
    };

    if (loading) return (
        <div className="pt-40 text-center font-black text-gray-400 tracking-widest uppercase">
            Loading Posts...
        </div>
    );

    return (
        <div className="pt-32 px-10 pb-20 bg-white min-h-screen">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                
                {/* --- 1. CÔNG CỤ TÌM KIẾM --- */}
                <div className="flex items-center justify-center w-full mb-8">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row p-4 md:p-0 font-medium items-center">
                        <div className="relative w-full md:w-80">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input 
                                type="search" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Which post?" 
                                className="block w-full p-2.5 ps-10 text-sm text-black bg-white rounded-l-lg border-2 border-gray-300 focus:border-blue-500 outline-none transition-all" 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="bg-blue-600 text-white px-6 py-2.5 rounded-r-lg hover:bg-blue-700 transition-colors font-semibold text-sm border-2 border-blue-600"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* --- 2. CÁC NÚT DANH MỤC (ĐÃ ĐỔI TECHNOLOGIES -> TECHNOLOGY) --- */}
                <div className="flex flex-wrap justify-center items-center categories gap-3 mb-16"> 
                    {["ALL", "TECHNOLOGY", "EDUCATION", "CUISINE", "ENTERTAINMENT", "JOB", "TRAVEL"].map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => handleCategoryClick(cat)}
                            className="text-white bg-gray-600 border border-gray-500 hover:bg-gray-500 shadow-sm font-medium leading-5 rounded-lg text-sm px-4 py-2.5 transition-all"
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* --- 3. DANH SÁCH BÀI VIẾT --- */}
                {hasInteracted && (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <div key={post.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between min-h-[200px]">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                                        <p className="text-gray-600 text-sm mb-6 line-clamp-3">{post.content}</p>
                                    </div>
                                    <div className="border-t pt-4 flex justify-between items-center">
                                        <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">
                                            @{post.userName || 'author'}
                                        </span>
                                        <span className="text-gray-400 text-[11px] font-medium">
                                            {post.createdAt ? new Date(post.createdAt).toLocaleDateString('vi-VN') : "No date"}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-gray-400 font-bold uppercase tracking-widest italic">No matching posts found.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Posts;
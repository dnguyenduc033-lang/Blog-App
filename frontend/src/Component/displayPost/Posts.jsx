import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment'; 

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null); 
    const [commentsList, setCommentsList] = useState([]);

    const currentUser = JSON.parse(sessionStorage.getItem('user'));

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

    const handleCategoryClick = (categoryName) => {
        setHasInteracted(true);
        if (categoryName === "ALL") {
            setFilteredPosts(posts);
        } else {
            const results = posts.filter(post => post.category === categoryName);
            setFilteredPosts(results);
        }
    };

    const openCommentModal = async (post) => {
        setSelectedPost(post);
        try {
            // Endpoint theo chuẩn Backend đã thống nhất
            const res = await axios.get(`http://localhost:9000/Internote/posts/${post.id}/comments`);
            setCommentsList(res.data);
        } catch (err) {
            console.error("Không lấy được comment:", err);
            setCommentsList([]); // Trả về mảng rỗng nếu chưa có bình luận
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

                {hasInteracted && (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <div key={post.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between min-h-[250px]">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                                        <p className="text-gray-600 text-sm mb-6 line-clamp-3">{post.content}</p>
                                    </div>
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">
                                                @{post.userName || 'author'}
                                            </span>
                                            <span className="text-gray-400 text-[11px] font-medium">
                                                {post.createdAt ? new Date(post.createdAt).toLocaleDateString('vi-VN') : "No date"}
                                            </span>
                                        </div>

                                        <button 
                                            onClick={() => openCommentModal(post)}
                                            className="w-full py-2.5 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-700 text-white text-xs font-bold uppercase rounded-lg transition-all active:scale-95 shadow-sm"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3h9m-9 3h3m-12 1.5l.623-1.66A10.5 10.5 0 1012 4.5c-4.47 0-8.257 2.803-9.727 6.75L2.25 16.5l3.5-.75z" />
                                            </svg>
                                            Comment
                                        </button>
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

            {selectedPost && (
                <Comment 
                    post={selectedPost} 
                    onClose={() => setSelectedPost(null)} 
                    comments={commentsList}
                    setComments={setCommentsList}
                    currentUser={currentUser}
                />
            )}
        </div>
    );
};

export default Posts;

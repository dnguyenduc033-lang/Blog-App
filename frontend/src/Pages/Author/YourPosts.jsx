import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const YourPosts = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    
    const storedUser = sessionStorage.getItem('user');
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    const userName = currentUser?.userName;

    const fetchPosts = () => {
        if (userName) {
            axios.get(`http://localhost:9000/Post/author/${userName}`)
                .then(res => setPosts(res.data))
                .catch(err => console.error("Error fetching posts:", err));
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [userName]);

    const handleDelete = async (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await axios.delete(`http://localhost:9000/Post/delete/${postId}`);
                alert("Post deleted successfully!");
                fetchPosts(); // Cập nhật lại danh sách ngay lập tức
            } catch (err) {
                console.error("Delete error:", err);
                alert("Failed to delete post.");
            }
        }
    };

    const handleEdit = (postId) => {
        // Chuyển hướng sang trang Edit với ID bài viết
        navigate(`/EditPost/${postId}`);
    };

    return (
        <div className="pt-32 px-10">
            <h2 className="text-3xl font-black mb-10 uppercase text-center">
                Your Posts
            </h2>

            {posts.length === 0 ? (
                <p className="text-center text-gray-500 italic">
                    You haven't created any posts yet.
                </p>
            ) : (
                <div className="grid gap-4">
                    {posts.map(post => (
                        <div key={post.id} className="p-4 border rounded-xl shadow-sm flex justify-between items-center bg-white">
                            <div>
                                <h3 className="font-bold text-xl">{post.title}</h3>
                                <p className="text-gray-500 line-clamp-2">{post.content}</p>
                            </div>

                            <div className="flex gap-2">
                                {/* Nút Edit */}
                                <button 
                                    onClick={() => handleEdit(post.id)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                                <button 
                                    onClick={() => handleDelete(post.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default YourPosts;

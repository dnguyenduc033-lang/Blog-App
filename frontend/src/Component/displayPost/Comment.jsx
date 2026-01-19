import React, { useState } from 'react';
import axios from 'axios';

const Comment = ({ post, onClose, comments, setComments, currentUser }) => {
    const [commentContent, setCommentContent] = useState("");
    const [isMaximized, setIsMaximized] = useState(false);

    const handleSendComment = async () => {
        if (!commentContent.trim()) return;
        const newComment = {
            postId: post.id,
            userName: currentUser?.userName || "Anonymous",
            content: commentContent
        };
        try {
            const res = await axios.post("http://localhost:9000/Internote/posts/comment", newComment);
            setComments([...comments, res.data]);
            setCommentContent("");
        } catch (err) {
            alert("Could not post comment.");
        }
    };

    const handleDeleteComment = async (id) => {
        try {
                await axios.delete(`http://localhost:9000/Internote/posts/comment/${id}`);
                // Cập nhật lại state để mất bình luận đó trên màn hình ngay lập tức
                setComments(comments.filter(c => c.id !== id));
            } catch (err) {
                alert("Could not delete comment.");
            }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 transition-all duration-300">
            <div className={`bg-white shadow-2xl flex flex-col transition-all duration-300 ${
                isMaximized ? 'w-full h-full rounded-none' : 'w-full max-w-lg rounded-2xl max-h-[80vh]'
            }`}>
                
                <div className="p-2 border-b flex justify-end items-center bg-gray-50/50 gap-1">
                    <button onClick={() => setIsMaximized(!isMaximized)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        {isMaximized ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4.5 4.5m0 0V9m0-4.5h4.5M15 9l4.5-4.5m0 0V9m0-4.5h-4.5M9 15l-4.5 4.5m0 0V15m0 4.5h4.5M15 15l4.5 4.5m0 0V15m0 4.5h-4.5" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                        )}
                    </button>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                    {comments && comments.length > 0 ? (
                        comments.map((c, index) => (
                            <div key={index} className="group relative bg-gray-50 p-3 rounded-xl border border-gray-100 shadow-sm transition-all hover:border-gray-300">
                                <p className="text-[10px] font-black text-blue-600 uppercase mb-1">@{c.userName}</p>
                                <p className="text-sm text-gray-800 leading-relaxed pr-8">{c.content}</p>
                                
                                <button 
                                    onClick={() => handleDeleteComment(c.id)}
                                    className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors"
                                    title="Delete comment"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 italic text-gray-400 text-xs">No comments yet.</div>
                    )}
                </div>

                <div className="p-4 border-t bg-gray-50 flex gap-2">
                    <input 
                        type="text" value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="Write your comment..."
                        className="flex-1 p-2.5 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-sm"
                        onKeyDown={(e) => e.key === 'Enter' && handleSendComment()}
                    />
                    <button onClick={handleSendComment} className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition-all active:scale-90">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Comment;

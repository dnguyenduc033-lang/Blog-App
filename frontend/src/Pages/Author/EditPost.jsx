import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]); // File mới chọn
    const [previews, setPreviews] = useState([]); // Xem trước file mới
    const [existingFiles, setExistingFiles] = useState([]); // Danh sách file cũ từ Server
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        // Lấy dữ liệu bài viết cũ
        axios.get(`http://localhost:9000/Post/${id}`)
            .then(res => {
                setTitle(res.data.title);
                setContent(res.data.content);
                setExistingFiles(res.data.attachments || []);
            })
            .catch(err => console.error("Error loading post data:", err));
    }, [id]);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(prev => [...prev, ...files]);

        const newPreviews = files.map(file => {
            const isImage = file.type.startsWith('image/');
            const isVideo = file.type.startsWith('video/');
            return {
                url: isImage || isVideo ? URL.createObjectURL(file) : null,
                type: file.type,
                name: file.name,
                size: (file.size / 1024).toFixed(1) + ' KB'
            };
        });
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeNewFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingFile = (index) => {
        setExistingFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        
        // Gửi danh sách tên các file cũ muốn giữ lại
        formData.append('existingFiles', JSON.stringify(existingFiles));
        
        // Gửi các file mới được chọn
        selectedFiles.forEach(file => {
            formData.append('files', file);
        });

        try {
            await axios.put(`http://localhost:9000/Post/update/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Updated successfully!");
            navigate('/YourPosts');
        } catch (error) {
            console.error("Update error:", error);
            alert("Lỗi: " + (error.response?.data || "Không thể kết nối Backend"));
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 border border-gray-100">
                <h2 className="text-3xl font-black text-black mb-8 flex items-center justify-center gap-3 font-serif text-center uppercase">
                    EDIT YOUR POST
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Title</label>
                        <input
                            type="text" required value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Content</label>
                        <textarea
                            required rows="10" value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none mb-4"
                        />

                        <div className="bg-gray-50 p-5 rounded-xl border-2 border-dashed border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h4 className="font-bold text-gray-700">Attachments</h4>
                                    <p className="text-xs text-gray-500">Manage existing or add new files</p>
                                </div>
                                <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                                <button type="button" onClick={handleUploadClick} className="bg-gray-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-black transition-all">
                                    Add New Files
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* Hiển thị File cũ hiện có trên Server */}
                                {existingFiles.map((fileName, index) => (
                                    <div key={`old-${index}`} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-lg shadow-sm">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-10 h-10 flex-shrink-0 bg-blue-100 rounded flex items-center justify-center text-[8px] font-bold text-blue-600">
                                                EXISTING
                                            </div>
                                            <p className="text-sm font-medium text-blue-700 truncate w-32">{fileName}</p>
                                        </div>
                                        <button type="button" onClick={() => removeExistingFile(index)} className="text-blue-400 hover:text-red-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}

                                {/* Hiển thị File mới vừa chọn (Previews) */}
                                {previews.map((file, index) => (
                                    <div key={`new-${index}`} className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded flex items-center justify-center italic text-[8px]">
                                                {file.url ? <img src={file.url} alt="preview" className="w-full h-full object-cover rounded" /> : 'NEW FILE'}
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-sm font-medium text-gray-700 truncate w-32">{file.name}</p>
                                                <p className="text-[10px] text-gray-400">{file.size}</p>
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => removeNewFile(index)} className="text-gray-400 hover:text-red-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end items-center gap-4 pt-6 border-t border-gray-100">
                        <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 text-gray-500 font-bold uppercase text-xs">Cancel</button>
                        <button type="submit" disabled={isUpdating} className="px-10 py-3 bg-blue-600 text-white font-black rounded-lg shadow-lg uppercase text-sm tracking-widest transition-all active:scale-95">
                            {isUpdating ? 'Updating...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPost;
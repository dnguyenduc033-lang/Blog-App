import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfile = () => {
    const navigate = useNavigate();
    const storedUser = sessionStorage.getItem('user');
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        userName: '',
        emailAddress: '',
        password: '', // Sẽ được điền password cũ từ useEffect
        role: ''
    });

    useEffect(() => {
        if (!currentUser) {
            navigate('/SignIn');
        } else {
            setFormData({
                fullName: currentUser.fullName || '',
                phoneNumber: currentUser.phoneNumber || '',
                userName: currentUser.userName || '',
                emailAddress: currentUser.emailAddress || '',
                password: currentUser.password || '', // Hiển thị password cũ
                role: currentUser.role || 'AUTHOR'
            });
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gọi endpoint update-profile như đã cấu hình ở Backend
            const response = await axios.put(`http://localhost:9000/Internote/update-profile/${currentUser.id}`, formData);
            
            if (response.status === 200) {
                sessionStorage.setItem('user', JSON.stringify(response.data));
                alert("Profile updated successfully!");
                navigate('/Profile');
            }
        } catch (err) {
            alert("Update failed: " + (err.response?.data || "Server error"));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-10 border border-gray-100">
                <h2 className="text-2xl font-black text-black uppercase font-serif text-center mb-8 tracking-tighter">Edit Account</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tên biến Mapping 100% Backend */}
                    <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Full Name</label>
                        <input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 font-bold" />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Username</label>
                        <input name="userName" value={formData.userName} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 font-bold" />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Phone Number</label>
                        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 font-bold" />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</label>
                        <input name="emailAddress" value={formData.emailAddress} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 font-bold" />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Password</label>
                        <input 
                            type="text" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 font-bold text-blue-600"
                            placeholder="Overwrite password..."
                        />
                        <p className="text-[10px] text-gray-400 mt-2 italic">* Password is visible here. You can clear and type a new one.</p>
                    </div>

                    <div className="pt-6 flex flex-col gap-3">
                        <button type="submit" className="w-full py-4 bg-black text-white font-black rounded-lg shadow-lg uppercase text-sm tracking-widest hover:bg-gray-800 transition-all active:scale-95">
                            Update Profile
                        </button>
                        <button type="button" onClick={() => navigate(-1)} className="w-full py-2 text-gray-400 font-bold uppercase text-xs hover:text-black">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;

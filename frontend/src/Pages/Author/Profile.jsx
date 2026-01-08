import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const storedUser = sessionStorage.getItem('user');
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        if (!currentUser) {
            navigate('/SignIn');
            return;
        }

        const identifier = currentUser.role === 'ADMIN' ? (currentUser.email || currentUser.emailAddress) : currentUser.userName;
        
        axios.get(`http://localhost:9000/User/${identifier}`)
            .then(res => {
                setUserData({ ...currentUser, ...res.data });
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading profile:", err);
                setUserData(currentUser);
                setLoading(false);
            });
    }, [navigate]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest text-gray-400">
            Loading Profile...
        </div>
    );

    const displayEmail = userData?.emailAddress || userData?.email || currentUser?.emailAddress || currentUser?.email;

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-10 border border-gray-100">
                
                {/* PHẦN ĐẦU: AVATAR BÊN TRÁI TIÊU ĐỀ */}
                <div className="flex items-center space-x-6 mb-12 pb-8 border-b-2 border-gray-50">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white text-3xl font-black shadow-lg ring-4 ring-blue-50">
                        {(userData?.userName || "U").charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-black uppercase font-serif tracking-tighter">
                            User Information
                        </h2>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Account details & personal info</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-5">
                        {/* 1. Full Name */}
                        <div className="border-b border-gray-100 pb-3">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Full Name</label>
                            <p className="text-lg font-bold text-gray-800">{userData?.fullName || 'Not provided'}</p>
                        </div>

                        {/* 2. Username (Chỉ hiện cho Author) */}
                        {userData?.role === 'AUTHOR' && (
                            <div className="border-b border-gray-100 pb-3">
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Username</label>
                                <p className="text-lg font-bold text-gray-800">{userData?.userName}</p>
                            </div>
                        )}

                        {/* 3. Email Address */}
                        <div className="border-b border-gray-100 pb-3">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</label>
                            <p className="text-lg font-bold text-gray-800">{displayEmail}</p>
                        </div>

                        {/* 4. Phone Number */}
                        <div className="border-b border-gray-100 pb-3">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Phone Number</label>
                            <p className="text-lg font-bold text-gray-800">{userData?.phoneNumber || 'Not provided'}</p>
                        </div>

                        {/* 5. Password */}
                        <div className="border-b border-gray-100 pb-3">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Password</label>
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-bold text-gray-800 tracking-widest">••••••••••••</p>
                                <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-400 font-bold uppercase tracking-tighter">Secured</span>
                            </div>
                        </div>
                    </div>

                    {/* Nút bấm */}
                    <div className="pt-10 flex flex-col gap-4">
                        <button 
                            onClick={() => navigate('/EditProfile')}
                            className="w-full py-4 bg-blue-600 text-white font-black rounded-lg shadow-lg uppercase text-sm tracking-widest hover:bg-blue-700 transition-all active:scale-95"
                        >
                            Edit Profile
                        </button>
                        
                        <button 
                            onClick={() => navigate(-1)}
                            className="w-full py-3 text-gray-400 font-bold uppercase text-xs hover:text-black transition-all text-center"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
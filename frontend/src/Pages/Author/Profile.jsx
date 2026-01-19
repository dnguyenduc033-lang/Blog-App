import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const storedUser = sessionStorage.getItem('user');
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        if (!currentUser) {
            navigate('/SignIn');
            return;
        }

        const identifier = currentUser.role === 'ADMIN' 
            ? (currentUser.emailAddress || currentUser.email) 
            : currentUser.userName;
        
        axios.get(`http://localhost:9000/Internote/${identifier}`)
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

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-10 border border-gray-100">
                
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
                        <div className="border-b border-gray-100 pb-3">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Full Name</label>
                            <p className="text-lg font-bold text-gray-800">{userData?.fullName || 'Not provided'}</p>
                        </div>

                        {userData?.role === 'AUTHOR' && (
                            <div className="border-b border-gray-100 pb-3">
                                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Username</label>
                                <p className="text-lg font-bold text-gray-800">{userData?.userName}</p>
                            </div>
                        )}

                        <div className="border-b border-gray-100 pb-3">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</label>
                            <p className="text-lg font-bold text-gray-800">{userData?.emailAddress || currentUser?.emailAddress}</p>
                        </div>

                        <div className="border-b border-gray-100 pb-3">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Phone Number</label>
                            <p className="text-lg font-bold text-gray-800">{userData?.phoneNumber || 'Not provided'}</p>
                        </div>

                        {/* Phần Password đồng bộ Icon với SignIn */}
                        <div className="border-b border-gray-100 pb-3">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Password</label>
                            <div className="flex justify-between items-center relative">
                                <p className="text-lg font-bold text-gray-800 tracking-widest">
                                    {showPassword ? (userData?.password || "********") : "••••••••••••"}
                                </p>
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-blue-600">
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.399 8.049 7.21 5 12 5c4.79 0 8.601 3.049 9.964 6.678.07.23.07.468 0 .702-1.363 3.629-5.174 6.678-9.964 6.678-4.79 0-8.601-3.049-9.964-6.678z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 flex flex-col gap-4">
                        <button onClick={() => navigate('/EditProfile')} className="w-full py-4 bg-blue-600 text-white font-black rounded-lg shadow-lg uppercase text-sm tracking-widest hover:bg-blue-700 transition-all active:scale-95">
                            Edit Profile
                        </button>
                        <button onClick={() => navigate(-1)} className="w-full py-3 text-gray-400 font-bold uppercase text-xs hover:text-black transition-all text-center">
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

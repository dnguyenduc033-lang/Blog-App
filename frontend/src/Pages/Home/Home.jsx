import React from 'react'

const Home = () => {
  return (
    <div className="home flex flex-col items-center justify-center min-h-screen w-full">
      <div className="hero text-center mb-10"> 
        <h1 className="text-5xl font-bold">Welcome to My Blog!</h1>
        
        {/* Dãn cách đoạn mô tả */}
        <p className="mt-8 text-xl">
          Create, Share, and Explore content across a range of categories.
        </p>
        
        {/* Dãn cách nút và phóng to */}
        <div className="mt-10">
          <button 
            type="button" 
            className="text-white bg-green-700 box-border border-2 border-transparent hover:border-black hover:bg-green-600 focus:ring-4 focus:ring-green-300 shadow-xs font-medium leading-6 rounded-full text-xl px-8 py-4 focus:outline-none transition-all duration-200"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home

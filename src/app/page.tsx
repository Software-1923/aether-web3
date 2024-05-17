"use client";

import React, { useEffect } from 'react';
import './HomePage.css';

const HomePage: React.FC = () => {
  useEffect(() => {
    const currentUrl = window.location.href;
    if (currentUrl.endsWith('.html')) {
      const newUrl = currentUrl.slice(0, -5);
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  return (
    <div className="bg-gray-900 text-white flex justify-center items-center min-h-screen">
      <div className="container text-center">
        <div className="cool font-bold text-3xl leading-6 max-w-20rem inline-block">
          <span className="text-shadow">Home</span>
        </div>
        <div className="terminal relative">
          <h1 className="font-mono text-green-500">Page</h1>
          <div className="before-circle absolute top-0 left-0 h-4 bg-gray-700 text-green-500 w-full text-2xl line-0 p-14 text-indent-4">
            <div className="mx-auto w-4 h-4 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <div id="otherside-root" style={{ zIndex: 2147483647, position: 'relative' }}>
        <div id="hyper-main-container">
          <div id="hyper-menu-shadow-root"></div>
          <div id="assistant-shadow-root"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

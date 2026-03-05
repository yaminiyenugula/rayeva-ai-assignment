import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold">🌱 Rayeva AI</h1>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                <p className="text-sm opacity-90">Eco-Commerce AI Solutions</p>
              </div>
            </div>
          </div>
          <div className="text-sm opacity-75">
            AI-Powered Sustainability for E-Commerce
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

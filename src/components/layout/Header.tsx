import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BarChart2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Insurance Intelligence Africa</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link 
              to="/broker-survey" 
              className={`${isActive('/broker-survey') ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
            >
              Broker Survey
            </Link>
            <Link 
              to="/thought-leadership" 
              className={`${isActive('/thought-leadership') ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
            >
              Thought Leadership
            </Link>
            <Link 
              to="/news" 
              className={`${isActive('/news') ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600`}
            >
              News Room
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  );
}
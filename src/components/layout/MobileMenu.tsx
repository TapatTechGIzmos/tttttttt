import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-64 bg-white p-6">
        <div className="flex justify-end mb-8">
          <button onClick={onClose} className="p-2">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link to="/broker-survey" className="text-gray-700 hover:text-blue-600" onClick={onClose}>
            Broker Survey
          </Link>
          <Link to="/thought-leadership" className="text-gray-700 hover:text-blue-600" onClick={onClose}>
            Thought Leadership
          </Link>
          <Link to="/news" className="text-gray-700 hover:text-blue-600" onClick={onClose}>
            News Room
          </Link>
        </nav>
      </div>
    </div>
  );
}
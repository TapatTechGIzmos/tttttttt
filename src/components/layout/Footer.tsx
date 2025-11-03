import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center"><Mail className="h-5 w-5 mr-2" /> contact@insuranceintelligence.africa</p>
              <p className="flex items-center"><Phone className="h-5 w-5 mr-2" /> 0027 (76) 662 1687</p>
              <p className="flex items-center"><MapPin className="h-5 w-5 mr-2" /> 1 Maxwell Dr<br />
                <span className="ml-7">Sunninghill, Johannesburg<br /></span>
                <span className="ml-7">South Africa, 2157</span>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-blue-400">Home</a></li>
              <li><a href="/broker-survey" className="hover:text-blue-400">Broker Survey</a></li>
              <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `mailto:subscribe@insuranceintelligence.africa`;
            }}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Insurance Intelligence Africa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
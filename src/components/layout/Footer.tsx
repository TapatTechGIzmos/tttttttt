import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm sm:text-base">
              <p className="flex items-start"><Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-0.5 flex-shrink-0" /> <span className="break-words">contact@insuranceintelligence.africa</span></p>
              <p className="flex items-center"><Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" /> 0027 (76) 662 1687</p>
              <p className="flex items-start"><MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>1 Maxwell Dr<br />
                  Sunninghill, Johannesburg<br />
                  South Africa, 2157
                </span>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><a href="/" className="hover:text-blue-400">Home</a></li>
              <li><a href="/broker-survey" className="hover:text-blue-400">Broker Survey</a></li>
              <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Newsletter</h3>
            <form className="space-y-3 sm:space-y-4" onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `mailto:subscribe@insuranceintelligence.africa`;
            }}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded hover:bg-blue-700 w-full">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm md:text-base">&copy; {new Date().getFullYear()} Insurance Intelligence Africa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
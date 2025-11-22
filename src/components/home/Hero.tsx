import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';

export default function Hero() {
  return (
    <div className="bg-blue-900">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full">
          <img
            src="https://res.cloudinary.com/dnunw2a7q/image/upload/v1762634063/Insurance_Intelligence_Africa_PTT_2025_GIF_002_uwhs78.gif"
            alt="Diverse team of insurance brokers in professional consultation"
            className="w-full h-auto object-contain"
          />
          <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 left-1/2 transform -translate-x-1/2 md:-translate-x-0 md:left-1/2 md:translate-x-[10%] px-2 sm:px-0 w-auto flex justify-center">
            <Link to="/broker-survey" className="inline-block bg-blue-600 text-white px-4 py-1.5 sm:px-8 sm:py-2.5 md:px-12 md:py-3 lg:px-16 lg:py-4 rounded-md hover:bg-blue-700 transition-colors text-xs sm:text-sm md:text-base lg:text-lg font-semibold shadow-lg whitespace-nowrap">
              Take Broker Survey
            </Link>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 text-white">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 mt-8 sm:mt-10 md:mt-12">
              Leading Insurance Market Research in Africa
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto">
              Delivering actionable insights and market intelligence to shape the future of African insurance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
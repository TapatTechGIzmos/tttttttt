import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';

export default function Hero() {
  return (
    <div className="bg-blue-900">
      <div className="max-w-7xl mx-auto">
        <div className="w-full">
          <img
            src="https://res.cloudinary.com/dnunw2a7q/image/upload/v1762634063/Insurance_Intelligence_Africa_PTT_2025_GIF_002_uwhs78.gif"
            alt="Diverse team of insurance brokers in professional consultation"
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="px-4 sm:px-6 lg:px-8 py-12 text-white">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Leading Insurance Market Research in Africa
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Delivering actionable insights and market intelligence to shape the future of African insurance
            </p>
            <Link to="/broker-survey" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors">
              Take Broker Survey
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
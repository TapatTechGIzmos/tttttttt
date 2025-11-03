import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-blue-900 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1920&q=80"
          alt="Diverse team of insurance brokers in professional consultation"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Leading Insurance Market Research in Africa
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Delivering actionable insights and market intelligence to shape the future of African insurance
          </p>
          <Link to="/broker-survey" className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700">
            Take Broker Survey
          </Link>
        </div>
      </div>
    </div>
  );
}
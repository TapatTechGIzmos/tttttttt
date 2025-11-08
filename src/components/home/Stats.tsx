import React from 'react';

export default function Stats() {
  const stats = [
    { label: 'Countries Covered', value: '54' },
    { label: 'Research Reports', value: '500+' },
    { label: 'Industry Partners', value: '200+' },
    { label: 'Years of Experience', value: '15+' }
  ];

  return (
    <div className="bg-white py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">{stat.value}</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
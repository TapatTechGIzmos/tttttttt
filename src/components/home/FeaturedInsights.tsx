import React from 'react';

export default function FeaturedInsights() {
  const insights = [
    {
      title: 'The Future of InsurTech in Africa',
      excerpt: 'Exploring how technology is reshaping the insurance landscape across the continent.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800'
    },
    {
      title: 'Microinsurance Market Trends',
      excerpt: 'Analysis of emerging opportunities in the African microinsurance sector.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800'
    },
    {
      title: 'Digital Transformation in Insurance',
      excerpt: 'How African insurers are adapting to the digital age.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800'
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((insight) => (
            <div key={insight.title} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={insight.image} alt={insight.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{insight.title}</h3>
                <p className="text-gray-600 mb-4">{insight.excerpt}</p>
                <a href="#" className="text-blue-600 hover:text-blue-700">Read more →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
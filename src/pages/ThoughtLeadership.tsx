import React from 'react';
import { Download, ArrowRight } from 'lucide-react';

interface Resource {
  type: 'article' | 'whitepaper' | 'research';
  title: string;
  description: string;
  author: string;
  date: string;
  downloadUrl?: string;
  readMoreUrl: string;
  image: string;
}

const resources: Resource[] = [
  {
    type: 'article',
    title: 'The Future of Microinsurance in Africa',
    description: 'Exploring innovative approaches to extending insurance coverage to underserved populations across the continent.',
    author: 'Dr. Sarah Johnson',
    date: '2024-03-15',
    readMoreUrl: '#',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800'
  },
  {
    type: 'whitepaper',
    title: 'Digital Transformation in African Insurance',
    description: 'A comprehensive analysis of technology adoption trends and their impact on insurance distribution.',
    author: 'Insurance Intelligence Africa Research Team',
    date: '2024-03-10',
    downloadUrl: '#',
    readMoreUrl: '#',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800'
  },
  {
    type: 'research',
    title: 'InsurTech Landscape Report 2024',
    description: 'An in-depth analysis of the emerging InsurTech ecosystem across African markets.',
    author: 'Technology Research Division',
    date: '2024-03-01',
    downloadUrl: '#',
    readMoreUrl: '#',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800'
  }
];

export default function ThoughtLeadership() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Thought Leadership</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <div key={resource.title} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={resource.image} 
                alt={resource.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">{resource.date}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <p className="text-sm text-gray-500 mb-4">By {resource.author}</p>
                
                <div className="flex items-center space-x-4">
                  <a
                    href={resource.readMoreUrl}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                  {resource.downloadUrl && (
                    <a
                      href={resource.downloadUrl}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      Download <Download className="w-4 h-4 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
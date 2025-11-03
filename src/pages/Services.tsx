import React from 'react';
import ServiceCard from '../components/services/ServiceCard';
import { BarChart2, Search, FileText, Database } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'Market Analysis',
      description: 'Comprehensive analysis of insurance markets across Africa',
      icon: BarChart2
    },
    {
      title: 'Research Studies',
      description: 'In-depth research on specific insurance sectors and trends',
      icon: Search
    },
    {
      title: 'Custom Reports',
      description: 'Tailored research reports based on your specific needs',
      icon: FileText
    },
    {
      title: 'Data Analytics',
      description: 'Advanced analytics and data-driven insights',
      icon: Database
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
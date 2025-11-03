import React from 'react';
import { Shield, Heart, TrendingUp, Brain, Link as LinkIcon, Users } from 'lucide-react';

const purposes = [
  {
    title: 'Advancing Risk Protection',
    description: 'To further the coverage of African populations by providing insights that enable more inclusive and accessible insurance products, protecting individuals and businesses from unforeseen risks.',
    icon: Shield
  },
  {
    title: 'Empowering Livelihoods',
    description: 'To improve the quality of life for African communities by promoting financial resilience through data-driven insurance solutions.',
    icon: Heart
  },
  {
    title: 'Supporting Industry Growth',
    description: "To drive the growth and innovation of Africa's insurance sector by delivering comprehensive market research and actionable insights.",
    icon: TrendingUp
  },
  {
    title: 'Enabling Strategic Decisions',
    description: 'To empower stakeholders, including insurers, policymakers, and investors, with accurate data to make informed and impactful decisions.',
    icon: Brain
  },
  {
    title: 'Enhancing Integration and Linkages',
    description: 'To identify opportunities for improving integration and linkages across the insurance value chain, thereby enhancing operational efficiency and expanding market reach.',
    icon: LinkIcon
  },
  {
    title: 'Increasing Insurance Penetration',
    description: 'To develop strategies and insights that enhance insurance penetration, ensuring wider access to financial protection and risk management solutions.',
    icon: Users
  }
];

export default function Purpose() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Our Purpose</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {purposes.map((purpose) => {
            const Icon = purpose.icon;
            return (
              <div key={purpose.title} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <Icon className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-blue-900">{purpose.title}</h3>
                </div>
                <p className="text-gray-600">{purpose.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { LineChart, FileText, Gift, Clock, Lock } from 'lucide-react';

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Benefit({ icon, title, description }: BenefitProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default function SurveyBenefits() {
  const benefits = [
    {
      icon: <Gift className="h-6 w-6 text-blue-600" />,
      title: "Prize Draw: FREE Corporate Website Package!",
      description: "Win Your Digital Storefront: Enter the draw to win one of five professional website packages (valued at P5,000), instantly building your online presence and modernizing your brokerage—at zero cost to you. EVERY valid participant receives an A5 Hard Cover Notebook."
    },
    {
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      title: "Guaranteed Value: Exclusive Insights",
      description: "Strategize for 2026: Receive a complimentary executive summary of the final report (valued at R12,000), giving you unparalleled insight into regional trends, client expectations, and growth opportunities across Botswana and Zambia."
    },
    {
      icon: <LineChart className="h-6 w-6 text-blue-600" />,
      title: "Elevate Your Influence",
      description: "Your confidential feedback directly influences how insurers improve their services, products, and broker support across the region. This is your platform to impact industry-wide change."
    },
    {
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      title: "Exclusive Insights & Competitive Edge",
      description: "The report summary provides hyper-localized market data essential for identifying under-served niches, optimizing your product mix, and staying ahead of direct competitors."
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Quick, Confidential, and Flexible",
      description: "Takes just 5-10 minutes to complete. Start now and finish later with our save-and-continue feature. Your responses are 100% anonymous, protecting your insurer relationships while enabling honest, unfiltered feedback."
    }
  ];

  return (
    <div className="space-y-8">
      {benefits.map((benefit) => (
        <Benefit
          key={benefit.title}
          icon={benefit.icon}
          title={benefit.title}
          description={benefit.description}
        />
      ))}
    </div>
  );
}
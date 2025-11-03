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
      icon: <LineChart className="h-6 w-6 text-blue-600" />,
      title: "Shape the Future of Insurance",
      description: "Your feedback directly influences how insurers improve their services across Southern Africa, covering Botswana, Namibia, South Africa, and Zambia."
    },
    {
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      title: "Exclusive Insights",
      description: "Receive a complimentary executive summary of the comprehensive report (valued at R12,000) with regional market insights."
    },
    {
      icon: <Gift className="h-6 w-6 text-blue-600" />,
      title: "Win Valuable Prizes",
      description: "Enter our prize draw for a R5,000 shopping voucher. Double your chances by participating in both commercial and personal lines surveys."
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Quick and Flexible",
      description: "Takes just 5-10 minutes to complete. Start now and finish later with our save-and-continue feature."
    },
    {
      icon: <Lock className="h-6 w-6 text-blue-600" />,
      title: "Completely Confidential",
      description: "Your responses are 100% anonymous, protecting your insurer relationships while enabling honest feedback."
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
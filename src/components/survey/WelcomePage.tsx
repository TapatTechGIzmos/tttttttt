import React from 'react';
import { CheckCircle } from 'lucide-react';
import { SurveyData } from '../../pages/BotswanaSurvey';

interface WelcomePageProps {
  data: SurveyData;
  updateData: (data: Partial<SurveyData>) => void;
}

export default function WelcomePage({ data, updateData }: WelcomePageProps) {
  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Thank you for participating in the 2025/6 Insurance Broker Survey. Your feedback is essential.
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">What to Expect</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <span className="text-gray-700">This survey will take approximately 15-20 minutes to complete</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <span className="text-gray-700">Your responses will remain confidential and will be used for research purposes only</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <span className="text-gray-700">You can navigate back and forth between pages using the navigation buttons</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <span className="text-gray-700">Your insights will help shape the future of insurance brokerage in Botswana</span>
          </li>
        </ul>
      </div>

      <div className="text-center py-4">
        <p className="text-gray-600">Click "Next" to begin the survey</p>
      </div>
    </div>
  );
}

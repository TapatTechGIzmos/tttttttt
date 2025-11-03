import React from 'react';
import SurveyHeader from '../components/broker/SurveyHeader';
import SurveyBenefits from '../components/broker/SurveyBenefits';
import CountrySelection from '../components/broker/CountrySelection';

export default function BrokerSurvey() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SurveyHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Why Participate?</h2>
            <SurveyBenefits />
          </div>
          
          <div>
            <CountrySelection />
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import SurveyHeader from '../components/broker/SurveyHeader';
import SurveyBenefits from '../components/broker/SurveyBenefits';
import CountrySelection from '../components/broker/CountrySelection';

export default function BrokerSurvey() {
  console.log('BrokerSurvey component is rendering');

  return (
    <div className="py-8 sm:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SurveyHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <CountrySelection />

          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Why Participate?</h2>
            <SurveyBenefits />
          </div>
        </div>
      </div>
    </div>
  );
}
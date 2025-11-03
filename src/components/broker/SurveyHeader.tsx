import React from 'react';

export default function SurveyHeader() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4">Take Part in the African Broker Survey</h1>
      <p className="text-xl text-gray-600">Your Voice Matters!</p>
      <div className="mt-8 inline-block bg-blue-50 border border-blue-200 rounded-lg px-6 py-4">
        <p className="text-blue-800">
          Inaugural survey focusing on Botswana, Namibia, South Africa, and Zambia
        </p>
      </div>
    </div>
  );
}
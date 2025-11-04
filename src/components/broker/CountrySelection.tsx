import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SurveyButtonProps {
  type: 'life' | 'non-life';
  onClick: () => void;
}

const SurveyButton: React.FC<SurveyButtonProps> = ({ type, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between w-full px-6 py-3 text-left text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all group"
  >
    <span className="font-medium">
      {type === 'life' ? 'Life Insurance Survey' : 'Short-Term Insurance Survey'}
    </span>
    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
  </button>
);

export default function CountrySelection() {
  const navigate = useNavigate();
  const countries = ['Botswana', 'Zambia'];

  const handleSurveyClick = (country: string, type: 'life' | 'non-life') => {
    if (country === 'Botswana' && type === 'non-life') {
      navigate('/broker-survey/botswana-short-term');
    } else if (country === 'Botswana' && type === 'life') {
      navigate('/broker-survey/botswana-life');
    } else {
      alert(`Survey for ${country} ${type === 'life' ? 'Life' : 'Short-Term'} Insurance coming soon!`);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Select Your Survey</h2>

      <div className="space-y-8">
        {countries.map((country) => (
          <div key={country} className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              {country}
            </h2>
            <div className="space-y-3 pl-2">
              <SurveyButton
                type="life"
                onClick={() => handleSurveyClick(country, 'life')}
              />
              <SurveyButton
                type="non-life"
                onClick={() => handleSurveyClick(country, 'non-life')}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
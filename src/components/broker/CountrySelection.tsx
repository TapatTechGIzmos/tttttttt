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
    className="flex items-center justify-between w-full px-4 sm:px-6 py-2.5 sm:py-3 text-left text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all group"
  >
    <span className="font-medium text-sm sm:text-base">
      {type === 'life' ? 'Life Insurance Survey' : 'Short-Term Insurance Survey'}
    </span>
    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform flex-shrink-0" />
  </button>
);

export default function CountrySelection() {
  const navigate = useNavigate();
  const countries = [
    {
      name: 'Botswana',
      flag: 'https://res.cloudinary.com/dnunw2a7q/image/upload/v1762636211/botswana-flag_ke8wfr.webp'
    },
    {
      name: 'Zambia',
      flag: 'https://res.cloudinary.com/dnunw2a7q/image/upload/v1762636211/zambia-flag_y48kbn.webp'
    }
  ];

  const handleSurveyClick = (country: string, type: 'life' | 'non-life') => {
    if (country === 'Botswana' && type === 'non-life') {
      navigate('/broker-survey/botswana-short-term');
    } else if (country === 'Botswana' && type === 'life') {
      navigate('/broker-survey/botswana-life');
    } else if (country === 'Zambia' && type === 'non-life') {
      navigate('/broker-survey/zambia-short-term');
    } else if (country === 'Zambia' && type === 'life') {
      navigate('/broker-survey/zambia-life');
    } else {
      alert(`Survey for ${country} ${type === 'life' ? 'Life' : 'Short-Term'} Insurance coming soon!`);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">Select Your Survey</h2>

      <div className="space-y-6 sm:space-y-8">
        {countries.map((country) => (
          <div key={country.name} className="space-y-3">
            <div className="flex items-center gap-2 sm:gap-3 border-b border-gray-200 pb-2">
              <img
                src={country.flag}
                alt={`${country.name} flag`}
                className="w-7 h-5 sm:w-8 sm:h-6 object-cover rounded shadow-sm"
              />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                {country.name}
              </h2>
            </div>
            <div className="space-y-2 sm:space-y-3 pl-0 sm:pl-2">
              <SurveyButton
                type="life"
                onClick={() => handleSurveyClick(country.name, 'life')}
              />
              <SurveyButton
                type="non-life"
                onClick={() => handleSurveyClick(country.name, 'non-life')}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
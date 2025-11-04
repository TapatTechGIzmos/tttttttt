import React from 'react';
import { SurveyData } from '../../pages/BotswanaSurvey';

interface BrokerageOverviewPageProps {
  data: SurveyData;
  updateData: (data: Partial<SurveyData>) => void;
}

export default function BrokerageOverviewPage({ data, updateData }: BrokerageOverviewPageProps) {
  const districts = [
    'South East District',
    'North East District',
    'Southern District',
    'Kweneng District',
    'Kgatleng Distrct',
    'Central District',
    'Ghanzi District',
    'Kgalagadi District',
    'Ngamiland District',
    'Chobe District',
  ];

  const services = [
    'Long term broker',
    'Short term broker',
    'Medical Aid broker',
    'Other Financial Advisory Services',
  ];

  const personalLinesSegments = [
    'Mass market',
    'Middle market',
    'Affluent market',
    'We do not offer personal lines',
  ];

  const corporateClientSizes = [
    'Micro Enterprise: <10 employees',
    'Small Enterprise: 10 to 49 employees',
    'Medium Enterprise: 50 to 99 employees',
    'Commercial Enterprise: 100 to 299 employees',
    'Large Corporate Enterprise: 300 plus employees',
  ];

  const handleDistrictChange = (district: string) => {
    const newDistricts = data.districts.includes(district)
      ? data.districts.filter((d) => d !== district)
      : [...data.districts, district];
    updateData({ districts: newDistricts });
  };

  const handleServiceChange = (service: string) => {
    const newServices = data.services.includes(service)
      ? data.services.filter((s) => s !== service)
      : [...data.services, service];
    updateData({ services: newServices });
  };

  const handlePersonalLinesChange = (segment: string) => {
    const newSegments = data.personalLinesSegment.includes(segment)
      ? data.personalLinesSegment.filter((s) => s !== segment)
      : [...data.personalLinesSegment, segment];
    updateData({ personalLinesSegment: newSegments });
  };

  const handleCorporateClientChange = (size: string) => {
    const newSizes = data.corporateClientSize.includes(size)
      ? data.corporateClientSize.filter((s) => s !== size)
      : [...data.corporateClientSize, size];
    updateData({ corporateClientSize: newSizes });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Brokerage Overview</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            6. In which provinces/districts do you mainly source your clients/business?
          </label>
          <div className="space-y-2">
            {districts.map((district) => (
              <label key={district} className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.districts.includes(district)}
                  onChange={() => handleDistrictChange(district)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{district}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            7. How many people work for the brokerage?
          </label>
          <div className="space-y-2">
            {['Solo Broker', '2 to 5 people', '6 to 20 people', '21 to 30 people', '31 to 50 people', '50 plus people'].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="brokerageSize"
                  value={option}
                  checked={data.brokerageSize === option}
                  onChange={(e) => updateData({ brokerageSize: e.target.value })}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            8. What services does your insurance brokerage provide? (Select all that apply)
          </label>
          <div className="space-y-2">
            {services.map((service) => (
              <label key={service} className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.services.includes(service)}
                  onChange={() => handleServiceChange(service)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{service}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            9. Within your personal Lines, which customer segment do you primarily target? (Select all that apply)
          </label>
          <div className="space-y-2">
            {personalLinesSegments.map((segment) => (
              <label key={segment} className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.personalLinesSegment.includes(segment)}
                  onChange={() => handlePersonalLinesChange(segment)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{segment}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            10. Which size of corporate clients do you mainly target with your Commercial/Corporate Lines? (Select all that apply)
          </label>
          <div className="space-y-2">
            {corporateClientSizes.map((size) => (
              <label key={size} className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.corporateClientSize.includes(size)}
                  onChange={() => handleCorporateClientChange(size)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{size}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { SurveyData } from '../../pages/BotswanaSurvey';

interface MarketOutlookPageProps {
  data: SurveyData;
  updateData: (data: Partial<SurveyData>) => void;
  surveyType?: string;
}

export default function MarketOutlookPage({ data, updateData, surveyType }: MarketOutlookPageProps) {
  const isLifeSurvey = surveyType === 'life';
  const concerns = [
    'Technological Disruption and Adoption',
    'Changing Client Expectations',
    'Cybersecurity Risks',
    'Regulatory and Compliance Pressures',
    'Climate Change and Sustainability',
    'Talent Shortages and Succession Planning',
    'Economic Uncertainty and Market Volatility',
    'Competition from Insurtech and Direct-to-Consumer Models',
    'Data Management and Analytics',
    'Rising Operational Costs',
  ];

  const communicationPreferences = [
    'Business planning session',
    'Strategic planning workshops',
    'Training events',
    'Broker road shows',
    'Regular meetings with broker consultant',
    'Other (please specify)',
  ];

  const supportNeeds = [
    'Product training',
    'Enhanced customer service',
    'Faster underwriting',
    'Increased Insurance marketing',
    'Market insights on end-customer segments',
    'Selling skills training',
    'Other (please specify)',
  ];

  const handleConcernChange = (concern: string) => {
    const newConcerns = data.biggestConcerns.includes(concern)
      ? data.biggestConcerns.filter((c) => c !== concern)
      : data.biggestConcerns.length < 5
      ? [...data.biggestConcerns, concern]
      : data.biggestConcerns;
    updateData({ biggestConcerns: newConcerns });
  };

  const handleCommunicationChange = (pref: string) => {
    const newPrefs = data.communicationPreferences.includes(pref)
      ? data.communicationPreferences.filter((p) => p !== pref)
      : [...data.communicationPreferences, pref];
    updateData({ communicationPreferences: newPrefs });
  };

  const handleSupportChange = (support: string) => {
    const newSupport = data.supportNeeds.includes(support)
      ? data.supportNeeds.filter((s) => s !== support)
      : [...data.supportNeeds, support];
    updateData({ supportNeeds: newSupport });
  };

  const handleNewLifeInsurerChange = (insurer: string) => {
    const newInsurers = data.newLifeInsurers?.includes(insurer)
      ? data.newLifeInsurers.filter((i) => i !== insurer)
      : [...(data.newLifeInsurers || []), insurer];
    updateData({ newLifeInsurers: newInsurers });
  };

  const handleNewEntrantCriteriaChange = (criteria: string) => {
    const newCriteria = data.newEntrantCriteria?.includes(criteria)
      ? data.newEntrantCriteria.filter((c) => c !== criteria)
      : data.newEntrantCriteria?.length >= 3
      ? data.newEntrantCriteria
      : [...(data.newEntrantCriteria || []), criteria];
    updateData({ newEntrantCriteria: newCriteria });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Market Outlook and Support Needs</h2>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              27. What are your biggest concerns for the coming year,2026? (select up to 5)
            </label>
            <span className="text-xs text-blue-600 font-medium">
              Selected: {data.biggestConcerns.length} of 5
            </span>
          </div>
          <div className="space-y-2">
            {concerns.map((concern) => (
              <label key={concern} className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.biggestConcerns.includes(concern)}
                  onChange={() => handleConcernChange(concern)}
                  disabled={!data.biggestConcerns.includes(concern) && data.biggestConcerns.length >= 5}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span className={`ml-3 ${!data.biggestConcerns.includes(concern) && data.biggestConcerns.length >= 5 ? 'text-gray-400' : 'text-gray-700'}`}>{concern}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            28. What specific barriers are you facing when trying to convert prospects into clients, and how can this insurer help address these challenges?
          </label>
          <textarea
            value={data.barriersToBusiness}
            onChange={(e) => updateData({ barriersToBusiness: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your response..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            29. With which of the following new {isLifeSurvey ? 'Life' : 'Short-Term'} Insurers have you placed business or plan to place business in the next 12 months? (Select all that apply)
          </label>
          <div className="space-y-2">
            {(isLifeSurvey ? [
              'Afritec Life Insurance',
              'Exclusive Life Insurance',
              'Westlife Insurance Botswana',
              'Have not engaged and plan not to in the next 12 months',
            ] : [
              'Active Drive Capital',
              'Insure Guard',
              'Legalwise Botswana',
              'Lords Insurance',
              'Westsure Insurance',
              'Have not engaged and plan not to in the next 12 months',
            ]).map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.newLifeInsurers?.includes(option) || false}
                  onChange={() => handleNewLifeInsurerChange(option)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              29a. For a new market entrant, to win new business from your brokerage, which THREE resources, services, or commitments are most critical to offer? (Please select up to 3)
            </label>
            <span className="text-xs text-blue-600 font-medium">
              Selected: {data.newEntrantCriteria?.length || 0} of 3
            </span>
          </div>
          <div className="space-y-2">
            {[
              'Direct access to senior and empowered underwriters with local mandates',
              'Superior and fixed binder fees are designed to offset the risk of switching capacity.',
              'Quick claims settlement (straightforward, simplified process (e.g., 48-hour assessment).',
              'Agile digital tools that integrate with our existing systems (e.g., real-time quoting API, faster MTA processing).',
              'Specialised risk expertise for emerging sectors',
              'Joint marketing funds and resources to help us win business from their target segment.',
              'Highly rated reinsurance backing and proven local capitalisation to ensure long-term stability.',
              'Continuous product training',
              'Other',
            ].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.newEntrantCriteria?.includes(option) || false}
                  onChange={() => handleNewEntrantCriteriaChange(option)}
                  disabled={!data.newEntrantCriteria?.includes(option) && (data.newEntrantCriteria?.length || 0) >= 3}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span className={`ml-3 ${!data.newEntrantCriteria?.includes(option) && (data.newEntrantCriteria?.length || 0) >= 3 ? 'text-gray-400' : 'text-gray-700'}`}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            30. Which products do you expect to be the biggest source of growth for your business in the coming year,2026?
          </label>
          <textarea
            value={data.growthProducts}
            onChange={(e) => updateData({ growthProducts: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your response..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            31. Indicate the extent to which your business is currently using or plans to use Artificial Intelligence (AI)
          </label>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong>1 =</strong> Not using or planning to use<br />
              <strong>2 =</strong> Considering but not yet implemented<br />
              <strong>3 =</strong> Piloting or testing<br />
              <strong>4 =</strong> Partially implemented<br />
              <strong>5 =</strong> Fully implemented
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="aiUsage"
                  value={rating}
                  checked={data.aiUsage === rating}
                  onChange={() => updateData({ aiUsage: rating })}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">{rating}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              32. How could your insurer partners better communicate with your company to improve service levels?
            </label>
            <span className="text-xs text-blue-600 font-medium">
              Selected: {data.communicationPreferences.length} of {communicationPreferences.length}
            </span>
          </div>
          <div className="space-y-2">
            {communicationPreferences.map((pref) => (
              <label key={pref} className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.communicationPreferences.includes(pref)}
                  onChange={() => handleCommunicationChange(pref)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{pref}</span>
              </label>
            ))}
          </div>
          {data.communicationPreferences.includes('Other (please specify)') && (
            <input
              type="text"
              value={data.communicationOther}
              onChange={(e) => updateData({ communicationOther: e.target.value })}
              placeholder="Please specify"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              34. What types of support from insurers would help you attract new clients? (Select all that apply)
            </label>
            <span className="text-xs text-blue-600 font-medium">
              Selected: {data.supportNeeds.length} of {supportNeeds.length}
            </span>
          </div>
          <div className="space-y-2">
            {supportNeeds.map((support) => (
              <label key={support} className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.supportNeeds.includes(support)}
                  onChange={() => handleSupportChange(support)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{support}</span>
              </label>
            ))}
          </div>
          {data.supportNeeds.includes('Other (please specify)') && (
            <input
              type="text"
              value={data.supportNeedsOther}
              onChange={(e) => updateData({ supportNeedsOther: e.target.value })}
              placeholder="Please specify"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={data.optOut}
              onChange={(e) => updateData({ optOut: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
            />
            <span className="ml-3 text-sm text-gray-700">
              <strong>35. Future correspondence:</strong> I wish to opt out of any follow-up correspondence regarding the Long-term Insurance 2025/26 survey, and I acknowledge that this is inclusive of not being sent the executive summary report and being included in the prize draw.
            </span>
          </label>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <p className="text-gray-700 font-medium">
            Thank you for taking the time to complete this survey. Your feedback is invaluable in helping us understand and improve the insurance brokerage landscape in Botswana.
          </p>
        </div>
      </div>
    </div>
  );
}

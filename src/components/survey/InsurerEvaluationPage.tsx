import React from 'react';
import { SurveyData } from '../../pages/BotswanaSurvey';

interface InsurerEvaluationPageProps {
  data: SurveyData;
  updateData: (data: Partial<SurveyData>) => void;
  insurers?: string[];
}

export default function InsurerEvaluationPage({ data, updateData, insurers: customInsurers }: InsurerEvaluationPageProps) {
  const defaultInsurers = [
    'Active Drive Capital',
    'Alpha Direct Insurance',
    'Axion Life',
    'Botswana Insurance Company (BIC)',
    'Bryte Risk Service',
    'Export Credit Insurance & Guarantee Company',
    'Hollard Insurance',
    'Insure Guard',
    'Legalwise Botswana',
    'Lords Insurance',
    'Old Mutual Short-Term Insurance',
    'Phoenix Assurance',
    'Sesiro Insurance',
    'Sunshine Insurance',
    'Westsure Insurance',
  ];

  const insurers = customInsurers || defaultInsurers;

  // Re-mapping factors for easier use in the new ranking structure
  const factorList = [
    { key: 'flexibility', label: 'Flexibility Underwriting, Risk Pricing and access to Decision-Makers' },
    { key: 'businessGrowth', label: 'Business Growth Support' },
    { key: 'operationalEfficiency', label: 'Operational Efficiency' },
    { key: 'productQuality', label: 'Product Quality' },
    { key: 'bindersAndIncentives', label: "Binder's Fee and Incentives" },
    { key: 'brandAndMarket', label: 'Brand and Market Presence' },
  ];

  const ratingCategories = [
    { key: 'underwriting', label: 'Overall underwriting experience (Client on boarding, Quoting)' },
    { key: 'documentation', label: 'Policy documentation TAT' },
    { key: 'claims', label: 'Overall claims experience' },
    { key: 'postSale', label: 'Overall post sale service' },
    { key: 'relationship', label: 'Overall relationship management' },
    { key: 'proportion', label: 'Proportion of business placed in the last 12 months' },
  ];

  // Map for Q19 ratings to display label vs. captured value
  const serviceRatingOptions = [
      { value: 5, label: '5 - Excellent' },
      { value: 4, label: '4 - Good' },
      { value: 3, label: '3 - Satisfactory' },
      { value: 2, label: '2 - Poor' },
      { value: 1, label: '1 - Very Poor' },
  ];

  const handleInsurerChange = (insurer: string) => {
    const isSelected = data.primaryInsurers.includes(insurer);
    let newInsurers;

    if (isSelected) {
      newInsurers = data.primaryInsurers.filter((i) => i !== insurer);
    } else {
      if (data.primaryInsurers.length < 3) {
        newInsurers = [...data.primaryInsurers, insurer];
      } else {
        return;
      }
    }

    updateData({ primaryInsurers: newInsurers });
  };

  /**
   * New Handler for Rank-to-Factor assignment.
   * rank: the numerical rank (1-6)
   * factorKey: the string key of the factor selected for that rank
   */
  const handlePlacementFactorAssignment = (rank: number, factorKey: string) => {

    // Create a new placementFactors object based on current state
    let newPlacementFactors = { ...data.placementFactors };

    // 1. Clear the rank of the factor that is currently assigned this specific rank
    const factorToUnrank = Object.keys(newPlacementFactors).find(
        key => newPlacementFactors[key as keyof typeof newPlacementFactors] === rank
    );
    if (factorToUnrank) {
        newPlacementFactors[factorToUnrank as keyof typeof newPlacementFactors] = 0;
    }

    // 2. Assign the new rank to the chosen factor
    if (factorKey !== '') {
        newPlacementFactors[factorKey as keyof typeof newPlacementFactors] = rank;
    }

    // 3. Update the state
    updateData({
      placementFactors: newPlacementFactors,
    });
  };


  const handleInsurerRating = (insurer: string, category: string, rating: number) => {
    const insurerRatings = data.insurerRatings[insurer] || {
      underwriting: 0,
      documentation: 0,
      claims: 0,
      postSale: 0,
      relationship: 0,
      proportion: 0,
    };

    updateData({
      insurerRatings: {
        ...data.insurerRatings,
        [insurer]: {
          ...insurerRatings,
          [category]: rating,
        },
      },
    });
  };

  // Helper function to find the factor key assigned to a specific rank
  const getFactorKeyByRank = (rank: number): string => {
    const entry = Object.entries(data.placementFactors).find(([key, value]) => value === rank);
    return entry ? entry[0] : '';
  };

  // Helper function to determine the insurer with the highest proportion
  const getHighestProportionInsurer = (): string => {
    let highestInsurer = '';
    let highestProportion = 0;

    data.primaryInsurers.forEach((insurer) => {
      const proportion = data.insurerRatings[insurer]?.proportion || 0;
      if (proportion > highestProportion) {
        highestProportion = proportion;
        highestInsurer = insurer;
      }
    });

    return highestInsurer;
  };

  // Automatically set the deepDiveInsurer based on highest proportion
  const highestProportionInsurer = getHighestProportionInsurer();
  if (highestProportionInsurer && data.deepDiveInsurer !== highestProportionInsurer) {
    // Only update if the value has changed to prevent infinite re-render loop
    // (though React generally handles this better now, it's safer)
    setTimeout(() => updateData({ deepDiveInsurer: highestProportionInsurer }), 0);
  }

  // New Array of Ranks (1 to 6) for iteration
  const ranks = [1, 2, 3, 4, 5, 6];

  // Array for Question 21 ratings (re-added from previous version to ensure labeling logic is preserved)
  const q21Ratings = [
    { key: 'decisionMakers', label: 'Access to decision making underwriters' },
    { key: 'brandReputation', label: 'Brand reputation' },
    { key: 'claimsHandling', label: 'Claims handling' },
    { key: 'winningBusiness', label: 'Helping you win new business' },
    { key: 'insurerAppetite', label: 'Insurer appetite' },
    { key: 'priceCompetitiveness', label: 'Price competitiveness' },
    { key: 'regionalPresence', label: 'Regional presence' },
    { key: 'responsiveness', label: 'Responsiveness and timeliness' },
    { key: 'techInnovation', label: 'Technology innovation' },
    { key: 'midTermAlterations', label: 'Timeliness of Mid-term amendment' },
    { key: 'renewalTerms', label: 'Timeliness of Renewal terms' },
    { key: 'trainingSupport', label: 'Training & Support' },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Insurer Evaluation</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-xl font-bold text-gray-900 mb-3">
            17. Rank the factors in order of importance that you consider when placing business with an insurance company.
          </label>

          <div className="mb-4 pl-6">
            <ul className="list-disc space-y-2 text-gray-700">
              <li>Flexibility Underwriting, Risk Pricing and Access to Decision-Makers</li>
              <li>Product Quality</li>
              <li>Binder's Fee and Incentives</li>
              <li>Business Growth Support</li>
              <li>Operational Efficiency</li>
              <li>Brand and Market Presence</li>
            </ul>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            **1 = Most Important Factor** and **6 = Least Important Factor**.
            *(Each factor must be assigned a unique rank.)*
          </p>

          {/* UI for Question 17 - Table Style for Clarity (Logic reviewed, looks functional) */}
          <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="w-20 px-4 py-2 text-center text-xs font-semibold text-gray-700 uppercase border-b border-r">Rank</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase border-b">Select Factor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranks.map((rank) => {
                            // The currently selected factor key for this rank (or empty string)
                            const currentFactorKey = getFactorKeyByRank(rank);

                            // Factors already assigned a different rank (not 0, and not the current rank)
                            const alreadyRankedKeys = Object.keys(data.placementFactors).filter(
                                key => data.placementFactors[key as keyof typeof data.placementFactors] !== 0 &&
                                             data.placementFactors[key as keyof typeof data.placementFactors] !== rank
                            );

                            // Filter the list of factors to only show:
                            // 1. Factors not yet ranked.
                            // 2. The factor that is currently selected for this rank (to allow the user to see/change it).
                            const availableFactors = factorList.filter(factor =>
                                !alreadyRankedKeys.includes(factor.key)
                            );

                            return (
                                <tr key={rank} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 text-center text-sm font-medium text-blue-700 border-r">
                                        {rank}
                                    </td>
                                    <td className="px-4 py-3">
                                        <select
                                            value={currentFactorKey}
                                            onChange={(e) => handlePlacementFactorAssignment(rank, e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select factor...</option>
                                            {availableFactors.map((factor) => (
                                                <option key={factor.key} value={factor.key}>
                                                    {factor.label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              18. Which three insurer(s) do you place most of your business with, up to 80%?
            </label>
            <span className="text-xs text-blue-600 font-medium">
              Selected: {data.primaryInsurers.length} of 3
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">Please select exactly three insurers</p>
          {/* Checkbox logic for Q18 reviewed, max 3 selection logic looks functional */}
          <div className="space-y-2">
            {insurers.map((insurer) => (
              <label key={insurer} className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.primaryInsurers.includes(insurer)}
                  onChange={() => handleInsurerChange(insurer)}
                  disabled={!data.primaryInsurers.includes(insurer) && data.primaryInsurers.length >= 3}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span className={`ml-3 ${!data.primaryInsurers.includes(insurer) && data.primaryInsurers.length >= 3 ? 'text-gray-400' : 'text-gray-700'}`}>
                  {insurer}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            19. Evaluate the service you have received from your insurance partners in the following areas over the last 12 months
          </label>
          <p className="text-sm text-gray-600 mb-4">Please rate the three insurers you selected in Question 18 (1-5 scale)</p>
          {data.primaryInsurers.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">Please select three insurers in Question 18 above to enable this rating table.</p>
            </div>
          ) : data.primaryInsurers.length < 3 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800">Please select {3 - data.primaryInsurers.length} more insurer(s) in Question 18 to complete your selection.</p>
            </div>
          ) : null}
          {data.primaryInsurers.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 table-fixed">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="w-48 px-4 py-3 text-left text-xs font-medium text-gray-700 border-b">Insurer</th>
                    {ratingCategories.map((cat) => (
                      <th key={cat.key} className="w-40 px-4 py-3 text-left text-xs font-medium text-gray-700 border-b break-words">
                        {cat.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.primaryInsurers.map((insurer) => (
                    <tr key={insurer} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-700">{insurer}</td>
                      {ratingCategories.map((cat) => (
                        <td key={cat.key} className="px-4 py-3">
                          <select
                            // Value is stored as a number (0-5 or 0-100)
                            value={data.insurerRatings[insurer]?.[cat.key as keyof typeof data.insurerRatings[string]] || 0}
                            // Capture actual numerical value
                            onChange={(e) => handleInsurerRating(insurer, cat.key, parseInt(e.target.value))}
                            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value={0}>-</option>
                            {cat.key === 'proportion'
                              ? [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((percent) => (
                                  <option key={percent} value={percent}>
                                    {percent}%
                                  </option>
                                ))
                              : serviceRatingOptions.map((rating) => (
                                  <option key={rating.value} value={rating.value}>
                                    {rating.label}
                                  </option>
                                ))
                            }
                          </select>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            20. Insurer with the largest portion of business
          </label>
          {highestProportionInsurer ? (
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                Based on your answers in Question 19, the insurer receiving the largest portion of your business is:
              </p>
              <p className="text-lg font-semibold text-blue-900 mt-2">{highestProportionInsurer}</p>
              <p className="text-xs text-gray-600 mt-2">
                This insurer will be used for the Deep Dive Questions below.
              </p>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                Please complete the ratings in Question 19 to determine which insurer receives the largest portion of your business.
              </p>
            </div>
          )}
        </div>

        <div className="bg-blue-50 p-6 rounded-lg space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Deep Dive Questions</h3>

          {highestProportionInsurer ? (
            <>
              <div className="bg-white border border-blue-300 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  These questions focus on your experience with:
                </p>
                <p className="text-lg font-semibold text-blue-900 mt-2">{highestProportionInsurer}</p>
              </div>

              {/* START: Question 21 - Subcomponent Labeling Verified */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  21. Please rate the following areas of this insurer:
                </label>
                <div className="space-y-4">
                  {q21Ratings.map((item, index) => (
                    <div key={item.key} className="bg-white p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {`21${String.fromCharCode(97 + index)}. ${item.label}`}
                      </label>
                      <div className="flex flex-wrap gap-4">
                        {/* Rating options for Q21 (fixed values/labels in the original code) */}
                        {['Very Poor', 'Poor', 'Satisfactory', 'Good', 'Excellent', 'N/A'].map((rating) => (
                          <label key={rating} className="flex items-center">
                            <input
                              type="radio"
                              name={item.key}
                              value={rating}
                              checked={data.detailedRatings[item.key as keyof typeof data.detailedRatings] === rating}
                              onChange={(e) => updateData({
                                detailedRatings: {
                                  ...data.detailedRatings,
                                  [item.key]: e.target.value,
                                },
                              })}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{rating}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* END: Question 21 */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  22a. When considering the overall brand and reputation of this insurer, what specific words or phrases come to mind?
                </label>
                <div className="space-y-3">
                  {[0, 1].map((index) => (
                    <div key={index}>
                      <label className="block text-xs text-gray-600 mb-1">{index + 1})</label>
                      <input
                        type="text"
                        value={data.brandWords[index] || ''}
                        onChange={(e) => {
                          const newWords = [...data.brandWords];
                          newWords[index] = e.target.value;
                          updateData({ brandWords: newWords });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter word or phrase..."
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  22b. Please select the part of this insurer's service proposition you think most needs improvement:
                </label>
                <select
                  value={data.serviceImprovement}
                  onChange={(e) => updateData({ serviceImprovement: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select an area</option>
                  <option value="Access to decision making underwriters">Access to decision making underwriters</option>
                  <option value="Brand reputation">Brand reputation</option>
                  <option value="Claims handling">Claims handling</option>
                  <option value="Helping you win new business">Helping you win new business</option>
                  <option value="Insurer appetite">Insurer appetite</option>
                  <option value="Price competitiveness">Price competitiveness</option>
                  <option value="Regional presence">Regional presence</option>
                  <option value="Responsiveness and timeliness">Responsiveness and timeliness</option>
                  <option value="Technology innovation">Technology innovation</option>
                  <option value="Timeliness of Mid-term amendment">Timeliness of Mid-term amendment</option>
                  <option value="Timeliness of Renewal terms">Timeliness of Renewal terms</option>
                  <option value="Training & Support">Training & Support</option>
                </select>
              </div>
            </>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                Please complete the ratings in Question 19 to enable the Deep Dive Questions.
              </p>
            </div>
          )}
        </div>

        {highestProportionInsurer && (
          <div className="space-y-6 bg-blue-50 p-6 rounded-lg">
            <p className="text-sm text-gray-700 font-medium">Questions 21-24 based on: {highestProportionInsurer}</p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                23. Service - Describe why you gave this rating, how this insurer can improve, and how you would like the service experience to evolve
              </label>
              <textarea
                value={data.serviceDescription}
                onChange={(e) => updateData({ serviceDescription: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your response..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                24. Product: What differentiates this insurer from other insurance providers?
              </label>
              <textarea
                value={data.productDifferentiation}
                onChange={(e) => updateData({ productDifferentiation: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your response..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                25. Relationship Management - Describe your experience and what improvements would better serve your needs
              </label>
              <textarea
                value={data.relationshipExperience}
                onChange={(e) => updateData({ relationshipExperience: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your response..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                26. How would you rate the level of knowledge, education and resources provided by this insurer?
              </label>
              <div className="space-y-2">
                {['Very Poor', 'Poor', 'Satisfactory', 'Good', 'Excellent'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="knowledgeRating"
                      value={option}
                      checked={data.knowledgeRating === option}
                      onChange={(e) => updateData({ knowledgeRating: e.target.value })}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
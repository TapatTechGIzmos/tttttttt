import { SurveyData } from '../types/surveyTypes';

const INSURER_SLOTS = 3;
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzF9QuPkmczwX22VQdS2WETYXo80e1Hk3O7IcbCYC6nJoEd69LwBQTZUx61_TJ_ra2_eQ/exec';

const OPTIONS_Q6_DISTRICTS = [
  'South East District',
  'North East District',
  'Southern District',
  'Kweneng District',
  'Kgatleng Distrct',
  'Central District',
  'Ghanzi District',
  'Kgalagadi District',
  'Ngamiland District',
  'Chobe District'
];

const OPTIONS_Q8_SERVICES = [
  'Long term broker',
  'Short term broker',
  'Medical Aid broker',
  'Other Financial Advisory Services'
];

const OPTIONS_Q9_SEGMENTS = [
  'Mass market',
  'Middle market',
  'Affluent market',
  'We do not offer personal lines'
];

const OPTIONS_Q10_CORP_SIZE = [
  'Micro Enterprise: <10 employees',
  'Small Enterprise: 10 to 49 employees',
  'Medium Enterprise: 50 to 99 employees',
  'Commercial Enterprise: 100 to 299 employees',
  'Large Corporate Enterprise: 300 plus employees'
];

const OPTIONS_Q13_PERSONAL = [
  'Term Life Cover (e.g., Botshelo Term Life Cover, Mothusi Term Shield, Digital Term - DT)',
  'Whole of Life Cover (e.g., Botshelo Whole of Life, Mothusi Lifeline, Poelo Whole of Life)',
  'Funeral Cover (e.g., Boikanyo, Mosako, Kgomotso, Digital Funeral - DF)',
  'Credit Life cover (e.g., Mothusi Home Secure, Poelo Credit Life, Digital Credit Life - DCL)',
  'Living benefits - Critical illness, disability cover'
];

const OPTIONS_Q13_COMMERCIAL = [
  'Group Life Assurance (GLA)',
  'Group Funeral Schemes (GFS)',
  'Group Credit Life (GCL)',
  'Group Critical Illness Cover'
];

const OPTIONS_Q14_LEADS = [
  'Buy hot leads list',
  'Existing client referral',
  'Leverage social media',
  'Cross sell to existing client base',
  'Referral from a professional networks',
  'Direct Outreach - Cold calling and email',
  'Partnerships and Alliances (corporates, affinity groups, government departments, etc)',
  'Other (please specify)'
];


const OPTIONS_Q16_REASONS = [
  'To save time',
  'To improve customer experience',
  'To reduce admin workload',
  'To remain competitive',
  'To lower operational costs',
  'I wouldn\'t use more digital tools'
];

const OPTIONS_Q26_CONCERNS = [
  'Technological Disruption and Adoption',
  'Changing Client Expectations',
  'Cybersecurity Risks',
  'Regulatory and Compliance Pressures',
  'Climate Change and Sustainability',
  'Talent Shortages and Succession Planning',
  'Economic Uncertainty and Market Volatility',
  'Competition from Insurtech and Direct-to-Consumer Models',
  'Data Management and Analytics',
  'Rising Operational Costs'
];

const OPTIONS_Q31_COMM_PREFS = [
  'Business planning session',
  'Strategic planning workshops',
  'Training events',
  'Broker road shows',
  'Regular meetings with broker consultant',
  'Other (please specify)'
];

const OPTIONS_Q32_SUPPORT = [
  'Product training',
  'Enhanced customer service',
  'Faster underwriting',
  'Increased Insurance marketing',
  'Market insights on end-customer segments',
  'Selling skills training',
  'Other (please specify)'
];

const OPTIONS_Q18_INSURERS = [
  'Bryte Risk Services',
  'Botswana Insurance Company',
  'Hollard Insurance Company',
  'Liberty General Botswana',
  'Old Mutual Short-Term Insurance',
  'Phoenix of Botswana Assurance',
  'Sesiro Insurance Company',
  'Sunshine Insurance Company',
  'Western Insurance Botswana'
];

export const getFactorLabelByKey = (key: string): string => {
  const factorList = [
    { key: 'flexibility', label: 'Flexibility Underwriting, Risk Pricing and access to Decision-Makers' },
    { key: 'businessGrowth', label: 'Business Growth Support' },
    { key: 'operationalEfficiency', label: 'Operational Efficiency' },
    { key: 'productQuality', label: 'Product Quality' },
    { key: 'bindersAndIncentives', label: "Binder's Fee and Incentives" },
    { key: 'brandAndMarket', label: 'Brand and Market Presence' }
  ];
  const factor = factorList.find(f => f.key === key);
  return factor ? factor.label : '';
};

export const getQ19Data = (data: SurveyData) => {
  const q19Payload: { [key: string]: string | number } = {};
  const categories = [
    { key: 'underwriting', label: 'Underwriting' },
    { key: 'documentation', label: 'Documentation' },
    { key: 'claims', label: 'Claims' },
    { key: 'postSale', label: 'Post Sale Service' },
    { key: 'relationship', label: 'Relationship' },
    { key: 'proportion', label: 'Proportion %' }
  ];

  const ratedInsurers = Object.keys(data.insurerRatings || {})
    .filter(insurer => Object.keys(data.insurerRatings?.[insurer] || {}).length > 0)
    .slice(0, INSURER_SLOTS);

  for (let i = 0; i < INSURER_SLOTS; i++) {
    const slot = i + 1;
    const insurerName = ratedInsurers[i];

    q19Payload[`Q19 Insurer ${slot} Name`] = insurerName || '';

    const ratings = insurerName ? (data.insurerRatings?.[insurerName] || {}) : {};

    categories.forEach(cat => {
      const value = ratings[cat.key as keyof typeof ratings] || 0;
      q19Payload[`Q19 Insurer ${slot}: ${cat.label}`] = value;
    });
  }
  return q19Payload;
};

export const submitSurvey = async (
  data: SurveyData,
  surveyCountry: string,
  surveySourceType: string
): Promise<void> => {
  const rankedFactors = Object.entries(data.placementFactors || {})
    .filter(([, rank]) => rank > 0)
    .sort(([, rankA], [, rankB]) => (rankA as number) - (rankB as number))
    .map(([key]) => getFactorLabelByKey(key));

  const q19Data = getQ19Data(data);

  const binaryData: { [key: string]: number } = {};

  OPTIONS_Q6_DISTRICTS.forEach(option => {
    binaryData[`Q6: ${option} (Selected)`] = data.districts?.includes(option) ? 1 : 0;
  });

  OPTIONS_Q8_SERVICES.forEach(option => {
    binaryData[`Q8: ${option} (Selected)`] = data.services?.includes(option) ? 1 : 0;
  });

  OPTIONS_Q9_SEGMENTS.forEach(option => {
    binaryData[`Q9: ${option} (Selected)`] = data.personalLinesSegment?.includes(option) ? 1 : 0;
  });

  OPTIONS_Q10_CORP_SIZE.forEach(option => {
    binaryData[`Q10: ${option} (Selected)`] = data.corporateClientSize?.includes(option) ? 1 : 0;
  });

  OPTIONS_Q13_PERSONAL.forEach(option => {
    binaryData[`Q13 Personal: ${option} (Selected)`] = data.topProductsPersonal?.includes(option) ? 1 : 0;
  });

  OPTIONS_Q13_COMMERCIAL.forEach(option => {
    binaryData[`Q13 Commercial: ${option} (Selected)`] = data.topProductsCommercial?.includes(option) ? 1 : 0;
  });

  OPTIONS_Q14_LEADS.forEach(option => {
    binaryData[`Q14: ${option} (Selected)`] = data.leadSources?.includes(option) ? 1 : 0;
  });

  OPTIONS_Q16_REASONS.forEach(option => {
    binaryData[`Q16: ${option} (Selected)`] = (data.digitalToolReasons || []).includes(option) ? 1 : 0;
  });

  OPTIONS_Q18_INSURERS.forEach(insurer => {
    binaryData[`Q18: ${insurer} (Selected)`] = data.primaryInsurers?.includes(insurer) ? 1 : 0;
  });

  OPTIONS_Q26_CONCERNS.forEach(option => {
    binaryData[`Q26: ${option} (Selected)`] = data.biggestConcerns?.includes(option) ? 1 : 0;
  });

  OPTIONS_Q31_COMM_PREFS.forEach(option => {
    binaryData[`Q31: ${option} (Selected)`] = data.communicationPreferences?.includes(option) ? 1 : 0;
  });

  OPTIONS_Q32_SUPPORT.forEach(option => {
    binaryData[`Q32: ${option} (Selected)`] = data.supportNeeds?.includes(option) ? 1 : 0;
  });

  const payload: { [key: string]: any } = {
    'Timestamp': new Date().toISOString(),
    'Survey Country': surveyCountry,
    'Survey Source': surveySourceType,

    'Q1 Name': data.name || '',
    'Q1 Company': data.company || '',
    'Q1 Email': data.email || '',
    'Q1 District (Profile)': data.district || data.District || '',
    'Q2 Years Experience (Broker)': data.yearsOfExperience || '',
    'Q3 Job Function': data.jobFunction || '',
    'Q4 Gender': data.gender || '',
    'Q5 Age Group': data.ageGroup || '',

    'Q7 Brokerage Size': data.brokerageSize || '',
    'Q9 Short-Term Focus': data.shortTermFocus || '',
    'Q12 Commercial Focus %': data.commercialFocus || 0,
    'Q15: Client Acquisition and Relationship Management (Maturity)': data.maturityRatings?.clientAcquisition || 0,
    'Q15: Quotation process (Maturity)': data.maturityRatings?.quotation || 0,
    'Q15: Policy Administration and Management (Maturity)': data.maturityRatings?.policyAdmin || 0,
    'Q15: Claims Management and Support (Maturity)': data.maturityRatings?.claimsManagement || 0,
    'Q15: Financial Management (Maturity)': data.maturityRatings?.financialManagement || 0,
    'Q15: All Other Processes (Maturity)': data.maturityRatings?.otherProcesses || 0,

    ...binaryData,

    'Q17 Rank 1 Factor': rankedFactors[0] || '',
    'Q17 Rank 2 Factor': rankedFactors[1] || '',
    'Q17 Rank 3 Factor': rankedFactors[2] || '',
    'Q17 Rank 4 Factor': rankedFactors[3] || '',
    'Q17 Rank 5 Factor': rankedFactors[4] || '',
    'Q17 Rank 6 Factor': rankedFactors[5] || '',

    ...q19Data,

    'Q20 Largest Insurer': data.selectedInsurer || '',
    'Q20a Service Influence': data.serviceInfluence || '',
    'Q20b Product Classes': data.productClasses || '',
    'Q20c Value Beyond Price': data.valueBeyondPrice || '',
    'Q20d Claims Experience': data.claimsExperience || '',
    'Q25 Knowledge Rating (Deep Dive)': data.knowledgeRating || '',

    'Q27 Barriers to Business': data.barriersToBusiness || '',
    'Q28 Succession Plan': data.successionPlan || '',
    'Q29 Growth Products': data.growthProducts || '',
    'Q30 AI Usage': data.aiUsage || 0,

    'DDR: Access Decision Makers': data.detailedRatings?.decisionMakers || '',
    'DDR: Brand Reputation': data.detailedRatings?.brandReputation || '',
    'DDR: Claims Handling': data.detailedRatings?.claimsHandling || '',
    'DDR: Winning Business': data.detailedRatings?.winningBusiness || '',
    'DDR: Insurer Appetite': data.detailedRatings?.insurerAppetite || '',
    'DDR: Price Competitiveness': data.detailedRatings?.priceCompetitiveness || '',
    'DDR: Regional Presence': data.detailedRatings?.regionalPresence || '',
    'DDR: Responsiveness': data.detailedRatings?.responsiveness || '',
    'DDR: Tech Innovation': data.detailedRatings?.techInnovation || '',
    'DDR: Mid Term Timeliness': data.detailedRatings?.midTermAlterations || '',
    'DDR: Renewal Timeliness': data.detailedRatings?.renewalTerms || '',
    'DDR: Training & Support': data.detailedRatings?.trainingSupport || '',
    'DDR: Brand Word 1': data.brandWords?.[0] || '',
    'DDR: Brand Word 2': data.brandWords?.[1] || '',
    'DDR: Brand Word 3': data.brandWords?.[2] || '',
    'DDR: Service Improvement Select': data.serviceImprovement || '',

    'Q33 Opt Out': data.optOut || false,
    'Q34 Communication Other': data.communicationOther || '',
    'Q34 Support Needs Other': data.supportNeedsOther || ''
  };

  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(payload).toString()
    });

    alert(`Survey results submitted successfully for ${surveyCountry} - ${surveySourceType}!`);
  } catch (error) {
    console.error('Submission failed:', error);
    alert('Submission failed. Please check the console for network errors.');
    throw error;
  }
};

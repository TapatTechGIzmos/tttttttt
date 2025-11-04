import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import WelcomePage from '../components/survey/WelcomePage';
import ProfilePage from '../components/survey/ProfilePage';
import BrokerageOverviewPage from '../components/survey/BrokerageOverviewPage';
import BusinessOperationsPage from '../components/survey/BusinessOperationsPage';
import InsurerEvaluationPage from '../components/survey/InsurerEvaluationPage';
import MarketOutlookPage from '../components/survey/MarketOutlookPage';
import { getFactorLabelByKey, getQ19Data } from '../utils/surveyHelpers';

// === SURVEY DATA INTERFACE ===
export interface SurveyData {
  name: string;
  company: string;
  email: string;
  province: string;
  yearsOfExperience: string;
  jobFunction: string;
  gender: string;
  ageGroup: string;
  districts: string[];
  brokerageSize: string;
  services: string[];
  shortTermFocus: string;
  personalLinesSegment: string[];
  corporateClientSize: string[];
  commercialPercentage: number;
  topProducts: string[];
  topProductsPersonal: string[];
  topProductsCommercial: string[];
  leadSources: string[];
  leadSourcesOther: string;
  digitalComfort: string;
  digitalTasks: string[];
  digitalToolReasons: string[];
  gwpBracket: string;
  maturityRatings: {
    clientAcquisition: number;
    quotation: number;
    policyAdmin: number;
    claimsManagement: number;
    financialManagement: number;
    otherProcesses: number;
  };
  placementFactors: {
    flexibility: number;
    businessGrowth: number;
    operationalEfficiency: number;
    productQuality: number;
    bindersAndIncentives: number;
    brandAndMarket: number;
  };
  primaryInsurers: string[];
  insurerRatings: {
    [key: string]: {
      underwriting: number;
      documentation: number;
      claims: number;
      postSale: number;
      relationship: number;
      proportion: number;
    };
  };
  selectedInsurer: string;
  selectedInsurerOther: string;
  deepDiveInsurer: string;
  serviceInfluence: string;
  productClasses: string;
  valueBeyondPrice: string;
  claimsExperience: string;
  detailedRatings: {
    decisionMakers: string;
    brandReputation: string;
    claimsHandling: string;
    winningBusiness: string;
    insurerAppetite: string;
    priceCompetitiveness: string;
    regionalPresence: string;
    responsiveness: string;
    techInnovation: string;
    midTermAlterations: string;
    renewalTerms: string;
    trainingSupport: string;
  };
  brandWords: string[];
  serviceImprovement: string;
  serviceDescription: string;
  productDifferentiation: string;
  relationshipExperience: string;
  knowledgeRating: string;
  biggestConcerns: string[];
  barriersToBusiness: string;
  successionPlan: string;
  growthProducts: string;
  aiUsage: number;
  communicationPreferences: string[];
  communicationOther: string;
  supportNeeds: string[];
  supportNeedsOther: string;
  optOut: boolean;
}

// === INITIAL STATE ===
const initialSurveyData: SurveyData = {
  name: '',
  company: '',
  email: '',
  province: '',
  yearsOfExperience: '',
  jobFunction: '',
  gender: '',
  ageGroup: '',
  districts: [],
  brokerageSize: '',
  services: [],
  shortTermFocus: '',
  personalLinesSegment: [],
  corporateClientSize: [],
  commercialPercentage: 50,
  topProducts: [],
  topProductsPersonal: [],
  topProductsCommercial: [],
  leadSources: [],
  leadSourcesOther: '',
  digitalComfort: '',
  digitalTasks: [],
  digitalToolReasons: [],
  gwpBracket: '',
  maturityRatings: {
    clientAcquisition: 0,
    quotation: 0,
    policyAdmin: 0,
    claimsManagement: 0,
    financialManagement: 0,
    otherProcesses: 0,
  },
  placementFactors: {
    flexibility: 0,
    businessGrowth: 0,
    operationalEfficiency: 0,
    productQuality: 0,
    bindersAndIncentives: 0,
    brandAndMarket: 0,
  },
  primaryInsurers: [],
  insurerRatings: {},
  selectedInsurer: '',
  selectedInsurerOther: '',
  deepDiveInsurer: '',
  serviceInfluence: '',
  productClasses: '',
  valueBeyondPrice: '',
  claimsExperience: '',
  detailedRatings: {
    decisionMakers: '',
    brandReputation: '',
    claimsHandling: '',
    winningBusiness: '',
    insurerAppetite: '',
    priceCompetitiveness: '',
    regionalPresence: '',
    responsiveness: '',
    techInnovation: '',
    midTermAlterations: '',
    renewalTerms: '',
    trainingSupport: '',
  },
  brandWords: ['', '', ''],
  serviceImprovement: '',
  serviceDescription: '',
  productDifferentiation: '',
  relationshipExperience: '',
  knowledgeRating: '',
  biggestConcerns: [],
  barriersToBusiness: '',
  successionPlan: '',
  growthProducts: '',
  aiUsage: 0,
  communicationPreferences: [],
  communicationOther: '',
  supportNeeds: [],
  supportNeedsOther: '',
  optOut: false,
};

const lifeInsurers = [
  'Absa Life Botswana',
  'Afritec Life Insurance',
  'Bona Life Insurance',
  'Botswana Life Insurance Limited',
  'Exclusive Life Insurance',
  'Hollard Life Assurance Company of Botswana',
  'Liberty Life Botswana',
  'Metropolitan Life of Botswana Limited',
  'Old Mutual Life Insurance Company (Botswana)',
  'Westlife Insurance Botswana',
];

const pages = [
  { component: WelcomePage, title: 'Welcome' },
  { component: ProfilePage, title: 'Profile and Demographic Information' },
  { component: BrokerageOverviewPage, title: 'Brokerage Overview' },
  { component: BusinessOperationsPage, title: 'Business Operations and Performance' },
  { component: InsurerEvaluationPage, title: 'Insurer Evaluation' },
  { component: MarketOutlookPage, title: 'Market Outlook and Support Needs' },
];

// === MAIN COMPONENT ===
export default function BotswanaLifeSurvey() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [surveyData, setSurveyData] = useState<SurveyData>(initialSurveyData);

  const CurrentPageComponent = pages[currentPage].component;
  const progress = Math.round(((currentPage + 1) / pages.length) * 100);
  const isLastPage = currentPage === pages.length - 1;

  // === SAFE UPDATE FUNCTION (FIXED!) ===
  const updateSurveyData = (data: Partial<SurveyData>) => {
    setSurveyData(prev => {
      // Handle nested maturityRatings safely
      if (data.maturityRatings) {
        return {
          ...prev,
          maturityRatings: {
            ...(prev.maturityRatings ?? {}),
            ...data.maturityRatings,
          },
        };
      }

      // Handle other nested objects if needed in the future
      if (data.placementFactors) {
        return {
          ...prev,
          placementFactors: {
            ...(prev.placementFactors ?? {}),
            ...data.placementFactors,
          },
        };
      }

      if (data.insurerRatings) {
        return {
          ...prev,
          insurerRatings: {
            ...(prev.insurerRatings ?? {}),
            ...data.insurerRatings,
          },
        };
      }

      if (data.detailedRatings) {
        return {
          ...prev,
          detailedRatings: {
            ...(prev.detailedRatings ?? {}),
            ...data.detailedRatings,
          },
        };
      }

      // Default: shallow merge
      return { ...prev, ...data };
    });
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    navigate('/broker-survey');
  };


  const handleSubmit = async () => {
    try {
      const INSURER_SLOTS = 3;
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzF9QuPkmczwX22VQdS2WETYXo80e1Hk3O7IcbCYC6nJoEd69LwBQTZUx61_TJ_ra2_eQ/exec';
      const SURVEY_COUNTRY = "Botswana";
      const SURVEY_SOURCE_TYPE = "Life Business Line";

      const OPTIONS_Q6_DISTRICTS = ['South East District', 'North East District', 'Southern District', 'Kweneng District', 'Kgatleng Distrct', 'Central District', 'Ghanzi District', 'Kgalagadi District', 'Ngamiland District', 'Chobe District'];
      const OPTIONS_Q8_SERVICES = ['Long term broker', 'Short term broker', 'Medical Aid broker', 'Other Financial Advisory Services'];
      const OPTIONS_Q9_SEGMENTS = ['Mass market', 'Middle market', 'Affluent market', 'We do not offer personal lines'];
      const OPTIONS_Q10_CORP_SIZE = ['Micro Enterprise: <10 employees', 'Small Enterprise: 10 to 49 employees', 'Medium Enterprise: 50 to 99 employees', 'Commercial Enterprise: 100 to 299 employees', 'Large Corporate Enterprise: 300 plus employees'];

      const OPTIONS_Q12_PRODUCTS_PERSONAL = [
        'Term Life Cover (e.g., Botshelo Term Life Cover, Mothusi Term Shield, Digital Term - DT)',
        'Whole of Life Cover (e.g., Botshelo Whole of Life, Mothusi Lifeline, Poelo Whole of Life)',
        'Funeral Cover (e.g., Boikanyo, Mosako, Kgomotso, Digital Funeral - DF)',
        'Credit Life cover (e.g., Mothusi Home Secure, Poelo Credit Life, Digital Credit Life - DCL)',
        'Living benefits - Critical illness, disability cover',
        'Retirement/Investment products'
      ];

      const OPTIONS_Q12_PRODUCTS_COMMERCIAL = [
        'Group Life Assurance (GLA)',
        'Group Funeral Schemes (GFS)',
        'Group Credit Life (GCL)',
        'Group Critical Illness Cover'
      ];

      const OPTIONS_Q13_LEADS = ['Buy hot leads list', 'Existing client referral', 'Leverage social media', 'Cross sell to existing client base', 'Referral from a professional networks', 'Direct Outreach - Cold calling and email', 'Partnerships and Alliances (corporates, affinity groups, government departments, etc)', 'Other (please specify)'];
      const OPTIONS_Q14_DIGITAL_TASKS = ['Quoting and comparing products', 'Submitting applications', 'Managing renewals', 'Processing MTAs', 'Communicating with clients', 'Claims handling', 'None of the above'];
      const OPTIONS_Q16_DIGITAL_REASONS = ['To save time', 'To improve customer experience', 'To reduce admin workload', 'To remain competitive', 'To lower operational costs', 'I wouldn\'t use more digital tools'];
      const OPTIONS_Q26_CONCERNS = ['Technological Disruption and Adoption', 'Changing Client Expectations', 'Cybersecurity Risks', 'Regulatory and Compliance Pressures', 'Climate Change and Sustainability', 'Talent Shortages and Succession Planning', 'Economic Uncertainty and Market Volatility', 'Competition from Insurtech and Direct-to-Consumer Models', 'Data Management and Analytics', 'Rising Operational Costs'];
      const OPTIONS_Q31_COMM_PREFS = ['Business planning session', 'Strategic planning workshops', 'Training events', 'Broker road shows', 'Regular meetings with broker consultant', 'Other (please specify)'];
      const OPTIONS_Q32_SUPPORT = ['Product training', 'Enhanced customer service', 'Faster underwriting', 'Increased Insurance marketing', 'Market insights on end-customer segments', 'Selling skills training', 'Other (please specify)'];

      const rankedFactors = Object.entries(surveyData.placementFactors)
        .filter(([, rank]) => rank > 0)
        .sort(([, rankA], [, rankB]) => (rankA as number) - (rankB as number))
        .map(([key]) => getFactorLabelByKey(key));

      const q19Data = getQ19Data(surveyData);

      const binaryData: { [key: string]: number } = {};

      OPTIONS_Q6_DISTRICTS.forEach(option => {
        binaryData[`Q6: ${option} (Selected)`] = surveyData.districts?.includes(option) ? 1 : 0;
      });

      OPTIONS_Q8_SERVICES.forEach(option => {
        binaryData[`Q8: ${option} (Selected)`] = surveyData.services?.includes(option) ? 1 : 0;
      });

      OPTIONS_Q9_SEGMENTS.forEach(option => {
        binaryData[`Q9: ${option} (Selected)`] = surveyData.personalLinesSegment?.includes(option) ? 1 : 0;
      });

      OPTIONS_Q10_CORP_SIZE.forEach(option => {
        binaryData[`Q10: ${option} (Selected)`] = surveyData.corporateClientSize?.includes(option) ? 1 : 0;
      });

      OPTIONS_Q12_PRODUCTS_PERSONAL.forEach(option => {
        binaryData[`Q12 Personal: ${option} (Selected)`] = surveyData.topProductsPersonal?.includes(option) ? 1 : 0;
      });

      OPTIONS_Q12_PRODUCTS_COMMERCIAL.forEach(option => {
        binaryData[`Q12 Commercial: ${option} (Selected)`] = surveyData.topProductsCommercial?.includes(option) ? 1 : 0;
      });

      OPTIONS_Q13_LEADS.forEach(option => {
        binaryData[`Q13: ${option} (Selected)`] = surveyData.leadSources?.includes(option) ? 1 : 0;
      });

      OPTIONS_Q14_DIGITAL_TASKS.forEach(option => {
        binaryData[`Q14: ${option} (Selected)`] = surveyData.digitalTasks?.includes(option) ? 1 : 0;
      });

      OPTIONS_Q16_DIGITAL_REASONS.forEach(option => {
        binaryData[`Q16: ${option} (Selected)`] = surveyData.digitalToolReasons?.includes(option) ? 1 : 0;
      });

      lifeInsurers.forEach(insurer => {
        binaryData[`Q18: ${insurer} (Selected)`] = surveyData.primaryInsurers?.includes(insurer) ? 1 : 0;
      });

      OPTIONS_Q26_CONCERNS.forEach(option => {
        binaryData[`Q26: ${option} (Selected)`] = surveyData.biggestConcerns?.includes(option) ? 1 : 0;
      });

      OPTIONS_Q31_COMM_PREFS.forEach(option => {
        binaryData[`Q31: ${option} (Selected)`] = surveyData.communicationPreferences?.includes(option) ? 1 : 0;
      });

      OPTIONS_Q32_SUPPORT.forEach(option => {
        binaryData[`Q32: ${option} (Selected)`] = surveyData.supportNeeds?.includes(option) ? 1 : 0;
      });

      const payload: { [key: string]: any } = {
        'Timestamp': new Date().toISOString(),
        'Survey Country': SURVEY_COUNTRY,
        'Survey Source': SURVEY_SOURCE_TYPE,
        'Q1 Name': surveyData.name || '',
        'Q1 Company': surveyData.company || '',
        'Q1 Email': surveyData.email || '',
        'Q1 District (Profile)': surveyData.province || '',
        'Q2 Years Experience (Broker)': surveyData.yearsOfExperience || '',
        'Q3 Job Function': surveyData.jobFunction || '',
        'Q4 Gender': surveyData.gender || '',
        'Q5 Age Group': surveyData.ageGroup || '',
        ...binaryData,
        'Q7 Brokerage Size': surveyData.brokerageSize || '',
        'Q11 Commercial Focus %': surveyData.commercialPercentage || 0,
        'Q15a Maturity: Client Acquisition': surveyData.maturityRatings?.clientAcquisition || 0,
        'Q15b Maturity: Quotation Process': surveyData.maturityRatings?.quotation || 0,
        'Q15c Maturity: Policy Admin': surveyData.maturityRatings?.policyAdmin || 0,
        'Q15d Maturity: Claims Management': surveyData.maturityRatings?.claimsManagement || 0,
        'Q15e Maturity: Financial Management': surveyData.maturityRatings?.financialManagement || 0,
        'Q15f Maturity: Other Processes': surveyData.maturityRatings?.otherProcesses || 0,
        'Q17 Rank 1 Factor': rankedFactors[0] || '',
        'Q17 Rank 2 Factor': rankedFactors[1] || '',
        'Q17 Rank 3 Factor': rankedFactors[2] || '',
        'Q17 Rank 4 Factor': rankedFactors[3] || '',
        'Q17 Rank 5 Factor': rankedFactors[4] || '',
        'Q17 Rank 6 Factor': rankedFactors[5] || '',
        ...q19Data,
        'Q20 Largest Insurer': surveyData.selectedInsurer || '',
        'Q20 Largest Insurer Other': surveyData.selectedInsurerOther || '',
        'Q21 Service Description': surveyData.serviceDescription || '',
        'Q22 Product Differentiation': surveyData.productDifferentiation || '',
        'Q23 Relationship Experience': surveyData.relationshipExperience || '',
        'Q25 Knowledge Rating': surveyData.knowledgeRating || '',
        'Q27 Barriers to Business': surveyData.barriersToBusiness || '',
        'Q28 Succession Plan': surveyData.successionPlan || '',
        'Q29 Growth Products': surveyData.growthProducts || '',
        'Q30 AI Usage': surveyData.aiUsage || 0,
        'Q31 Communication Other': surveyData.communicationOther || '',
        'Q32 Support Needs Other': surveyData.supportNeedsOther || '',
        'Q33 Opt Out': surveyData.optOut || false,
      };

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(),
      });

      console.log('Survey submitted:', payload);
      alert(`Survey results submitted for ${SURVEY_COUNTRY} - ${SURVEY_SOURCE_TYPE}!`);
      navigate('/broker-survey');
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Submission failed. Please check the console for network errors.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Survey Selection
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h1 className="text-2xl font-bold text-white mb-2">
              Insurance Intelligence.Africa | 2025/6 Botswana Life Insurance Broker Survey
            </h1>
            <div className="flex items-center justify-between text-white">
              <span className="text-sm font-medium">{pages[currentPage].title}</span>
              <span className="text-sm font-semibold">{progress}%</span>
            </div>
            <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Page Content */}
          <div className="px-8 py-8">
            <CurrentPageComponent
              data={surveyData}
              updateData={updateSurveyData}
              surveyType="life"
              {...(currentPage === 4 ? { insurers: lifeInsurers } : {})}
            />
          </div>

          {/* Navigation Footer */}
          <div className="bg-gray-50 px-8 py-6 flex justify-between items-center border-t">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                currentPage === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            {isLastPage ? (
              <button
                onClick={handleSubmit}
                className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
              >
                Submit Survey
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
              >
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Powered by Insurance Intelligence.Africa</p>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useCallback, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import WelcomePage from '../components/survey/WelcomePage';
import ProfilePage from '../components/survey/ProfilePage';
import BrokerageOverviewPage from '../components/survey/BrokerageOverviewPage';
import BusinessOperationsPage from '../components/survey/BusinessOperationsPage';
import InsurerEvaluationPage from '../components/survey/InsurerEvaluationPage';
import MarketOutlookPage from '../components/survey/MarketOutlookPage';
import { submitSurvey } from '../utils/surveySubmission';
import { SurveyData } from '../types/surveyTypes';

// === RE-EXPORT TYPE FOR COMPATIBILITY ===
export type { SurveyData };

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
  newLifeInsurers: [],
  newEntrantCriteria: [],
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
  const [surveyData, setSurveyData] = useState<SurveyData>(() => {
    const savedData = localStorage.getItem('botswanaLifeSurveyDraft');
    return savedData ? JSON.parse(savedData) : initialSurveyData;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const CurrentPageComponent = pages[currentPage].component;
  const progress = Math.round(((currentPage + 1) / pages.length) * 100);
  const isLastPage = currentPage === pages.length - 1;

  // === SAFE UPDATE FUNCTION WITH AUTO-SAVE ===
  const updateSurveyData = useCallback((data: Partial<SurveyData>) => {
    setSurveyData(prev => {
      let updatedData: SurveyData;

      if (data.maturityRatings) {
        updatedData = {
          ...prev,
          maturityRatings: {
            ...(prev.maturityRatings ?? {}),
            ...data.maturityRatings,
          },
        };
      } else if (data.placementFactors) {
        updatedData = {
          ...prev,
          placementFactors: {
            ...(prev.placementFactors ?? {}),
            ...data.placementFactors,
          },
        };
      } else if (data.insurerRatings) {
        updatedData = {
          ...prev,
          insurerRatings: {
            ...(prev.insurerRatings ?? {}),
            ...data.insurerRatings,
          },
        };
      } else if (data.detailedRatings) {
        updatedData = {
          ...prev,
          detailedRatings: {
            ...(prev.detailedRatings ?? {}),
            ...data.detailedRatings,
          },
        };
      } else {
        updatedData = { ...prev, ...data };
      }

      localStorage.setItem('botswanaLifeSurveyDraft', JSON.stringify(updatedData));
      return updatedData;
    });
  }, []);

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
    const surveyDataWithCountry = { ...surveyData, country: 'Botswana' };
    const result = await submitSurvey(surveyDataWithCountry, setIsSubmitting, true);

    if (result.success) {
      localStorage.removeItem('botswanaLifeSurveyDraft');
      alert(result.message);
      navigate('/broker-survey');
    } else {
      alert(result.message);
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
                disabled={isSubmitting}
                className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Survey'}
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
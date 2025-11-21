const GOOGLE_APPS_SCRIPT_URL_ZAMBIA = "https://script.google.com/macros/s/AKfycbx7tEBDKM-D3LAZ6IGn1iQp0bURsrI-BO-OB7VQJAAZz1EAJ2Yfa7dcFI5bTEeJ_pl3Eg/exec";

const unstackMaturity = (ratings) => {
  if (!ratings) return {};

  return {
    'Q15a_Maturity_Client_Acquisition': ratings.clientAcquisition || 0,
    'Q15b_Maturity_Quotation': ratings.quotation || 0,
    'Q15c_Maturity_Policy_Admin': ratings.policyAdmin || 0,
    'Q15d_Maturity_Claims': ratings.claimsManagement || 0,
    'Q15e_Maturity_Financial': ratings.financialManagement || 0,
    'Q15f_Maturity_Other': ratings.otherProcesses || 0,
  };
};

const unstackPlacement = (factors) => {
  if (!factors) return {};

  const result = {
    'Q17_RANK_1_MOST_IMPORTANT': '',
    'Q17_RANK_2': '',
    'Q17_RANK_3': '',
    'Q17_RANK_4': '',
    'Q17_RANK_5': '',
    'Q17_RANK_6_LEAST_IMPORTANT': '',
  };

  const factorMapping = {
    'flexibility': 'Flexibility in underwriting and claims handling',
    'businessGrowth': 'Support for business growth',
    'operationalEfficiency': 'Operational efficiency and digital tools',
    'productQuality': 'Quality of products and coverage',
    'bindersAndIncentives': 'Binder terms and commission incentives',
    'brandAndMarket': 'Brand strength and market reputation',
  };

  Object.entries(factors).forEach(([key, rank]) => {
    const rankKey = `Q17_RANK_${rank}${rank === 1 ? '_MOST_IMPORTANT' : rank === 6 ? '_LEAST_IMPORTANT' : ''}`;
    result[rankKey] = factorMapping[key] || key;
  });

  return result;
};

const unstackDetailedRatings = (ratings) => {
  if (!ratings) return {};

  return {
    'Q20a_Rating_Decision_Makers': ratings.decisionMakers || '',
    'Q20b_Rating_Brand_Reputation': ratings.brandReputation || '',
    'Q20c_Rating_Claims_Handling': ratings.claimsHandling || '',
    'Q20d_Rating_Winning_Business': ratings.winningBusiness || '',
    'Q20e_Rating_Insurer_Appetite': ratings.insurerAppetite || '',
    'Q20f_Rating_Price_Competitiveness': ratings.priceCompetitiveness || '',
    'Q20g_Rating_Regional_Presence': ratings.regionalPresence || '',
    'Q20h_Rating_Responsiveness': ratings.responsiveness || '',
    'Q20i_Rating_Tech_Innovation': ratings.techInnovation || '',
    'Q20j_Rating_Mid_Term_Alterations': ratings.midTermAlterations || '',
    'Q20k_Rating_Renewal_Terms': ratings.renewalTerms || '',
    'Q20l_Rating_Training_Support': ratings.trainingSupport || '',
  };
};

const unstackMultiSelect = (clientArray, allKeys, prefix) => {
  if (!Array.isArray(clientArray) || !Array.isArray(allKeys)) return {};

  const selectedSet = new Set(clientArray);
  const result = {};

  allKeys.forEach((key) => {
    const columnName = `${prefix}_${key.replace(/\s+/g, '_').replace(/[^\w]/g, '')}`;
    result[columnName] = selectedSet.has(key) ? '1' : '0';
  });

  return result;
};

const generateSubmissionObject = (data, surveyType = 'Zambia Short-Term') => {
  const submissionObject = {};

  submissionObject['TIMESTAMP'] = new Date().toISOString();
  submissionObject['Survey_Country'] = 'Zambia';
  submissionObject['Survey_Source'] = surveyType;

  submissionObject['Q1_Name'] = data.name || '';
  submissionObject['Q1_Company'] = data.company || '';
  submissionObject['Q1_Email'] = data.email || '';
  submissionObject['Q1_District'] = data.district || '';

  submissionObject['Q2_Years_Of_Experience'] = data.yearsOfExperience || '';

  submissionObject['Q3_Job_Function_Client_Broker'] = data.jobFunction === 'Client Facing / Broker' ? '1' : '0';
  submissionObject['Q3_Job_Function_Sales_Manager'] = data.jobFunction === 'Sales manager / Team Leader' ? '1' : '0';
  submissionObject['Q3_Job_Function_Senior_Management'] = data.jobFunction === 'Senior Management' ? '1' : '0';

  submissionObject['Q4_Gender_Male'] = data.gender === 'Male' ? '1' : '0';
  submissionObject['Q4_Gender_Female'] = data.gender === 'Female' ? '1' : '0';

  submissionObject['Q5_Age_Group_20_to_30'] = data.ageGroup === '20 to 30 years' ? '1' : '0';
  submissionObject['Q5_Age_Group_31_to_40'] = data.ageGroup === '31 to 40 years' ? '1' : '0';
  submissionObject['Q5_Age_Group_41_to_50'] = data.ageGroup === '41 to 50 years' ? '1' : '0';
  submissionObject['Q5_Age_Group_51_to_60'] = data.ageGroup === '51 to 60 years' ? '1' : '0';
  submissionObject['Q5_Age_Group_60_plus'] = data.ageGroup === '60+ years' ? '1' : '0';

  const Q6_PROVINCES = ['Central', 'Copperbelt', 'Eastern', 'Luapula', 'Lusaka', 'Muchinga', 'Northern', 'North_Western', 'Southern', 'Western'];
  const districtsMultiSelect = unstackMultiSelect(data.districts || [], Q6_PROVINCES.map(p => p.replace('_', ' ')), 'Q6_Province');
  Object.assign(submissionObject, districtsMultiSelect);

  submissionObject['Q7_Size_Solo_Broker'] = data.brokerageSize === 'Solo Broker' ? '1' : '0';
  submissionObject['Q7_Size_2_to_5_people'] = data.brokerageSize === '2 to 5 people' ? '1' : '0';
  submissionObject['Q7_Size_6_to_20_people'] = data.brokerageSize === '6 to 20 people' ? '1' : '0';
  submissionObject['Q7_Size_21_to_30_people'] = data.brokerageSize === '21 to 30 people' ? '1' : '0';
  submissionObject['Q7_Size_31_to_50_people'] = data.brokerageSize === '31 to 50 people' ? '1' : '0';
  submissionObject['Q7_Size_50_plus_people'] = data.brokerageSize === '50 plus people' ? '1' : '0';

  const Q8_SERVICES = ['Long term broker', 'Short term broker', 'Medical Aid broker', 'Other Financial Advisory Services'];
  const servicesKeys = ['Long_Term_Broker', 'Short_Term_Broker', 'Medical_Aid_Broker', 'Other_Financial'];
  const servicesMultiSelect = unstackMultiSelect(data.services || [], Q8_SERVICES, 'Q8_Service');
  Object.assign(submissionObject, servicesMultiSelect);

  const Q9_PL_SEGMENTS = ['Mass market', 'Middle market', 'Affluent market', 'We do not offer personal lines'];
  const plKeys = ['Mass_Market', 'Middle_Market', 'Affluent_Market', 'No_Personal_Lines'];
  const plMultiSelect = unstackMultiSelect(data.personalLinesSegment || [], Q9_PL_SEGMENTS, 'Q9_PL');
  Object.assign(submissionObject, plMultiSelect);

  const Q10_CORP_SIZES = [
    'Micro Enterprise: <10 employees',
    'Small Enterprise: 10 to 49 employees',
    'Medium Enterprise: 50 to 99 employees',
    'Commercial Enterprise: 100 to 299 employees',
    'Large Corporate Enterprise: 300 plus employees'
  ];
  const corpKeys = ['Micro_Enterprise', 'Small_Enterprise', 'Medium_Enterprise', 'Commercial_Enterprise', 'Large_Corporate'];
  const corpMultiSelect = unstackMultiSelect(data.corporateClientSize || [], Q10_CORP_SIZES, 'Q10_Corp');
  Object.assign(submissionObject, corpMultiSelect);

  submissionObject['Q11_Commercial_Focus_Percent'] = data.commercialFocus || 0;

  const Q12_PERSONAL_PRODUCTS = [
    'Motor Insurance (Vehicle Insurance)',
    'House Owners / Buildings Insurance',
    'House Holders / Contents Insurance',
    'Personal All Risk (for portable valuables)',
    'Personal Accident Insurance',
    'Personal Liability Insurance'
  ];
  const personalKeys = ['Motor', 'House_Owners', 'House_Holders', 'Personal_All_Risk', 'Personal_Accident', 'Personal_Liability'];
  const personalMultiSelect = unstackMultiSelect(data.topProductsPersonal || [], Q12_PERSONAL_PRODUCTS, 'Q12_P_Product');
  Object.assign(submissionObject, personalMultiSelect);

  const Q12_COMMERCIAL_PRODUCTS = [
    'Commercial Property/Fire & Allied Perils',
    'Motor Fleet Insurance',
    'Business All Risks',
    'Business Interruption Insurance',
    "Engineering Insurance (including Contractor's All Risk - CAR)",
    'Marine Insurance',
    'Public Liability Insurance',
    'Professional Indemnity (PI) Insurance',
    'Fidelity Guarantee/Bankers Blanket Bonds',
    'Agriculture Insurance'
  ];
  const commercialKeys = ['Commercial_Property', 'Motor_Fleet', 'Business_All_Risks', 'Business_Interruption', 'Engineering', 'Marine', 'Public_Liability', 'Professional_Indemnity', 'Fidelity_Guarantee', 'Agriculture'];
  const commercialMultiSelect = unstackMultiSelect(data.topProductsCommercial || [], Q12_COMMERCIAL_PRODUCTS, 'Q12_C_Product');
  Object.assign(submissionObject, commercialMultiSelect);

  const Q13_LEAD_SOURCES = [
    'Buy hot leads list',
    'Existing client referral',
    'Leverage social media',
    'Cross sell to existing client base',
    'Referral from a professional networks',
    'Direct Outreach - Cold calling and email',
    'Partnerships and Alliances (corporates, affinity groups, government departments, etc)',
    'Other (please specify)'
  ];
  const leadSourceKeys = ['Buy_Hot_Leads', 'Existing_Referral', 'Social_Media', 'Cross_Sell', 'Professional_Referral', 'Direct_Outreach', 'Partnerships', 'Other'];
  const leadSourceMultiSelect = unstackMultiSelect(data.leadSources || [], Q13_LEAD_SOURCES, 'Q13_Source');
  Object.assign(submissionObject, leadSourceMultiSelect);

  const Q14_DIGITAL_TOOLS = [
    'Quoting and comparing products',
    'Submitting applications',
    'Managing renewals',
    'Processing MTAs',
    'Communicating with clients',
    'Claims handling',
    'None of the above'
  ];
  const digitalKeys = ['Quoting', 'Applications', 'Renewals', 'MTAs', 'Comms', 'Claims', 'None'];
  const digitalMultiSelect = unstackMultiSelect(data.digitalTasks || [], Q14_DIGITAL_TOOLS, 'Q14_Digital_Tools');
  Object.assign(submissionObject, digitalMultiSelect);

  Object.assign(submissionObject, unstackMaturity(data.maturityRatings));

  const Q16_REASONS = [
    'To save time',
    'To improve customer experience',
    'To reduce admin workload',
    'To remain competitive',
    'To lower operational costs',
    "I wouldn't use more digital tools"
  ];
  const reasonKeys = ['Save_Time', 'Improve_Customer_Exp', 'Reduce_Admin', 'Remain_Competitive', 'Lower_Costs', 'Wouldnt_Use'];
  const reasonMultiSelect = unstackMultiSelect(data.digitalToolReasons || [], Q16_REASONS, 'Q16_Reason');
  Object.assign(submissionObject, reasonMultiSelect);

  Object.assign(submissionObject, unstackPlacement(data.placementFactors));

  const primaryInsurers = data.primaryInsurers || [];
  for (let i = 1; i <= 3; i++) {
    const insurer = primaryInsurers[i - 1] || '';
    const ratings = data.insurerRatings?.[insurer] || {};

    submissionObject[`Q19_INSURER_${i}_NAME`] = insurer;
    submissionObject[`Q19_INSURER_${i}_Underwriting`] = ratings.underwriting || 0;
    submissionObject[`Q19_INSURER_${i}_Documentation`] = ratings.documentation || 0;
    submissionObject[`Q19_INSURER_${i}_Claims`] = ratings.claims || 0;
    submissionObject[`Q19_INSURER_${i}_Post_Sale`] = ratings.postSale || 0;
    submissionObject[`Q19_INSURER_${i}_Relationship`] = ratings.relationship || 0;
    submissionObject[`Q19_INSURER_${i}_Proportion_Pct`] = ratings.proportion || 0;
  }

  submissionObject['Deep_Dive_Insurer_Name'] = data.deepDiveInsurer || '';

  Object.assign(submissionObject, unstackDetailedRatings(data.detailedRatings));

  submissionObject['Q20m_Low_Rating_Comment'] = data.q21FollowUp || '';

  submissionObject['Q21a_Brand_Word_1'] = (data.brandWords && data.brandWords[0]) || '';
  submissionObject['Q21a_Brand_Word_2'] = (data.brandWords && data.brandWords[1]) || '';
  submissionObject['Q21b_Service_Improvement_Needed'] = data.serviceImprovement || '';

  const Q22_CONCERNS = [
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
  const concernKeys = ['Tech_Disruption', 'Client_Exp', 'Cybersecurity', 'Regulatory', 'Climate_Change', 'Talent_Shortages', 'Economic_Uncertainty', 'Competition', 'Data_Mgmt', 'Rising_Costs'];
  const concernMultiSelect = unstackMultiSelect(data.biggestConcerns || [], Q22_CONCERNS, 'Q22_Concern');
  Object.assign(submissionObject, concernMultiSelect);

  submissionObject['Q23_Barriers_To_Business'] = data.barriersToBusiness || '';

  submissionObject['Q24_New_Insurer_None'] = (data.newLifeInsurers && data.newLifeInsurers.includes('Have not engaged and plan not to in the next 12 months')) ? '1' : '0';

  const Q25_CRITERIA = [
    'Direct access to senior and empowered underwriters with local mandates',
    'Superior and fixed binder fees are designed to offset the risk of switching capacity.',
    'Quick claims settlement (straightforward, simplified process (e.g., 48-hour assessment).',
    'Agile digital tools that integrate with our existing systems (e.g., real-time quoting API, faster MTA processing).',
    'Specialised risk expertise for emerging sectors',
    'Joint marketing funds and resources to help us win business from their target segment.',
    'Highly rated reinsurance backing and proven local capitalisation to ensure long-term stability.',
    'Continuous product training',
    'Other'
  ];
  const criteriaKeys = ['Direct_Access_UW', 'Superior_Binder_Fees', 'Quick_Claims_Settlement', 'Agile_Digital_Tools', 'Specialised_Risk', 'Joint_Marketing', 'Reinsurance_Backing', 'Product_Training', 'Other'];
  const criteriaMultiSelect = unstackMultiSelect(data.newEntrantCriteria || [], Q25_CRITERIA, 'Q25_Criteria');
  Object.assign(submissionObject, criteriaMultiSelect);

  submissionObject['Q26_Growth_Products'] = data.growthProducts || '';

  submissionObject['Q27_AI_Usage_Rating'] = data.aiUsage || 0;

  const Q28_COMM_PREFS = [
    'Business planning session',
    'Strategic planning workshops',
    'Training events',
    'Broker road shows',
    'Regular meetings with broker consultant',
    'Other (please specify)'
  ];
  const commKeys = ['Business_Planning', 'Strategic_Workshops', 'Training', 'Road_Shows', 'Regular_Meetings', 'Other'];
  const commMultiSelect = unstackMultiSelect(data.communicationPreferences || [], Q28_COMM_PREFS, 'Q28_Comm');
  Object.assign(submissionObject, commMultiSelect);

  submissionObject['Q28_Comm_Other_Specify'] = data.communicationOther || '';

  const Q29_SUPPORT = [
    'Product training',
    'Enhanced customer service',
    'Faster underwriting',
    'Increased Insurance marketing',
    'Market insights on end-customer segments',
    'Selling skills training',
    'Other (please specify)'
  ];
  const supportKeys = ['Product_Training', 'Enhanced_CS', 'Faster_UW', 'Marketing', 'Market_Insights', 'Selling_Skills', 'Other'];
  const supportMultiSelect = unstackMultiSelect(data.supportNeeds || [], Q29_SUPPORT, 'Q29_Support');
  Object.assign(submissionObject, supportMultiSelect);

  submissionObject['Q29_Support_Other_Specify'] = data.supportNeedsOther || '';

  submissionObject['Q30_Opt_Out_Flag'] = data.optOut ? '1' : '0';

  return submissionObject;
};

export const submitSurvey = async (data, setIsSubmitting, surveyType = 'Zambia Short-Term') => {
  if (!setIsSubmitting) {
    console.error('submitSurvey requires setIsSubmitting setter function.');
    return { success: false, message: 'Internal error.' };
  }

  setIsSubmitting(true);

  try {
    const submissionObject = generateSubmissionObject(data, surveyType);

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL_ZAMBIA, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(submissionObject),
    });

    if (response.ok) {
      const responseText = await response.text();
      try {
        const responseJson = JSON.parse(responseText);
        if (responseJson.result === 'success') {
          return { success: true, message: 'Thank you for your submission!' };
        } else if (responseJson.result === 'duplicate') {
          return {
            success: false,
            message: 'A submission from this email was already recorded recently. Thank you!',
          };
        } else {
          return {
            success: false,
            message: responseJson.message || 'Submission failed. Please try again later.',
          };
        }
      } catch (e) {
        return {
          success: false,
          message: 'The submission server returned an unexpected response format.',
        };
      }
    } else {
      return {
        success: false,
        message: `Network error: Server responded with status ${response.status}`,
      };
    }
  } catch (error) {
    console.error('Submission error:', error);
    return {
      success: false,
      message: 'Submission failed due to a network or server error.',
    };
  } finally {
    setIsSubmitting(false);
  }
};

export { unstackMaturity, unstackPlacement, unstackDetailedRatings, unstackMultiSelect, generateSubmissionObject };

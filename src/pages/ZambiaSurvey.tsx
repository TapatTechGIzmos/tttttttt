// This file should be located at: '../utils/surveySubmission.js'

// Import the SurveyData type if available (or assume it's imported globally)
// import { SurveyData } from '../types/surveyTypes';

const APP_SCRIPT_URL = import.meta.env.VITE_APP_SCRIPT_URL;

// --- 1. Helper: Unstacking Nested Rating Objects ---

const unstackMaturity = (ratings) => ({
    'Q15a_Maturity_Client_Acquisition': ratings.clientAcquisition || '',
    'Q15b_Maturity_Quotation': ratings.quotation || '',
    'Q15c_Maturity_Policy_Admin': ratings.policyAdmin || '',
    'Q15d_Maturity_Claims': ratings.claimsManagement || '',
    'Q15e_Maturity_Financial': ratings.financialManagement || '',
    'Q15f_Maturity_Other': ratings.otherProcesses || '',
});

const unstackPlacement = (factors) => {
    const sortedFactors = Object.entries(factors)
        .sort(([, a], [, b]) => a - b) // Sort by rank value (1-6)
        .map(([key, value]) => ({ key, value }));

    const submissionData = {};
    
    // Map the rank value (1 to 6) to the correct column header key
    sortedFactors.forEach((item, index) => {
        // The index in the sortedFactors array (0-5) corresponds to the rank column suffix (1-6)
        const rankNumber = item.value;
        if (rankNumber >= 1 && rankNumber <= 6) {
             // Assigns the factor's key (e.g., 'flexibility') to the column matching its rank (e.g., Q17_RANK_1_MOST_IMPORTANT)
             submissionData[`Q17_RANK_${rankNumber}`] = item.key;
        }
    });

    return submissionData;
};

const unstackDetailedRatings = (ratings) => ({
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
    // Q20m_Low_Rating_Comment is assumed to be handled directly in the main object
});

// --- 2. Helper: Unstacking Multi-Select Arrays ---

/**
 * Creates key:value pairs for multi-selects.
 * @param {Array} selectedItems - Items chosen by the user (e.g., ['Motor Fleet', 'Property']).
 * @param {Object} mapping - Object where keys are the Sheet Headers and values are the client strings.
 */
const unstackMultiSelect = (selectedItems, mapping) => {
    const result = {};
    for (const sheetHeader in mapping) {
        const clientValue = mapping[sheetHeader];
        // Check if the client's selection array includes the expected value
        result[sheetHeader] = selectedItems.includes(clientValue) ? '1' : '';
    }
    return result;
};


// --- 3. Core: Mapped Submission Object Generation ---

const generateSubmissionObject = (data, surveyType) => {
    const isLife = surveyType === 'zambia-life';

    // Maps client values to the required Sheet Headers
    const jobFunctionMapping = {
        'Q3_Job_Function_Client_Broker': 'Client/Broker',
        'Q3_Job_Function_Sales_Manager': 'Sales Manager',
        'Q3_Job_Function_Senior_Management': 'Senior Management',
    };
    
    const serviceMapping = {
        'Q8_Service_Long_Term_Broker': 'Long Term',
        'Q8_Service_Short_Term_Broker': 'Short Term',
        'Q8_Service_Medical_Aid_Broker': 'Medical Aid',
        'Q8_Service_Other_Financial': 'Other Financial Services',
    };
    
    // NOTE: You would need to define ALL mappings for ALL multi-select fields (Q9, Q10, Q12, Q13, Q14, Q22, Q25, Q28, Q29)
    // Since I don't have all options, I'll provide examples:

    const biggestConcernsMapping = {
        'Q22_Concern_Tech_Disruption': 'Technology Disruption',
        'Q22_Concern_Client_Exp': 'Client Expectations',
        'Q22_Concern_Cybersecurity': 'Cybersecurity',
        'Q22_Concern_Regulatory': 'Regulatory Changes',
        'Q22_Concern_Climate_Change': 'Climate Change',
        'Q22_Concern_Talent_Shortages': 'Talent Shortages',
        'Q22_Concern_Economic_Uncertainty': 'Economic Uncertainty',
        'Q22_Concern_Competition': 'Competition',
        'Q22_Concern_Data_Mgmt': 'Data Management',
        'Q22_Concern_Rising_Costs': 'Rising Costs',
    };


    // --- BASE STRUCTURE: The final object where keys MUST match Sheet Headers ---
    const submissionObject = {
        // --- META DATA (HARDCODED) ---
        'Survey_Country': 'Zambia',
        'Survey_Source': isLife ? 'Life' : 'Short-Term',
        
        // --- Q1: PROFILE ---
        'Q1_Name': data.name,
        'Q1_Company': data.company,
        'Q1_Email': data.email,
        'Q1_District': data.districts.join(', '), // District array converted to a single string
        'Q2_Years_Of_Experience': data.yearsOfExperience,
        
        // --- Q3/Q4/Q5: DEMOGRAPHICS ---
        ...unstackMultiSelect([data.jobFunction], jobFunctionMapping), // Q3: Job Function
        'Q4_Gender_Male': data.gender === 'Male' ? '1' : '',
        'Q4_Gender_Female': data.gender === 'Female' ? '1' : '',
        'Q5_Age_Group_20_to_30': data.ageGroup === '20-30' ? '1' : '',
        'Q5_Age_Group_31_to_40': data.ageGroup === '31-40' ? '1' : '',
        'Q5_Age_Group_41_to_50': data.ageGroup === '41-50' ? '1' : '',
        'Q5_Age_Group_51_to_60': data.ageGroup === '51-60' ? '1' : '',
        'Q5_Age_Group_60_plus': data.ageGroup === '60+' ? '1' : '',
        
        // --- Q6/Q7/Q8: BROKERAGE OVERVIEW ---
        'Q6_Province_Central': data.province === 'Central' ? '1' : '',
        // ... include all other Q6_Province columns ...
        'Q7_Size_Solo_Broker': data.brokerageSize === 'Solo Broker' ? '1' : '',
        // ... include all other Q7_Size columns ...
        ...unstackMultiSelect(data.services, serviceMapping), // Q8: Services
        
        // --- Q9/Q10/Q11/Q12: BUSINESS OPERATIONS ---
        'Q11_Commercial_Focus_Percent': data.commercialPercentage,
        
        // --- Q13/Q14/Q15/Q16: DIGITAL & MATURITY ---
        'Q13_Source_Other': data.leadSourcesOther,
        ...unstackMaturity(data.maturityRatings), // Q15: Maturity Ratings
        
        // --- Q17: PLACEMENT FACTORS ---
        ...unstackPlacement(data.placementFactors), // Q17: Placement Factors (Complex)

        // --- Q19/Q20: INSURER EVALUATION ---
        // Q19 logic requires complex iteration over primaryInsurers and insurerRatings to map to Q19_INSURER_1_NAME, etc.
        // Q20m_Low_Rating_Comment is missing a field in initialSurveyData, using generic 'comment'
        'Q20m_Low_Rating_Comment': data.lowRatingComment || '', 
        ...unstackDetailedRatings(data.detailedRatings), // Q20: Detailed Ratings
        
        // --- Q21/Q22: MARKET OUTLOOK ---
        'Q21a_Brand_Word_1': data.brandWords[0] || '',
        'Q21a_Brand_Word_2': data.brandWords[1] || '',
        ...unstackMultiSelect(data.biggestConcerns, biggestConcernsMapping), // Q22: Concerns
        'Q23_Barriers_To_Business': data.barriersToBusiness,
        
        // --- Q27/Q28/Q29: SUPPORT ---
        'Q27_AI_Usage_Rating': data.aiUsage,
        // ... (Q28, Q29 multi-selects must be unstacked here)
        'Q29_Support_Other_Specify': data.supportNeedsOther,
        
        // --- Q30: OPT OUT ---
        'Q30_Opt_Out_Flag': data.optOut ? '1' : '',
    };
    
    // Filter out undefined/nulls, though they should be ''
    Object.keys(submissionObject).forEach(key => {
        if (submissionObject[key] === undefined || submissionObject[key] === null) {
            submissionObject[key] = '';
        }
    });

    return submissionObject;
};


// --- 4. Main Submission Function ---

export const submitSurvey = async (data, setIsSubmitting, surveyType) => {
    if (!APP_SCRIPT_URL) {
        return { success: false, message: 'Submission endpoint is not configured (VITE_APP_SCRIPT_URL is missing).' };
    }

    // Generate the flat JSON object using headers as keys
    const payloadObject = generateSubmissionObject(data, surveyType);
    
    // Note: Logging the payload here helps debug the server-side script!
    console.log("Sending Payload:", payloadObject);

    setIsSubmitting(true);
    try {
        const response = await fetch(APP_SCRIPT_URL, {
            method: 'POST',
            // CRITICAL: Google Apps Script requires Content-Type: text/plain for e.postData.contents
            headers: {
                'Content-Type': 'text/plain', 
            },
            body: JSON.stringify(payloadObject),
        });

        const result = await response.json();

        if (result.result === 'success') {
            return { 
                success: true, 
                message: 'Thank you! Your survey submission has been recorded successfully.' 
            };
        } 
        
        // Handle server-side errors (Sheet not found, duplicate, or parsing error)
        return { 
            success: false, 
            message: `Submission Failed: ${result.message || 'An unknown server error occurred.'}` 
        };

    } catch (error) {
        console.error("Network or Parsing Error:", error);
        return { 
            success: false, 
            message: `A network error occurred. Please check your connection and try again. (${error.message})` 
        };
    } finally {
        setIsSubmitting(false);
    }
};
import { SurveyData } from '../types/surveyTypes';

// --- GOOGLE APPS SCRIPT URLS ---
const GOOGLE_APPS_SCRIPT_URL_Botswana = "https://script.google.com/macros/s/AKfycbzfSHW4zaRjlewYo8QBjPBu4rwW0NeyX_0m3fi_0sWhNPXIqM1HyR6IajSKCxy5Gedk/exec";
const GOOGLE_APPS_SCRIPT_URL_LIFE_Botswana = "https://script.google.com/macros/s/AKfycby5TU8A96WeXk_6NnesMYG-fSUo0r-94zetBylmGN5ntRJ32ikPTkYhuiQVe6mC8h6iwQ/exec";
const GOOGLE_APPS_SCRIPT_URL_ZAMBIA = ""; // Placeholder
const GOOGLE_APPS_SCRIPT_URL_ZAMBIA_LIFE = ""; // Placeholder

// --- OPTIONS DEFINITION (Retained for binary mapping) ---
const Q6_OPTIONS_BOTSWANA = ['South East District', 'North East District', 'Southern District', 'Kweneng District', 'Kgatleng Distrct', 'Central District', 'Ghanzi District', 'Kgalagadi District', 'Ngamiland District', 'Chobe District'];
const Q6_OPTIONS_ZAMBIA = ['Central', 'Copperbelt', 'Eastern', 'Luapula', 'Lusaka', 'Muchinga', 'Northern', 'North Western', 'Southern', 'Western'];
const Q8_OPTIONS = ['Long term broker', 'Short term broker', 'Medical Aid broker', 'Other Financial Advisory Services'];
const Q9_OPTIONS = ['Mass market', 'Middle market', 'Affluent market', 'We do not offer personal lines'];
const Q10_OPTIONS = ['Micro Enterprise: <10 employees', 'Small Enterprise: 10 to 49 employees', 'Medium Enterprise: 50 to 99 employees', 'Commercial Enterprise: 100 to 299 employees', 'Large Corporate Enterprise: 300 plus employees'];

const Q12a_OPTIONS_LIFE = ['Term Life Cover (e.g.; Botshelo Term Life Cover; Mothusi Term Shield; Digital Term - DT)', 'Whole of Life Cover (e.g.; Botshelo Whole of Life; Mothusi Lifeline, Poelo Whole of Life)', 'Funeral Cover (e.g., Boikanyo; Mosako; Kgomotso; Digital Funeral - DF)', 'Credit Life cover (e.g.; Mothusi Home Secure; Poelo Credit Life; Digital Credit Life - DCL)', 'Living benefits - Critical illness; disability cover', 'Retirement/Investment products'];
const Q12a_OPTIONS_SHORT_TERM = ['Motor Insurance (Vehicle Insurance)', 'House Owners / Buildings Insurance', 'House Holders / Contents Insurance', 'Personal All Risk (for portable valuables)', 'Personal Accident Insurance', 'Personal Liability Insurance'];

const Q12b_OPTIONS_LIFE = ['Group Life Assurance (GLA)', 'Group Funeral Schemes (GFS)', 'Group Credit Life (GCL)', 'Group Critical Illness Cover'];
const Q12b_OPTIONS_SHORT_TERM = ['Commercial Property/Fire & Allied Perils', 'Motor Fleet Insurance', 'Business All Risks', 'Business Interruption Insurance', 'Engineering Insurance (including Contractor\'s All Risk - CAR)', 'Marine Insurance', 'Public Liability Insurance', 'Professional Indemnity (PI) Insurance', 'Fidelity Guarantee/Bankers Blanket Bonds', 'Agriculture Insurance'];

const Q13_OPTIONS = ['Buy hot leads list', 'Existing client referral', 'Leverage social media', 'Cross sell to existing client base', 'Referral from a professional networks', 'Direct Outreach - Cold calling and email', 'Partnerships and Alliances (corporates, affinity groups, government departments, etc)', 'Other (please specify)'];
const Q14_OPTIONS = ['Quoting and comparing products', 'Submitting applications', 'Managing renewals', 'Processing MTAs', 'Communicating with clients', 'Claims handling', 'None of the above'];
const Q16_OPTIONS = ['To save time', 'To improve customer experience', 'To reduce admin workload', 'To remain competitive', 'To lower operational costs', 'I wouldn\'t use more digital tools'];
const Q27_OPTIONS = ['Technological Disruption and Adoption', 'Changing Client Expectations', 'Cybersecurity Risks', 'Regulatory and Compliance Pressures', 'Climate Change and Sustainability', 'Talent Shortages and Succession Planning', 'Economic Uncertainty and Market Volatility', 'Competition from Insurtech and Direct-to-Consumer Models', 'Data Management and Analytics', 'Rising Operational Costs']; 

const Q29a_OPTIONS_SHORT_TERM = ['Active Drive Capital', 'Insure Guard', 'Legalwise Botswana', 'Lords Insurance', 'Westsure Insurance', 'Have not engaged and plan not to in the next 12 months'];
const Q29a_OPTIONS_LIFE = ['Afritec Life Insurance', 'Exclusive Life Insurance', 'Westlife Insurance Botswana', 'Have not engaged and plan not to in the next 12 months'];
const Q29a_OPTIONS_ZAMBIA = ['Have not engaged and plan not to in the next 12 months'];

const Q29b_OPTIONS = ['Direct access to senior and empowered underwriters with local mandates', 'Superior and fixed binder fees are designed to offset the risk of switching capacity.', 'Quick claims settlement (straightforward, simplified process (e.g., 48-hour assessment).', 'Agile digital tools that integrate with our existing systems (e.g., real-time quoting API, faster MTA processing).', 'Specialised risk expertise for emerging sectors', 'Joint marketing funds and resources to help us win business from their target segment.', 'Highly rated reinsurance backing and proven local capitalisation to ensure long-term stability.', 'Continuous product training', 'Other'];

const Q32_OPTIONS = ['Business planning session', 'Strategic planning workshops', 'Training events', 'Broker road shows', 'Regular meetings with broker consultant', 'Other (please specify)']; 
const Q33_OPTIONS = ['Product training', 'Enhanced customer service', 'Faster underwriting', 'Increased Insurance marketing', 'Market insights on end-customer segments', 'Selling skills training', 'Other (please specify)']; 

const Q15_KEYS = ['clientAcquisition', 'quotation', 'policyAdmin', 'claimsManagement', 'financialManagement', 'otherProcesses'];
const Q19_CATEGORIES = ['underwriting', 'documentation', 'claims', 'postSale', 'relationship', 'proportion'];
const Q21_KEYS = ['decisionMakers', 'brandReputation', 'claimsHandling', 'winningBusiness', 'insurerAppetite', 'priceCompetitiveness', 'regionalPresence', 'responsiveness', 'techInnovation', 'midTermAlterations', 'renewalTerms', 'trainingSupport'];
const Q17_RANKS = [1, 2, 3, 4, 5, 6];

// Helper function definition
const mapToBinary = (selectedItems: string[] | undefined, allPossibleOptions: string[]): number[] => {
    const selectedSet = new Set(selectedItems || []);
    // Ensure explicit return type of number (0 or 1)
    return allPossibleOptions.map(option => selectedSet.has(option) ? 1 : 0);
};

export function mapSurveyDataForSubmission(data: SurveyData, isLifeSurvey: boolean = false, country: string = "Botswana"): (string | number)[] {
    const submissionArray: (string | number)[] = [];

    // --- 1. ADMINISTRATIVE FIELDS (Q0) ---
    submissionArray.push(
        new Date().toISOString(), // 0: TIMESTAMP
        country, // 1: Survey_Country
        "Web Survey App" // 2: Survey_Source
    );

    // --- 2. Q1 - Q5 (Profile / Demographics) ---
    // Q1 (Text fields) - 4 columns
    submissionArray.push(data.name || ""); // 3: Q1_Name
    submissionArray.push(data.company || ""); // 4: Q1_Company
    submissionArray.push(data.email || ""); // 5: Q1_Email
    submissionArray.push(data.district || ""); // 6: Q1_District

    // Q2 (Text field) - 1 column
    submissionArray.push(data.yearsOfExperience || ""); // 7: Q2_Years_Of_Experience
    
    // Q3: Job Function (Binary - 3 columns)
    const jobFunctionOptions = ['Client Facing / Broker', 'Sales manager / Team Leader', 'Senior Management'];
    jobFunctionOptions.forEach(option => {
        // Pushes 1 or 0 (number)
        submissionArray.push(data.jobFunction === option ? 1 : 0);
    }); // 8-10
    
    // Q4: Gender (Binary - 2 columns)
    const genderOptions = ['Male', 'Female'];
    genderOptions.forEach(option => {
        // Pushes 1 or 0 (number)
        submissionArray.push(data.gender === option ? 1 : 0);
    }); // 11-12

    // Q5: Age Group (Binary - 5 columns)
    const ageGroupOptions = ['20 to 30 years', '31 to 40 years', '41 to 50 years', '51 to 60 years', '60+ years'];
    ageGroupOptions.forEach(option => {
        // Pushes 1 or 0 (number)
        submissionArray.push(data.ageGroup === option ? 1 : 0);
    }); // 13-17

    // --- 3. Q6 - Q11 (Brokerage Overview) ---
    // Q6: Districts (Binary - 10 columns)
    submissionArray.push(...mapToBinary(data.districts, country === "Zambia" ? Q6_OPTIONS_ZAMBIA : Q6_OPTIONS_BOTSWANA)); // 18-27
    
    // Q7: Brokerage Size (Binary - 6 columns)
    const brokerageSizeOptions = ['Solo Broker', '2 to 5 people', '6 to 20 people', '21 to 30 people', '31 to 50 people', '50 plus people'];
    brokerageSizeOptions.forEach(option => {
        submissionArray.push(data.brokerageSize === option ? 1 : 0);
    }); // 28-33

    // Q8: Services Provided (Binary - 4 columns)
    submissionArray.push(...mapToBinary(data.services, Q8_OPTIONS)); // 34-37
    
    // Q9: Personal Lines Segment (Binary - 4 columns)
    submissionArray.push(...mapToBinary(data.personalLinesSegment, Q9_OPTIONS)); // 38-41
    
    // Q10: Corporate Client Size (Binary - 5 columns)
    submissionArray.push(...mapToBinary(data.corporateClientSize, Q10_OPTIONS)); // 42-46
    
    // Q11: Commercial Focus (Numeric)
    submissionArray.push(data.commercialFocus ?? 0); // 47

    // --- 4. Q12a & Q12b (Products - Binary) ---
    const q12aOptions = isLifeSurvey ? Q12a_OPTIONS_LIFE : Q12a_OPTIONS_SHORT_TERM; // 6 columns
    const q12bOptions = isLifeSurvey ? Q12b_OPTIONS_LIFE : Q12b_OPTIONS_SHORT_TERM; // 4 columns (Life) / 10 columns (ST)
    
    submissionArray.push(...mapToBinary(data.topProductsPersonal, q12aOptions)); // Q12a (6 Binary)
    submissionArray.push(...mapToBinary(data.topProductsCommercial, q12bOptions)); // Q12b (4/10 Binary)

    // --- 5. Q13 - Q16 (Business Ops - Binary/Numeric) ---
    submissionArray.push(...mapToBinary(data.leadSources, Q13_OPTIONS)); // Q13 (8 Binary Columns)
    submissionArray.push(...mapToBinary(data.digitalTasks, Q14_OPTIONS)); // Q14 (7 Binary Columns)

    Q15_KEYS.forEach(key => {
        submissionArray.push(data.maturityRatings?.[key as keyof typeof data.maturityRatings] ?? 0); // Q15 (6 Numeric)
    });

    submissionArray.push(...mapToBinary(data.digitalToolReasons, Q16_OPTIONS)); // Q16 (6 Binary Columns)

    // --- 6. Q17 - Q21 (Insurer Evaluation - Text/Numeric) ---
    
    // Q17: Placement Factors (Text Ranked - 6 columns)
    Q17_RANKS.forEach(rank => {
        const factorKey = Object.keys(data.placementFactors || {}).find(
            key => data.placementFactors?.[key] === rank
        );
        submissionArray.push(factorKey || ""); // Q17_RANK_1, Q17_RANK_2, etc. (6 Text Columns)
    });

    const primaryInsurers = data.primaryInsurers || [];

    // Q18/Q19: Insurer Grouped Data (3 Insurers * (1 Name + 6 Ratings) = 21 columns)
    for (let i = 0; i < 3; i++) {
        const insurer = primaryInsurers[i];
        const ratings = data.insurerRatings?.[insurer] || {};
        
        submissionArray.push(insurer || ""); // Q19_INSURER_X_NAME (Text)

        Q19_CATEGORIES.forEach(categoryKey => {
            submissionArray.push(ratings[categoryKey as keyof typeof ratings] ?? 0); // Q19_INSURER_X_Rating (6 Numeric)
        });
    }

    // Q20/Q21: Deep Dive and Follow-up (1 Deep Dive Name + 12 Ratings + 1 Comment + 2 Brand + 1 Improvement)
    
    submissionArray.push(data.deepDiveInsurer || ""); // Deep_Dive_Insurer_Name (Text)

    Q21_KEYS.forEach(key => {
        submissionArray.push(data.detailedRatings?.[key as keyof typeof data.detailedRatings] || ""); // Q20a_Rating_... (12 Text)
    });
    
    submissionArray.push(data.q21FollowUp || ""); // Q20m_Low_Rating_Comment (Text)

    submissionArray.push(
        data.brandWords?.[0] || "", // Q21a_Brand_Word_1 (Text)
        data.brandWords?.[1] || "", // Q21a_Brand_Word_2 (Text)
        data.serviceImprovement || "" // Q21b_Service_Improvement_Needed (Text)
    );

    // -----------------------------------------------------------------------------------------------------
    // IMPORTANT: The following fields from the original component code were removed to match the 165 headers.
    // Ensure the data object does not contain these, as they would be pushed here if they existed.
    // Data pushed from the client in the array must ONLY contain the following:
    // -----------------------------------------------------------------------------------------------------
    // REMOVED FIELDS: 
    // data.selectedInsurer, data.serviceInfluence, data.productClasses, data.valueBeyondPrice, data.claimsExperience,
    // data.serviceDescription, data.productDifferentiation, data.relationshipExperience, data.knowledgeRating
    // data.successionPlan
    // -----------------------------------------------------------------------------------------------------


    // --- 7. Q22 - Q29 (Market Outlook - Shifted Q#s) ---
    
    // Q22: Biggest Concerns (Binary - 10 columns)
    submissionArray.push(...mapToBinary(data.biggestConcerns, Q27_OPTIONS)); 

    // Q23: Barriers to Business (Text)
    submissionArray.push(data.barriersToBusiness || ""); 

    // Q24a: New Insurer Placement (Binary)
    const q29aOptions = country === "Zambia" ? Q29a_OPTIONS_ZAMBIA : (isLifeSurvey ? Q29a_OPTIONS_LIFE : Q29a_OPTIONS_SHORT_TERM);
    submissionArray.push(...mapToBinary(data.newLifeInsurers, q29aOptions));
    
    // Q24b: New Entrant Criteria (Binary - 9 columns)
    submissionArray.push(...mapToBinary(data.newEntrantCriteria, Q29b_OPTIONS));

    // Q25: Growth Products (Text)
    submissionArray.push(data.growthProducts || ""); 

    // Q26: AI Usage (Numeric)
    submissionArray.push(data.aiUsage ?? 0);         

    // Q27: Communication Preferences (Binary + Other Text)
    submissionArray.push(...mapToBinary(data.communicationPreferences, Q32_OPTIONS));
    submissionArray.push(data.communicationOther || "");

    // Q28: Support Needs (Binary + Other Text)
    submissionArray.push(...mapToBinary(data.supportNeeds, Q33_OPTIONS));
    submissionArray.push(data.supportNeedsOther || "");
    
    // Q29: Opt Out (Binary)
    submissionArray.push(data.optOut ? 1 : 0); 

    return submissionArray;
}

interface SubmissionResult {
    success: boolean;
    message: string;
}

export async function submitSurvey(
    surveyData: SurveyData,
    setIsSubmitting: (isSubmitting: boolean) => void,
    isLifeSurvey: boolean = false
): Promise<SubmissionResult> {
    if (!setIsSubmitting) {
        console.error("submitSurvey requires setIsSubmitting setter function.");
        return { success: false, message: "Internal error." };
    }

    setIsSubmitting(true);
    let result: SubmissionResult = {
        success: false,
        message: "Submission failed due to a network or server error."
    };

    try {
        const dataRowToSubmit = mapSurveyDataForSubmission(surveyData, isLifeSurvey);
        
        // Use the appropriate URL based on the survey type
        const scriptUrl = isLifeSurvey ? GOOGLE_APPS_SCRIPT_URL_LIFE_Botswana : GOOGLE_APPS_SCRIPT_URL_Botswana; 

        const response = await fetch(scriptUrl, {
            method: 'POST',
            body: JSON.stringify(dataRowToSubmit),
        });

        if (response.ok) {
            const responseText = await response.text();
            try {
                const responseJson = JSON.parse(responseText);
                if (responseJson.result === 'success') {
                    result = { success: true, message: "Thank you for your submission!" };
                } else if (responseJson.result === 'duplicate') {
                    result = {
                        success: false,
                        message: "A submission from this email was already recorded recently. Thank you!"
                    };
                } else {
                    result = {
                        success: false,
                        message: responseJson.message || "Submission failed. Please try again later."
                    };
                }
            } catch (e) {
                result = {
                    success: false,
                    message: "The submission server returned an unexpected response format."
                };
            }
        } else {
            result = {
                success: false,
                message: `Network error: Server responded with status ${response.status}`
            };
        }

    } catch (error) {
        console.error("Submission error:", error);
    } finally {
        setIsSubmitting(false);
    }

    return result;
}
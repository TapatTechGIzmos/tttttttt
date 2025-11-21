import { SurveyData } from '../types/surveyTypes';

const GOOGLE_APPS_SCRIPT_URL_Botswana = "https://script.google.com/macros/s/AKfycbzfSHW4zaRjlewYo8QBjPBu4rwW0NeyX_0m3fi_0sWhNPXIqM1HyR6IajSKCxy5Gedk/exec";
const GOOGLE_APPS_SCRIPT_URL_LIFE_Botswana = "https://script.google.com/macros/s/AKfycby5TU8A96WeXk_6NnesMYG-fSUo0r-94zetBylmGN5ntRJ32ikPTkYhuiQVe6mC8h6iwQ/exec";
const GOOGLE_APPS_SCRIPT_URL_ZAMBIA = "https://script.google.com/macros/s/AKfycbx7tEBDKM-D3LAZ6IGn1iQp0bURsrI-BO-OB7VQJAAZz1EAJ2Yfa7dcFI5bTEeJ_pl3Eg/exec";
const GOOGLE_APPS_SCRIPT_URL_ZAMBIA_LIFE = "https://script.google.com/macros/s/AKfycbzRiqdlXVHpwhtbGINXeyQffnN-ynR_1pdWCfRzhyKNL-Vl3ohSEFPqEjJ-H6ZAq1by1Q/exec";

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
const Q22_OPTIONS = ['Technological Disruption and Adoption', 'Changing Client Expectations', 'Cybersecurity Risks', 'Regulatory and Compliance Pressures', 'Climate Change and Sustainability', 'Talent Shortages and Succession Planning', 'Economic Uncertainty and Market Volatility', 'Competition from Insurtech and Direct-to-Consumer Models', 'Data Management and Analytics', 'Rising Operational Costs'];

const Q24_OPTIONS_SHORT_TERM = ['Active Drive Capital', 'Insure Guard', 'Legalwise Botswana', 'Lords Insurance', 'Westsure Insurance', 'Have not engaged and plan not to in the next 12 months'];
const Q24_OPTIONS_LIFE = ['Afritec Life Insurance', 'Axion Life', 'Exclusive Life Insurance', 'Westlife Insurance Botswana', 'None yet'];
const Q24_OPTIONS_ZAMBIA = ['Have not engaged and plan not to in the next 12 months'];

const Q25_OPTIONS = ['Direct access to senior and empowered underwriters with local mandates', 'Superior and fixed binder fees are designed to offset the risk of switching capacity.', 'Quick claims settlement (straightforward, simplified process (e.g., 48-hour assessment).', 'Agile digital tools that integrate with our existing systems (e.g., real-time quoting API, faster MTA processing).', 'Specialised risk expertise for emerging sectors', 'Joint marketing funds and resources to help us win business from their target segment.', 'Highly rated reinsurance backing and proven local capitalisation to ensure long-term stability.', 'Continuous product training', 'Other'];

const Q28_OPTIONS = ['Business planning session', 'Strategic planning workshops', 'Training events', 'Broker road shows', 'Regular meetings with broker consultant', 'Other (please specify)'];
const Q29_OPTIONS = ['Product training', 'Enhanced customer service', 'Faster underwriting', 'Increased Insurance marketing', 'Market insights on end-customer segments', 'Selling skills training', 'Other (please specify)'];

const Q15_KEYS = ['clientAcquisition', 'quotation', 'policyAdmin', 'claimsManagement', 'financialManagement', 'otherProcesses'];
const Q19_CATEGORIES = ['underwriting', 'documentation', 'claims', 'postSale', 'relationship', 'proportion'];
const Q20_KEYS = ['decisionMakers', 'brandReputation', 'claimsHandling', 'winningBusiness', 'insurerAppetite', 'priceCompetitiveness', 'regionalPresence', 'responsiveness', 'techInnovation', 'midTermAlterations', 'renewalTerms', 'trainingSupport'];
const Q17_RANKS = [1, 2, 3, 4, 5, 6];

const mapToBinary = (selectedItems: string[] | undefined, allPossibleOptions: string[]): number[] => {
    const selectedSet = new Set(selectedItems || []);
    return allPossibleOptions.map(option => selectedSet.has(option) ? 1 : 0);
};

export function mapSurveyDataForSubmission(data: SurveyData, isLifeSurvey: boolean = false, country: string = "Botswana"): (string | number)[] {
    const submissionArray: (string | number)[] = [];

    const surveyTypeLabel = isLifeSurvey ? 'Life' : 'Short-Term';
    const sourceLabel = `${country} ${surveyTypeLabel}`;

    submissionArray.push(
        new Date().toISOString(),
        country,
        sourceLabel
    );

    submissionArray.push(data.name || "");
    submissionArray.push(data.company || "");
    submissionArray.push(data.email || "");
    submissionArray.push(data.district || "");

    submissionArray.push(data.yearsOfExperience || "");

    const jobFunctionOptions = ['Client Facing / Broker', 'Sales manager / Team Leader', 'Senior Management'];
    jobFunctionOptions.forEach(option => {
        submissionArray.push(data.jobFunction === option ? 1 : 0);
    });

    const genderOptions = ['Male', 'Female'];
    genderOptions.forEach(option => {
        submissionArray.push(data.gender === option ? 1 : 0);
    });

    const ageGroupOptions = ['20 to 30 years', '31 to 40 years', '41 to 50 years', '51 to 60 years', '60+ years'];
    ageGroupOptions.forEach(option => {
        submissionArray.push(data.ageGroup === option ? 1 : 0);
    });

    submissionArray.push(...mapToBinary(data.districts, country === "Zambia" ? Q6_OPTIONS_ZAMBIA : Q6_OPTIONS_BOTSWANA));

    const brokerageSizeOptions = ['Solo Broker', '2 to 5 people', '6 to 20 people', '21 to 30 people', '31 to 50 people', '50 plus people'];
    brokerageSizeOptions.forEach(option => {
        submissionArray.push(data.brokerageSize === option ? 1 : 0);
    });

    submissionArray.push(...mapToBinary(data.services, Q8_OPTIONS));
    submissionArray.push(...mapToBinary(data.personalLinesSegment, Q9_OPTIONS));
    submissionArray.push(...mapToBinary(data.corporateClientSize, Q10_OPTIONS));
    submissionArray.push(data.commercialFocus ?? 0);

    const q12aOptions = isLifeSurvey ? Q12a_OPTIONS_LIFE : Q12a_OPTIONS_SHORT_TERM;
    const q12bOptions = isLifeSurvey ? Q12b_OPTIONS_LIFE : Q12b_OPTIONS_SHORT_TERM;

    submissionArray.push(...mapToBinary(data.topProductsPersonal, q12aOptions));
    submissionArray.push(...mapToBinary(data.topProductsCommercial, q12bOptions));

    submissionArray.push(...mapToBinary(data.leadSources, Q13_OPTIONS));
    submissionArray.push(...mapToBinary(data.digitalTasks, Q14_OPTIONS));

    Q15_KEYS.forEach(key => {
        submissionArray.push(data.maturityRatings?.[key as keyof typeof data.maturityRatings] ?? 0);
    });

    submissionArray.push(...mapToBinary(data.digitalToolReasons, Q16_OPTIONS));

    Q17_RANKS.forEach(rank => {
        const factorKey = Object.keys(data.placementFactors || {}).find(
            key => data.placementFactors?.[key] === rank
        );
        submissionArray.push(factorKey || "");
    });

    const primaryInsurers = data.primaryInsurers || [];

    for (let i = 0; i < 3; i++) {
        const insurer = primaryInsurers[i];
        const ratings = data.insurerRatings?.[insurer] || {};

        submissionArray.push(insurer || "");

        Q19_CATEGORIES.forEach(categoryKey => {
            submissionArray.push(ratings[categoryKey as keyof typeof ratings] ?? 0);
        });
    }

    submissionArray.push(data.deepDiveInsurer || "");

    Q20_KEYS.forEach(key => {
        submissionArray.push(data.detailedRatings?.[key as keyof typeof data.detailedRatings] || "");
    });

    submissionArray.push(data.q21FollowUp || "");

    submissionArray.push(
        data.brandWords?.[0] || "",
        data.brandWords?.[1] || "",
        data.serviceImprovement || ""
    );

    submissionArray.push(...mapToBinary(data.biggestConcerns, Q22_OPTIONS));

    submissionArray.push(data.barriersToBusiness || "");

    const q24Options = country === "Zambia" ? Q24_OPTIONS_ZAMBIA : (isLifeSurvey ? Q24_OPTIONS_LIFE : Q24_OPTIONS_SHORT_TERM);
    submissionArray.push(...mapToBinary(data.newLifeInsurers, q24Options));

    submissionArray.push(...mapToBinary(data.newEntrantCriteria, Q25_OPTIONS));

    submissionArray.push(data.growthProducts || "");

    submissionArray.push(data.aiUsage ?? 0);

    submissionArray.push(...mapToBinary(data.communicationPreferences, Q28_OPTIONS));
    submissionArray.push(data.communicationOther || "");

    submissionArray.push(...mapToBinary(data.supportNeeds, Q29_OPTIONS));
    submissionArray.push(data.supportNeedsOther || "");

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

    const EXPECTED_LENGTH = 166;

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
        const dataRowToSubmit = mapSurveyDataForSubmission(surveyData, isLifeSurvey, surveyData.country || "Botswana");

        if (dataRowToSubmit.length !== EXPECTED_LENGTH) {
            console.warn(`[DIAGNOSTIC] Submission Array Length Mismatch! Expected ${EXPECTED_LENGTH} columns, got ${dataRowToSubmit.length}. Check Q12b mapping.`);
            console.log("Array being sent:", dataRowToSubmit);
        }

        const country = surveyData.country || "Botswana";
        let scriptUrl: string;

        if (country === "Zambia") {
            scriptUrl = isLifeSurvey ? GOOGLE_APPS_SCRIPT_URL_ZAMBIA_LIFE : GOOGLE_APPS_SCRIPT_URL_ZAMBIA;
        } else {
            scriptUrl = isLifeSurvey ? GOOGLE_APPS_SCRIPT_URL_LIFE_Botswana : GOOGLE_APPS_SCRIPT_URL_Botswana;
        }

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

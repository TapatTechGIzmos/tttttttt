import { SurveyData } from '../types/surveyTypes';

const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzF9QuPkmczwX22VQdS2WETYXo80e1Hk3O7IcbCYC6nJoEd69LwBQTZUx61_TJ_ra2_eQ/exec";

const Q6_OPTIONS = ['South East District', 'North East District', 'Southern District', 'Kweneng District', 'Kgatleng Distrct', 'Central District', 'Ghanzi District', 'Kgalagadi District', 'Ngamiland District', 'Chobe District'];
const Q8_OPTIONS = ['Long term broker', 'Short term broker', 'Medical Aid broker', 'Other Financial Advisory Services'];
const Q9_OPTIONS = ['Mass market', 'Middle market', 'Affluent market', 'We do not offer personal lines'];
const Q10_OPTIONS = ['Micro Enterprise: <10 employees', 'Small Enterprise: 10 to 49 employees', 'Medium Enterprise: 50 to 99 employees', 'Commercial Enterprise: 100 to 299 employees', 'Large Corporate Enterprise: 300 plus employees'];
const Q12a_OPTIONS = ['Motor Insurance (Vehicle Insurance)', 'House Owners / Buildings Insurance', 'House Holders / Contents Insurance', 'Personal All Risk (for portable valuables)', 'Personal Accident Insurance', 'Personal Liability Insurance'];
const Q12b_OPTIONS = ['Commercial Property/Fire & Allied Perils', 'Motor Fleet Insurance', 'Business All Risks', 'Business Interruption Insurance', 'Engineering Insurance (including Contractor\'s All Risk - CAR)', 'Marine Insurance', 'Public Liability Insurance', 'Professional Indemnity (PI) Insurance', 'Fidelity Guarantee/Bankers Blanket Bonds', 'Agriculture Insurance'];
const Q13_OPTIONS = ['Buy hot leads list', 'Existing client referral', 'Leverage social media', 'Cross sell to existing client base', 'Referral from a professional networks', 'Direct Outreach - Cold calling and email', 'Partnerships and Alliances (corporates, affinity groups, government departments, etc)', 'Other (please specify)'];
const Q14_OPTIONS = ['Quoting and comparing products', 'Submitting applications', 'Managing renewals', 'Processing MTAs', 'Communicating with clients', 'Claims handling', 'None of the above'];
const Q16_OPTIONS = ['To save time', 'To improve customer experience', 'To reduce admin workload', 'To remain competitive', 'To lower operational costs', 'I wouldn\'t use more digital tools'];
const Q27_OPTIONS = ['Technological Disruption and Adoption', 'Changing Client Expectations', 'Cybersecurity Risks', 'Regulatory and Compliance Pressures', 'Climate Change and Sustainability', 'Talent Shortages and Succession Planning', 'Economic Uncertainty and Market Volatility', 'Competition from Insurtech and Direct-to-Consumer Models', 'Data Management and Analytics', 'Rising Operational Costs'];
const Q32_OPTIONS = ['Business planning session', 'Strategic planning workshops', 'Training events', 'Broker road shows', 'Regular meetings with broker consultant', 'Other (please specify)'];
const Q33_OPTIONS = ['Product training', 'Enhanced customer service', 'Faster underwriting', 'Increased Insurance marketing', 'Market insights on end-customer segments', 'Selling skills training', 'Other (please specify)'];

const Q15_KEYS = ['clientAcquisition', 'quotation', 'policyAdmin', 'claimsManagement', 'financialManagement', 'otherProcesses'];
const Q19_CATEGORIES = ['underwriting', 'documentation', 'claims', 'postSale', 'relationship', 'proportion'];
const Q21_KEYS = ['decisionMakers', 'brandReputation', 'claimsHandling', 'winningBusiness', 'insurerAppetite', 'priceCompetitiveness', 'regionalPresence', 'responsiveness', 'techInnovation', 'midTermAlterations', 'renewalTerms', 'trainingSupport'];
const Q17_RANKS = [1, 2, 3, 4, 5, 6];

const mapToBinary = (selectedItems: string[] | undefined, allPossibleOptions: string[]): number[] => {
    const selectedSet = new Set(selectedItems || []);
    return allPossibleOptions.map(option => selectedSet.has(option) ? 1 : 0);
};

export function mapSurveyDataForSubmission(data: SurveyData): (string | number)[] {
    const submissionArray: (string | number)[] = [];

    submissionArray.push(
        new Date().toISOString(),
        "Botswana",
        "Web Survey App"
    );

    submissionArray.push(
        data.name || "",
        data.company || "",
        data.email || "",
        data.district || "",
        data.yearsOfExperience || "",
        data.jobFunction || "",
        data.gender || "",
        data.ageGroup || ""
    );

    submissionArray.push(...mapToBinary(data.districts, Q6_OPTIONS));
    submissionArray.push(data.brokerageSize || "");
    submissionArray.push(...mapToBinary(data.services, Q8_OPTIONS));
    submissionArray.push(...mapToBinary(data.personalLinesSegment, Q9_OPTIONS));
    submissionArray.push(...mapToBinary(data.corporateClientSize, Q10_OPTIONS));

    submissionArray.push(data.commercialFocus ?? 0);
    submissionArray.push(...mapToBinary(data.topProductsPersonal, Q12a_OPTIONS));
    submissionArray.push(...mapToBinary(data.topProductsCommercial, Q12b_OPTIONS));
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
        submissionArray.push(primaryInsurers[i] || "");
    }

    for (let i = 0; i < 3; i++) {
        const insurer = primaryInsurers[i];
        const ratings = data.insurerRatings?.[insurer] || {};

        submissionArray.push(insurer || "");

        Q19_CATEGORIES.forEach(categoryKey => {
            submissionArray.push(ratings[categoryKey as keyof typeof ratings] ?? 0);
        });
    }

    submissionArray.push(
        data.selectedInsurer || data.deepDiveInsurer || "",
        data.serviceInfluence || "",
        data.productClasses || "",
        data.valueBeyondPrice || "",
        data.claimsExperience || ""
    );

    Q21_KEYS.forEach(key => {
        submissionArray.push(data.detailedRatings?.[key as keyof typeof data.detailedRatings] || "");
    });

    submissionArray.push(
        data.brandWords?.[0] || "",
        data.brandWords?.[1] || "",
        data.serviceImprovement || ""
    );

    submissionArray.push(
        data.serviceDescription || "",
        data.productDifferentiation || "",
        data.relationshipExperience || "",
        data.knowledgeRating || ""
    );

    submissionArray.push(...mapToBinary(data.biggestConcerns, Q27_OPTIONS));

    submissionArray.push(
        data.barriersToBusiness || "",
        data.successionPlan || "",
        data.growthProducts || "",
        data.aiUsage ?? 0
    );

    submissionArray.push(...mapToBinary(data.communicationPreferences, Q32_OPTIONS));
    submissionArray.push(data.communicationOther || "");

    submissionArray.push(...mapToBinary(data.supportNeeds, Q33_OPTIONS));
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
    setIsSubmitting: (isSubmitting: boolean) => void
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
        const dataRowToSubmit = mapSurveyDataForSubmission(surveyData);

        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
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

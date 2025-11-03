import React, { useState, useEffect, useRef } from 'react';
import { SurveyData } from '../../pages/BotswanaSurvey';

interface BusinessOperationsPageProps {
  data: SurveyData;
  updateData: (data: Partial<SurveyData>) => void;
}

const products = [
  'Automative cover',
  'Property Cover',
  'Marine Cover',
  'Specialist Risk cover',
  'General Liability cover',
  'Credit/Finance Guarantee cover',
];

const leadSources = [
  'Buy hot leads list',
  'Existing client referral',
  'Leverage social media',
  'Cross sell to existing client base',
  'Referral from a professional networks',
  'Direct Outreach - Cold calling and email',
  'Partnerships and Alliances (corporates, affinity groups, government departments, etc)',
  'Other (please specify)',
];

const distributionChannels = [
  'Direct sales',
  'Broker/agent network',
  'Online/digital platform',
  'Corporate/affinity partnerships',
  'Other (please specify)',
];

const salesApproaches = [
  'Inbound (client initiated)',
  'Outbound (sales outreach)',
  'Digital marketing',
  'Events/seminars',
  'Broker-led',
  'Other (please specify)',
];

const maturityAreas = [
  { key: 'clientAcquisition', label: '16a. Client Acquisition and Relationship Management' },
  { key: 'quotation', label: '16b. Quotation process' },
  { key: 'policyAdmin', label: '16c. Policy Administration and Management' },
  { key: 'claimsManagement', label: '16d. Claims Management and Support' },
  { key: 'financialManagement', label: '16e. Financial Management' },
  { key: 'otherProcesses', label: '16f. All Other Processes' },
];

export default function BusinessOperationsPage({ data, updateData }: BusinessOperationsPageProps) {
  // === LOCAL STATE ===
  const [commercialFocus, setCommercialFocus] = useState<number>(data.commercialFocus ?? 0);
  const [localTopProducts, setLocalTopProducts] = useState<string[]>(data.topProducts ?? []);
  const [localLeadSources, setLocalLeadSources] = useState<string[]>(data.leadSources ?? []);
  const [localDistributionChannels, setLocalDistributionChannels] = useState<string[]>(data.distributionChannels ?? []);
  const [localSalesApproaches, setLocalSalesApproaches] = useState<string[]>(data.salesApproaches ?? []);
  const [localMaturityRatings, setLocalMaturityRatings] = useState<Record<string, number>>(data.maturityRatings ?? {});

  // === SYNC PARENT → LOCAL ===
  useEffect(() => setCommercialFocus(data.commercialFocus ?? 0), [data.commercialFocus]);
  useEffect(() => setLocalTopProducts(data.topProducts ?? []), [data.topProducts]);
  useEffect(() => setLocalLeadSources(data.leadSources ?? []), [data.leadSources]);
  useEffect(() => setLocalDistributionChannels(data.distributionChannels ?? []), [data.distributionChannels]);
  useEffect(() => setLocalSalesApproaches(data.salesApproaches ?? []), [data.salesApproaches]);

  useEffect(() => {
    const incoming = data.maturityRatings ?? {};
    setLocalMaturityRatings(prev => {
      return JSON.stringify(prev) !== JSON.stringify(incoming) ? incoming : prev;
    });
  }, [data.maturityRatings]);

  // === DEBOUNCE SETUP ===
  const debounceRefs = useRef<Record<string, NodeJS.Timeout | null>>({});

  const debounceUpdate = (key: string, value: any, delay: number) => {
    if (debounceRefs.current[key]) clearTimeout(debounceRefs.current[key]);
    debounceRefs.current[key] = setTimeout(() => {
      updateData({ [key]: value });
      debounceRefs.current[key] = null;
    }, delay);
  };

  // === DEBOUNCED UPDATES ===
  useEffect(() => {
    debounceUpdate('commercialFocus', commercialFocus, 300);
  }, [commercialFocus]);

  useEffect(() => {
    if (JSON.stringify(localTopProducts) !== JSON.stringify(data.topProducts ?? [])) {
      debounceUpdate('topProducts', localTopProducts, 500);
    }
  }, [localTopProducts]);

  useEffect(() => {
    if (JSON.stringify(localLeadSources) !== JSON.stringify(data.leadSources ?? [])) {
      debounceUpdate('leadSources', localLeadSources, 500);
    }
  }, [localLeadSources]);

  useEffect(() => {
    if (JSON.stringify(localDistributionChannels) !== JSON.stringify(data.distributionChannels ?? [])) {
      debounceUpdate('distributionChannels', localDistributionChannels, 500);
    }
  }, [localDistributionChannels]);

  useEffect(() => {
    if (JSON.stringify(localSalesApproaches) !== JSON.stringify(data.salesApproaches ?? [])) {
      debounceUpdate('salesApproaches', localSalesApproaches, 500);
    }
  }, [localSalesApproaches]);

  // === IMMEDIATE UPDATE FOR MATURITY ===
  useEffect(() => {
    const current = localMaturityRatings;
    const parent = data.maturityRatings ?? {};
    if (JSON.stringify(current) !== JSON.stringify(parent)) {
      updateData({ maturityRatings: { ...current } });
    }
  }, [localMaturityRatings]);

  // === CLEANUP ===
  useEffect(() => {
    return () => {
      Object.values(debounceRefs.current).forEach(t => t && clearTimeout(t));
    };
  }, []);

  // === HANDLERS ===
  const handleCommercialFocusChange = (value: number) => {
    setCommercialFocus(value);
  };

  const handleProductChange = (product: string) => {
    setLocalTopProducts(prev =>
      prev.includes(product)
        ? prev.filter(p => p !== product)
        : prev.length < 4
        ? [...prev, product]
        : prev
    );
  };

  const handleLeadSourceChange = (source: string) => {
    setLocalLeadSources(prev =>
      prev.includes(source)
        ? prev.filter(s => s !== source)
        : prev.length < 3
        ? [...prev, source]
        : prev
    );
  };

  const handleDistributionChannelChange = (channel: string) => {
    setLocalDistributionChannels(prev =>
      prev.includes(channel)
        ? prev.filter(c => c !== channel)
        : prev.length < 2
        ? [...prev, channel]
        : prev
    );
  };

  const handleSalesApproachChange = (approach: string) => {
    setLocalSalesApproaches(prev =>
      prev.includes(approach)
        ? prev.filter(a => a !== approach)
        : prev.length < 2
        ? [...prev, approach]
        : prev
    );
  };

  // === MATURITY RATING HANDLER (INSTANT) ===
  const handleMaturityRating = (key: string, value: number) => {
    setLocalMaturityRatings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Business Operations and Performance</h2>
      <div className="space-y-6">

        {/* Question 12 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            12. Over the last 12 months, what percentage of your book would you consider commercially focused?
          </label>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 w-8">0</span>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={commercialFocus}
              onChange={(e) => handleCommercialFocusChange(Number(e.target.value))}
              className="flex-1 accent-blue-600"
            />
            <span className="text-xs text-gray-500 w-8 text-right">100</span>
            <span className="ml-4 text-blue-700 font-semibold">{commercialFocus}%</span>
          </div>
        </div>

        {/* Question 13 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            13. What are the top 4 products you offer to your clients?
          </label>
          <div className="flex flex-wrap gap-3">
            {products.map((product) => (
              <label key={product} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localTopProducts.includes(product)}
                  onChange={() => handleProductChange(product)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span>{product}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 14 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            14. What are your top 3 sources of leads? (Select up to 3)
          </label>
          <div className="flex flex-wrap gap-3">
            {leadSources.map((source) => (
              <label key={source} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localLeadSources.includes(source)}
                  onChange={() => handleLeadSourceChange(source)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span>{source}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 15 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            15. What are your main distribution channels? (Select up to 2)
          </label>
          <div className="flex flex-wrap gap-3">
            {distributionChannels.map((channel) => (
              <label key={channel} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localDistributionChannels.includes(channel)}
                  onChange={() => handleDistributionChannelChange(channel)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span>{channel}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 16 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            16. What are your main sales approaches? (Select up to 2)
          </label>
          <div className="flex flex-wrap gap-3">
            {salesApproaches.map((approach) => (
              <label key={approach} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localSalesApproaches.includes(approach)}
                  onChange={() => handleSalesApproachChange(approach)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span>{approach}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 17a–f: Maturity Ratings – FINAL PREMIUM DESIGN */}
        <div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl mb-8 border border-blue-100">
            <p className="text-sm text-gray-700 leading-relaxed font-medium space-y-1">
              <div>
                <strong className="text-blue-900">1 - Ad hoc (Level 1):</strong> No formal process — decisions are reactive, inconsistent, and undocumented. Success relies on individual heroics.
              </div>
              <div>
                <strong className="text-blue-900">2 - Repeatable (Level 2):</strong> Basic, consistent steps exist — often manual or spreadsheet-based — but not enforced or controlled.
              </div>
              <div>
                <strong className="text-blue-900">3 - Defined (Level 3):</strong> Processes are fully documented, standardized, and consistently followed across the entire team.
              </div>
              <div>
                <strong className="text-blue-900">4 - Measured (Level 4):</strong> Key performance metrics are tracked — processes are actively monitored, controlled, and improved using data.
              </div>
              <div>
                <strong className="text-blue-900">5 - Optimised (Level 5):</strong> Fully integrated, automated, end-to-end digital platform — continuously improved through analytics, feedback, and innovation.
              </div>
            </p>
          </div>

          <div className="space-y-8">
            {maturityAreas.map((area) => (
              <div
                key={area.key}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <p className="text-white font-semibold text-lg">{area.label}</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-5 gap-4">

                    {/* Level 1 — LABEL */}
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-semibold text-gray-600 mb-1">Level 1</span>
                      <button
                        onClick={() => handleMaturityRating(area.key, 1)}
                        className={`
                          w-full h-20 rounded-xl border-2 font-bold text-xl transition-all duration-200
                          ${localMaturityRatings[area.key] === 1
                            ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-lg ring-4 ring-blue-100'
                            : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-gray-400'
                          }
                        `}
                      >
                        1
                      </button>
                    </div>

                    {/* Level 2 */}
                    <button
                      onClick={() => handleMaturityRating(area.key, 2)}
                      className={`
                        w-full h-20 rounded-xl border-2 font-bold text-xl transition-all duration-200
                        ${localMaturityRatings[area.key] === 2
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-lg ring-4 ring-blue-100'
                          : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-gray-400'
                        }
                      `}
                    >
                      2
                    </button>

                    {/* Level 3 */}
                    <button
                      onClick={() => handleMaturityRating(area.key, 3)}
                      className={`
                        w-full h-20 rounded-xl border-2 font-bold text-xl transition-all duration-200
                        ${localMaturityRatings[area.key] === 3
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-lg ring-4 ring-blue-100'
                          : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-gray-400'
                        }
                      `}
                    >
                      3
                    </button>

                    {/* Level 4 */}
                    <button
                      onClick={() => handleMaturityRating(area.key, 4)}
                      className={`
                        w-full h-20 rounded-xl border-2 font-bold text-xl transition-all duration-200
                        ${localMaturityRatings[area.key] === 4
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-lg ring-4 ring-blue-100'
                          : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-gray-400'
                        }
                      `}
                    >
                      4
                    </button>

                    {/* Level 5 — LABEL */}
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-semibold text-gray-600 mb-1">Level 5</span>
                      <button
                        onClick={() => handleMaturityRating(area.key, 5)}
                        className={`
                          w-full h-20 rounded-xl border-2 font-bold text-xl transition-all duration-200
                          ${localMaturityRatings[area.key] === 5
                            ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-lg ring-4 ring-blue-100'
                            : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-gray-400'
                          }
                        `}
                      >
                        5
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
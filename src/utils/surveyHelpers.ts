export const getFactorLabelByKey = (key: string): string => {
  const factorList = [
    { key: 'flexibility', label: 'Flexibility Underwriting, Risk Pricing and access to Decision-Makers' },
    { key: 'businessGrowth', label: 'Business Growth Support' },
    { key: 'operationalEfficiency', label: 'Operational Efficiency' },
    { key: 'productQuality', label: 'Product Quality' },
    { key: 'bindersAndIncentives', label: "Binder's Fee and Incentives" },
    { key: 'brandAndMarket', label: 'Brand and Market Presence' },
  ];
  const factor = factorList.find(f => f.key === key);
  return factor ? factor.label : '';
};

const INSURER_SLOTS = 3;

export const getQ19Data = (data: any) => {
  const q19Payload: { [key: string]: any } = {};
  const categories = [
    { key: 'underwriting', label: 'Underwriting' },
    { key: 'documentation', label: 'Documentation' },
    { key: 'claims', label: 'Claims' },
    { key: 'postSale', label: 'Post Sale Service' },
    { key: 'relationship', label: 'Relationship' },
    { key: 'proportion', label: 'Proportion %' },
  ];

  const ratedInsurers = Object.keys(data.insurerRatings || {})
    .filter(insurer => {
      const ratings = data.insurerRatings[insurer] || {};
      return Object.keys(ratings).length > 0;
    })
    .slice(0, INSURER_SLOTS);

  for (let i = 0; i < INSURER_SLOTS; i++) {
    const slot = i + 1;
    const insurerName = ratedInsurers[i];

    q19Payload[`Q19 Insurer ${slot} Name`] = insurerName || '';

    if (insurerName) {
      const ratings = data.insurerRatings[insurerName] || {};
      categories.forEach(cat => {
        const value = ratings[cat.key] || 0;
        q19Payload[`Q19 Insurer ${slot}: ${cat.label}`] = value;
      });
    } else {
      categories.forEach(cat => {
        q19Payload[`Q19 Insurer ${slot}: ${cat.label}`] = 0;
      });
    }
  }
  return q19Payload;
};

const getProposalPrompt = (businessType, budget, event) => {
  return `You are an expert B2B consultant specializing in sustainable products and solutions. Generate a recommendation based on the client requirements.

Business Type: ${businessType}
Available Budget: $${budget}
Event/Purpose: ${event}

Return a JSON object with the following structure (no additional text, only JSON):
{
  "recommended_products": ["product1", "product2", "product3", "product4"],
  "budget_allocation": {
    "product1": 1000,
    "product2": 1500,
    "product3": 800,
    "product4": 700
  },
  "estimated_cost": 4000,
  "impact_summary": "Brief description of how these products will benefit the business and environment, including sustainability impact"
}

Ensure:
- recommended_products are 4 relevant sustainable products
- budget_allocation sums to the estimated_cost
- estimated_cost is reasonable and within the provided budget
- impact_summary is 2-3 sentences explaining business and environmental impact

Return ONLY valid JSON, nothing else.`;
};

module.exports = getProposalPrompt;

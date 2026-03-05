import React, { useState } from 'react';
import axios from 'axios';
import ResultCard from '../components/ResultCard';

const ProposalGenerator = () => {
  const [formData, setFormData] = useState({
    business_type: '',
    budget: '',
    event: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'budget' ? parseFloat(value) || '' : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post('/api/generate-proposal', formData);
      
      if (response.data.success) {
        setResult(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            💼 B2B Proposal Generator
          </h1>
          <p className="text-gray-600 mb-8">
            Generate customized sustainable business proposals based on your needs
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type
              </label>
              <input
                type="text"
                name="business_type"
                value={formData.business_type}
                onChange={handleChange}
                placeholder="e.g., Retail Store, Corporate Office, NGO"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget (USD)
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g., 5000"
                min="0"
                step="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event / Purpose
              </label>
              <input
                type="text"
                name="event"
                value={formData.event}
                onChange={handleChange}
                placeholder="e.g., Product Launch, Company Meeting, Sustainability Initiative"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate Proposal'}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">⚠️ Error</p>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
          )}

          {result && (
            <ResultCard title="Proposal Results" loading={false}>
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 font-medium mb-3">
                    Recommended Products
                  </p>
                  <ul className="space-y-2">
                    {result.recommended_products.map((product, index) => (
                      <li key={index} className="flex items-center text-blue-900">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 font-medium mb-3">
                    Budget Allocation
                  </p>
                  <div className="space-y-2">
                    {Object.entries(result.budget_allocation).map(
                      ([product, amount], index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-purple-900">{product}</span>
                          <span className="text-lg font-bold text-purple-700">
                            ${amount.toLocaleString()}
                          </span>
                        </div>
                      )
                    )}
                    <div className="border-t border-purple-200 pt-2 mt-3 flex justify-between items-center">
                      <span className="font-bold text-gray-800">Total Cost</span>
                      <span className="text-2xl font-bold text-purple-700">
                        ${result.estimated_cost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 font-medium mb-3">
                    Impact Summary
                  </p>
                  <p className="text-green-900 leading-relaxed">
                    {result.impact_summary}
                  </p>
                </div>
              </div>
            </ResultCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProposalGenerator;

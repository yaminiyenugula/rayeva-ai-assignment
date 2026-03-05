import React, { useState } from 'react';
import axios from 'axios';
import ResultCard from '../components/ResultCard';

const CategoryGenerator = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    description: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post('/api/generate-category', formData);
      
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏷️ Category & Tag Generator
          </h1>
          <p className="text-gray-600 mb-8">
            Automatically categorize and tag your eco-commerce products using AI
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                placeholder="e.g., Reusable Bamboo Toothbrush"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product in detail..."
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate Category'}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">⚠️ Error</p>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
          )}

          {result && (
            <ResultCard title="Generation Results" loading={false}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 font-medium">Primary Category</p>
                  <p className="text-xl font-bold text-blue-700 mt-1">
                    {result.primary_category}
                  </p>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 font-medium">Sub Category</p>
                  <p className="text-xl font-bold text-indigo-700 mt-1">
                    {result.sub_category}
                  </p>
                </div>

                <div className="md:col-span-2 bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 font-medium mb-3">SEO Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {result.seo_tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-green-200 text-green-900 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 bg-amber-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 font-medium mb-3">
                    Sustainability Filters
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.sustainability_filters.map((filter, index) => (
                      <span
                        key={index}
                        className="bg-amber-200 text-amber-900 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        🌱 {filter}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ResultCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryGenerator;

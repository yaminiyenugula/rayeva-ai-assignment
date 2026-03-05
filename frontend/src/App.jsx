import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CategoryGenerator from './pages/CategoryGenerator';
import ProposalGenerator from './pages/ProposalGenerator';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'category':
        return <CategoryGenerator />;
      case 'proposal':
        return <ProposalGenerator />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {renderPage()}
    </div>
  );
}

const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Rayeva AI
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            AI-Powered Solutions for Sustainable E-Commerce
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Harness the power of artificial intelligence to automate product categorization,
            generate intelligent B2B proposals, analyze environmental impact, and provide
            instant customer support through WhatsApp.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Category Generator Card */}
          <div
            onClick={() => setCurrentPage('category')}
            className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-8 cursor-pointer hover:shadow-2xl transform hover:scale-105 transition duration-300"
          >
            <div className="text-5xl mb-4">🏷️</div>
            <h2 className="text-3xl font-bold mb-3">Category & Tag Generator</h2>
            <p className="text-blue-100 mb-6">
              Automatically classify and tag your eco-commerce products using advanced AI
              analysis. Get structured JSON outputs with categories, subcategories, SEO tags,
              and sustainability filters.
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <span className="mr-2">✓</span> Smart product classification
              </p>
              <p className="flex items-center">
                <span className="mr-2">✓</span> SEO-optimized tags
              </p>
              <p className="flex items-center">
                <span className="mr-2">✓</span> Sustainability labels
              </p>
            </div>
            <button className="mt-6 bg-white text-blue-700 font-bold py-2 px-6 rounded-lg hover:bg-blue-50 transition">
              Get Started →
            </button>
          </div>

          {/* Proposal Generator Card */}
          <div
            onClick={() => setCurrentPage('proposal')}
            className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl p-8 cursor-pointer hover:shadow-2xl transform hover:scale-105 transition duration-300"
          >
            <div className="text-5xl mb-4">💼</div>
            <h2 className="text-3xl font-bold mb-3">B2B Proposal Generator</h2>
            <p className="text-emerald-100 mb-6">
              Generate comprehensive B2B proposals tailored to specific business needs and
              budgets. Get product recommendations, budget allocations, cost estimates, and
              sustainability impact summaries.
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <span className="mr-2">✓</span> Custom product recommendations
              </p>
              <p className="flex items-center">
                <span className="mr-2">✓</span> Smart budget allocation
              </p>
              <p className="flex items-center">
                <span className="mr-2">✓</span> Impact analysis
              </p>
            </div>
            <button className="mt-6 bg-white text-emerald-700 font-bold py-2 px-6 rounded-lg hover:bg-emerald-50 transition">
              Get Started →
            </button>
          </div>
        </div>

        {/* Future Modules Section */}
        <div className="bg-slate-700 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-8">📋 Architecture for Future Modules</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-yellow-400 pl-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-3">
                📊 AI Impact Reporting Generator
              </h3>
              <p className="text-gray-300">
                Generate comprehensive environmental impact reports analyzing carbon
                footprint, waste reduction, and sustainability metrics across your
                product portfolio.
              </p>
            </div>
            <div className="border-l-4 border-cyan-400 pl-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">
                💬 AI WhatsApp Support Bot
              </h3>
              <p className="text-gray-300">
                Intelligent customer support bot integrated with WhatsApp for instant
                product queries, order tracking, sustainability tips, and eco-friendly
                product recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">🛠️ Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'React', icon: '⚛️' },
              { name: 'Node.js', icon: '🟢' },
              { name: 'MongoDB', icon: '🛢️' },
              { name: 'OpenAI API', icon: '🤖' },
              { name: 'Tailwind CSS', icon: '🎨' },
              { name: 'Express', icon: '⚡' },
              { name: 'Mongoose', icon: '🔗' },
              { name: 'Vite', icon: '⚙️' },
            ].map((tech, index) => (
              <div key={index} className="bg-slate-700 p-4 rounded-lg">
                <div className="text-3xl mb-2">{tech.icon}</div>
                <p className="text-gray-300">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

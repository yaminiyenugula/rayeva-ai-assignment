import React from 'react';

const ResultCard = ({ title, children, loading = false }) => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6 fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default ResultCard;

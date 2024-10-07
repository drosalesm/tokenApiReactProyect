// components/ViewTokenModal.js
import React from 'react';

const ViewTokenModal = ({ isOpen, onClose, tokenData }) => {
  if (!isOpen) return null;

  const { generalResponse, information } = tokenData;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Token Details</h2>
        {tokenData ? (
          <div>
            <p><strong>ID:</strong> {information.id}</p>
            <p><strong>Numero Serie:</strong> {information.numero_serie || 'N/A'}</p>
            {/* Add more fields if needed */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button 
          onClick={onClose} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewTokenModal;

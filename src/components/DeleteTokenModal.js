import React, { useState } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';

const DeleteTokenModal = ({ isOpen, onClose, tokenId, onSuccess,userId }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleDelete = () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    axios
      .delete(`http://127.0.0.1:8000/api/tokens/${tokenId}/consumidor/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage('Token eliminado exitosamente.');
          onSuccess(tokenId); // Notify parent to remove the token from the list
          onClose(); // Close the modal
        }
      })
      .catch((error) => {
        setErrorMessage('Error al eliminar el token. Por favor, intente nuevamente.');
        console.error('Error deleting token:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Confirmar Eliminación</h2>
        <p>¿Estás seguro de que quieres eliminar este token?</p>
        
        {/* Display Loading Spinner */}
        {loading && <div className="text-center text-blue-500 mb-4">Eliminando...</div>}
        
        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">
            <FaTimes className="inline mr-2" /> {errorMessage}
          </div>
        )}
        
        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">
            <FaCheck className="inline mr-2" /> {successMessage}
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
            onClick={handleDelete}
            disabled={loading} // Disable button while deleting
          >
            <FaTimes className="inline mr-2" /> Eliminar
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onClose}
            disabled={loading} // Disable button while deleting
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTokenModal;

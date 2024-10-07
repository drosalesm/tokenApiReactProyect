import React from 'react';
import PropTypes from 'prop-types';

const DeleteGerenciasModal = ({ isOpen, onClose, onConfirm, gerencia }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Eliminar Gerencia</h2>
                <p className="mb-4">¿Está seguro de que desea eliminar la gerencia "{gerencia?.nombre}"?</p>
                <div className="flex justify-end">
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                        Eliminar
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded ml-2 hover:bg-gray-600"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

DeleteGerenciasModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    gerencia: PropTypes.object.isRequired,
};

export default DeleteGerenciasModal;

// components/DeleteModal.js
import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Confirmar Eliminación</h2>
                <p>¿Está seguro de que desea eliminar el usuario?</p>
                <div className="mt-6 flex justify-end">
                    <button
                        className="bg-gray-500 text-white py-2 px-4 rounded mr-4 hover:bg-gray-600"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        onClick={onConfirm}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;

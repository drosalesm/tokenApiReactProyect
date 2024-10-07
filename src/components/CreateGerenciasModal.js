import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const CreateGerenciasModal = ({ isOpen, onClose, userId, onSuccess }) => {
    const [formData, setFormData] = useState({
        nombre: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        if (!formData.nombre) {
            setError('El nombre de la gerencia es obligatorio.');
            return;
        }

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/gerencias/consumer/${userId}`,
                {
                    nombre: formData.nombre
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                setError('');
                onSuccess(); // Optionally refresh the data or close modal
                setFormData({ nombre: '' }); // Clear the form after success

            } else {
                setError('Error al crear la gerencia. Por favor, intente de nuevo.');
            }
        } catch (err) {
            setError(`Error al crear la gerencia: ${err.message}`);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Crear Gerencia</h2>

                {error && <div className="text-red-600 mb-4">{error}</div>}

                <div className="mb-4 flex items-center">
                    <label className="block text-gray-700 w-1/3">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="border rounded w-2/3 px-3 py-2"
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Crear
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

CreateGerenciasModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
    onSuccess: PropTypes.func.isRequired
};

export default CreateGerenciasModal;

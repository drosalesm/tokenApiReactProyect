import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const UpdateGerenciasModal = ({ isOpen, onClose, gerencia, onSuccess,userId }) => {
    const [formData, setFormData] = useState({
        nombre: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (gerencia) {
            setFormData({ nombre: gerencia.nombre });
        }
    }, [gerencia]);

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
            const response = await axios.put(
                `http://127.0.0.1:8000/api/gerencias/${gerencia.id}/consumer/${userId}`, // Assuming userId is part of gerencia object
                {
                    nombre: formData.nombre
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                setError('');
                onSuccess(response.data);  // Pass the updated gerencia to the parent                
            } else {
                setError('Error al actualizar la gerencia. Por favor, intente de nuevo.');
            }
        } catch (err) {
            setError(`Error al actualizar la gerencia: ${err.message}`);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Actualizar Gerencia</h2>

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
                        Actualizar
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

UpdateGerenciasModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    gerencia: PropTypes.object, // Pass the gerencia object to the modal
    onSuccess: PropTypes.func.isRequired
};

export default UpdateGerenciasModal;

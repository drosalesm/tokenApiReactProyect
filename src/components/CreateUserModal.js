import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const CreateUserModal = ({ isOpen, onClose, onSubmit,userId   }) => {
    const [formData, setFormData] = useState({
        usuario: '',
        password: '',
        nombres: '',
        apellidos: '',
        telefono: '',
        gerencia_id: '',
        role_id: '',
        pais_id: '',
    });

    const [gerencias, setGerencias] = useState([]);
    const [roles, setRoles] = useState([]);
    const [paises, setPaises] = useState([]);

    useEffect(() => {
        if (isOpen) {
            // Fetch gerencias
            const fetchGerencias = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/gerencias/consumidor/${userId}`);
                    setGerencias(response.data.information);
                } catch (error) {
                    console.error('Error fetching gerencias:', error);
                }
            };

            // Fetch roles
            const fetchRoles = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/roles/consumidor/${userId}`);
                    setRoles(response.data.information);
                } catch (error) {
                    console.error('Error fetching roles:', error);
                }
            };

            // Fetch paises
            const fetchPaises = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/paises/consumidor/${userId}`);
                    setPaises(response.data.information);
                } catch (error) {
                    console.error('Error fetching paises:', error);
                }
            };

            fetchGerencias();
            fetchRoles();
            fetchPaises();
        }

        // Reset form data when modal is closed
        if (!isOpen) {
            setFormData({
                usuario: '',
                password: '',
                nombres: '',
                apellidos: '',
                telefono: '',
                gerencia_id: '',
                role_id: '',
                pais_id: '',
            });
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        if (Object.values(formData).some(value => !value)) {
            alert('Se deben llenar todos los campos.');
            return;
        }
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Crear Usuario</h2>

                <div className="mb-4 flex items-center">
                    <label className="block text-gray-700 w-1/3">Usuario</label>
                    <input
                        type="text"
                        name="usuario"
                        value={formData.usuario}
                        onChange={handleChange}
                        className="border rounded w-2/3 px-3 py-2"
                        required
                    />
                </div>

                <div className="mb-4 flex items-center">
                    <label className="block text-gray-700 w-1/3">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border rounded w-2/3 px-3 py-2"
                        required
                    />
                </div>

                <div className="mb-4 flex items-center">
                    <label className="block text-gray-700 w-1/3">Nombres</label>
                    <input
                        type="text"
                        name="nombres"
                        value={formData.nombres}
                        onChange={handleChange}
                        className="border rounded w-2/3 px-3 py-2"
                        required
                    />
                </div>

                <div className="mb-4 flex items-center">
                    <label className="block text-gray-700 w-1/3">Apellidos</label>
                    <input
                        type="text"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                        className="border rounded w-2/3 px-3 py-2"
                        required
                    />
                </div>

                <div className="mb-4 flex items-center">
                    <label className="block text-gray-700 w-1/3">Telefono</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="border rounded w-2/3 px-3 py-2"
                        required
                    />
                </div>

                <div className="mb-4 flex items-center">
                    <label className="block text-gray-700 w-1/3">Gerencia</label>
                    <select
                        name="gerencia_id"
                        value={formData.gerencia_id}
                        onChange={handleChange}
                        className="border rounded w-2/3 px-3 py-2"
                        required
                    >
                        <option value="">Seleccionar Gerencia</option>
                        {(gerencias || []).map(gerencia => (
                            <option key={gerencia.id} value={gerencia.id}>
                                {gerencia.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4 flex items-center">
                    <label className="block text-gray-700 w-1/3">Rol</label>
                    <select
                        name="role_id"
                        value={formData.role_id}
                        onChange={handleChange}
                        className="border rounded w-2/3 px-3 py-2"
                        required
                    >
                        <option value="">Seleccionar Rol</option>
                        {(roles || []).map(role => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4 flex items-center">
                    <label className="block text-gray-700 w-1/3">País</label>
                    <select
                        name="pais_id"
                        value={formData.pais_id}
                        onChange={handleChange}
                        className="border rounded w-2/3 px-3 py-2"
                        required
                    >
                        <option value="">Seleccionar País</option>
                        {(paises || []).map(pais => (
                            <option key={pais.id} value={pais.id}>
                                {pais.nombre}
                            </option>
                        ))}
                    </select>
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

CreateUserModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default CreateUserModal;

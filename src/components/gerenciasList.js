import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import UpdateGerenciasModal from './UpdateGerenciasModal';
import CreateGerenciasModal from './CreateGerenciasModal';

import DeleteGerenciasModal from './DeleteGerenciasModal';

const GerenciasList = () => {
    const [users, setUsers] = useState([]);
    const { user } = useContext(AuthContext);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isCreateGerenciasModalOpen, setIsCreateGerenciasModalOpen] = useState(false);
    const [selectedGerencia, setSelectedGerencia] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchGerencias = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/gerencias/consumidor/${user.userId}`);
                if (response.data && Array.isArray(response.data.information)) {
                    setUsers(response.data.information);
                } else {
                    console.error('API response does not contain an array of users:', response.data);
                    setUsers([]);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUsers([]);
            }
        };

        fetchGerencias();
    }, [user.userId]);

    const handleDeleteGerencia = async () => {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/api/gerencias/${selectedGerencia.id}/consumer/${user.userId}`
            );

            if (response.status === 200) {
                setSuccess(`Gerencia ${selectedGerencia.nombre} eliminada exitosamente.`);
                setUsers(users.filter((u) => u.id !== selectedGerencia.id));
            } else {
                setError('Error al eliminar la gerencia. Por favor, intente de nuevo.');
            }
        } catch (error) {
            setError('Error al eliminar la gerencia. Por favor, intente de nuevo.');
        }
        setIsDeleteModalOpen(false);
    };

    const openUpdateModal = (gerencia) => {
        setSelectedGerencia(gerencia);
        setIsUpdateModalOpen(true);
        setError('');
        setSuccess('');
    };

    const openDeleteModal = (gerencia) => {
        setSelectedGerencia(gerencia);
        setIsDeleteModalOpen(true);
        setError('');
        setSuccess('');
    };

 //   const handleSuccess = () => {
 //       setIsCreateGerenciasModalOpen(false);
 //       setIsUpdateModalOpen(false);
 //       window.location.reload(); // Reload data after success
        
//    };



    const handleSuccess = async () => {
        try {
            // Fetch the updated list of gerencias after creating a new record
            const response = await axios.get(`http://127.0.0.1:8000/api/gerencias/consumidor/${user.userId}`);
            if (response.data && Array.isArray(response.data.information)) {
                setUsers(response.data.information); // Update the users state with the new list of gerencias
                setSuccess('Gerencia creada exitosamente.');
            } else {
                console.error('API response does not contain an array of gerencias:', response.data);
                setUsers([]); // In case of an invalid response, reset the list
            }
        } catch (error) {
            console.error('Error fetching updated gerencias:', error);
            setError('Error al obtener la lista actualizada de gerencias.');
        } finally {
            setIsCreateGerenciasModalOpen(false); // Close the modal after success
        }
    };
    



    const handleSuccessUpdate = async (updatedGerencia) => {


        try {
            // Fetch the updated list of gerencias
            const response = await axios.get(`http://127.0.0.1:8000/api/gerencias/consumidor/${user.userId}`);
            if (response.data && Array.isArray(response.data.information)) {
                setUsers(response.data.information); // Update state with fresh data
                setSuccess(`Gerencia actualizada exitosamente.`);

            } else {
                console.error('API response does not contain an array of gerencias:', response.data);
            }
        } catch (error) {
            console.error('Error fetching gerencias:', error);
        } finally {
            setIsUpdateModalOpen(false);
            setIsCreateGerenciasModalOpen(false);
        }
    };

    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess('');
                setError('');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Mantenimiento de Gerencias</h2>

            <div className="flex justify-center mb-4">
                {user.userRole === 1 && (
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center"
                        onClick={() => setIsCreateGerenciasModalOpen(true)}
                    >
                        <FaPlus className="mr-2" />
                        Crear Gerencia
                    </button>
                )}
            </div>

            {success && <div className="text-green-600 mb-4">{success}</div>}
            {error && <div className="text-red-600 mb-4">{error}</div>}

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-6 py-3 text-center text-gray-600">ID</th>
                        <th className="border border-gray-300 px-6 py-3 text-center text-gray-600">Nombre</th>
                        {user.userRole === 1 && (
                            <>
                                <th className="border border-gray-300 px-6 py-3 text-center text-gray-600">
                                    <div className="flex items-center justify-center">
                                        <FaEdit className="mr-1" /> Actualizar
                                    </div>
                                </th>
                                <th className="border border-gray-300 px-6 py-3 text-center text-gray-600">
                                    <div className="flex items-center justify-center">
                                        <FaTrash className="mr-1" /> Eliminar
                                    </div>
                                </th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((gerencia) => (
                            <tr key={gerencia.id}>
                                <td className="border border-gray-300 px-6 py-3 text-center">{gerencia.id}</td>
                                <td className="border border-gray-300 px-6 py-3 text-center">{gerencia.nombre}</td>

                                {user.userRole === 1 && (
                                    <>
                                        <td className="border border-gray-300 px-6 py-3 text-center">
                                            <FaEdit
                                                className="text-green-500 cursor-pointer hover:text-green-600 text-center"
                                                onClick={() => openUpdateModal(gerencia)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 px-6 py-3 text-center">
                                            <FaTrash
                                                className="text-red-500 cursor-pointer hover:text-red-600"
                                                onClick={() => openDeleteModal(gerencia)}
                                            />
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4">No se encontraron gerencias</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <UpdateGerenciasModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                gerencia={selectedGerencia}
                userId={user.userId}
                onSuccess={handleSuccessUpdate}
            />

            <CreateGerenciasModal
                isOpen={isCreateGerenciasModalOpen}
                onClose={() => setIsCreateGerenciasModalOpen(false)}
                userId={user.userId}
                onSuccess={handleSuccess}
            />

            <DeleteGerenciasModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteGerencia} // Pass the delete function
                gerencia={selectedGerencia}
            />
        </div>
    );
};

export default GerenciasList;

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import DeleteModal from './DeleteUsersModal';
import UpdateModal from './UpdateUsersModal';
import CreateUserModal from './CreateUserModal';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [gerencias, setGerencias] = useState([]);
    const { user } = useContext(AuthContext);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/usuarios/consumidor/${user.userId}`);
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

        const fetchRoles = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/roles/consumidor/${user.userId}`);
                if (response.data && Array.isArray(response.data)) {
                    setRoles(response.data);
                }
            } catch (error) {
                console.error('Error fetching roles data:', error);
            }
        };

        const fetchGerencias = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/gerencias/consumidor/${user.userId}`);
                if (response.data && Array.isArray(response.data)) {
                    setGerencias(response.data);
                }
            } catch (error) {
                console.error('Error fetching gerencias data:', error);
            }
        };

        fetchUsers();
        fetchRoles();
        fetchGerencias();
    }, [user.userId]);

    const handleDeleteUser = async () => {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/api/usuarios/${selectedUser.id}/consumidor/${user.userId}`
            );
            
            if (response.status === 200) {
                setSuccess(`Usuario ${selectedUser.usuario} eliminado exitosamente.`);
                setUsers(users.filter(u => u.id !== selectedUser.id));
            } else {
                setError('Error al eliminar el usuario. Por favor, intente de nuevo.');
            }
        } catch (error) {
            setError('Error al eliminar el usuario. Por favor, intente de nuevo.');
        }

        setIsDeleteModalOpen(false);
    };

    const handleCreateUser = async (newUserData) => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/usuarios/consumidor/${user.userId}`,
                newUserData
            );
            
            if (response.status === 200) {
                setSuccess('Usuario creado exitosamente.');
                // Reload the page to fetch updated user list
                window.location.reload();
            } else {
                setError('Error al crear el usuario. Por favor, intente de nuevo.');
            }
        } catch (error) {
            setError('Error al crear el usuario. Por favor, intente de nuevo.');
        }

        setIsCreateUserModalOpen(false);
    };

    const openUpdateModal = (userItem) => {
        setSelectedUser(userItem);
        setIsUpdateModalOpen(true);
        setError('');
        setSuccess('');
    };

    const openDeleteModal = (userItem) => {
        setSelectedUser(userItem);
        setIsDeleteModalOpen(true);
        setError('');
        setSuccess('');
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
            <h2 className="text-2xl font-semibold mb-4">Usuarios</h2>

            <div className="flex justify-center mb-4">
                {user.userRole === 1 && (
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center"
                        onClick={() => setIsCreateUserModalOpen(true)}
                    >
                        <FaPlus className="mr-2" />
                        Crear Usuario
                    </button>
                )}
            </div>

            {success && <div className="text-green-600 mb-4">{success}</div>}
            {error && <div className="text-red-600 mb-4">{error}</div>}

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border-b px-6 py-3 text-center text-gray-600">ID</th>
                        <th className="border-b px-6 py-3 text-center text-gray-600">Usuario</th>
                        <th className="border-b px-6 py-3 text-center text-gray-600">Nombres</th>
                        <th className="border-b px-6 py-3 text-center text-gray-600">Apellidos</th>
                        <th className="border-b px-6 py-3 text-center text-gray-600">Telefono</th>
                        <th className="border-b px-6 py-3 text-center text-gray-600">Rol</th>
                        <th className="border-b px-6 py-3 text-center text-gray-600">Gerencia</th>                        
                        {user.userRole === 1 && (
                            <>
                                <th className="border-b px-6 py-3 text-center text-gray-600">Actualizar</th>
                                <th className="border-b px-6 py-3 text-center text-gray-600">Eliminar</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((userItem) => (
                            <tr key={userItem.id}>
                                <td className="border-b px-6 py-3 text-center">{userItem.id}</td>
                                <td className="border-b px-6 py-3 text-center">{userItem.usuario}</td>
                                <td className="border-b px-6 py-3 text-center">{userItem.nombres}</td>
                                <td className="border-b px-6 py-3 text-center">{userItem.apellidos}</td>
                                <td className="border-b px-6 py-3 text-center">{userItem.telefono}</td>
                                <td className="border-b px-6 py-3 text-center">
                                    {userItem.role ? userItem.role.name : 'N/A'}
                                </td>
                                <td className="border-b px-6 py-3 text-center">
                                    {userItem.gerencia ? userItem.gerencia.nombre : 'N/A'}
                                </td>

                                {user.userRole === 1 && (
                                    <>
                                        <td className="border-b px-6 py-3 text-center">
                                            <FaEdit
                                                className="text-green-500 cursor-pointer hover:text-green-600"
                                                onClick={() => openUpdateModal(userItem)}
                                            />
                                        </td>
                                        <td className="border-b px-6 py-3 text-center">
                                            <FaTrash
                                                className="text-red-500 cursor-pointer hover:text-red-600"
                                                onClick={() => openDeleteModal(userItem)}
                                            />
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={user.userRole === 1 ? 8 : 6} className="border-b px-6 py-3 text-center">
                                No users found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteUser}
            />
            <UpdateModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                onSubmit={async (updatedData) => {
                    // PUT request logic for updating a user
                    try {
                        const response = await axios.put(
                            `http://127.0.0.1:8000/api/usuarios/${selectedUser.id}`,
                            updatedData
                        );

                        if (response.status === 200) {
                            setSuccess('Usuario actualizado exitosamente.');
                            setUsers(users.map(u => u.id === selectedUser.id ? response.data : u));
                        } else {
                            setError('Error al actualizar el usuario. Por favor, intente de nuevo.');
                        }
                    } catch (error) {
                        setError('Error al actualizar el usuario. Por favor, intente de nuevo.');
                    }

                    setIsUpdateModalOpen(false);
                }}
                currentUser={selectedUser}
                userId={user.userId}
            />

            <CreateUserModal
                isOpen={isCreateUserModalOpen}
                onClose={() => setIsCreateUserModalOpen(false)}
                onSubmit={handleCreateUser}
                roles={roles}
                gerencias={gerencias}
                userId={user.userId}
            />
        </div>
    );
};

export default UserList;

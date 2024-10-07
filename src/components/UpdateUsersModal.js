import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';

const UpdateModal = ({ isOpen, onClose, onSubmit, currentUser, userId}) => {
  const [usuario, setUsuario] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [role, setRole] = useState('');
  const [gerencia, setGerencia] = useState('');
  const [roles, setRoles] = useState([]);
  const [gerencias, setGerencias] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    if (isOpen) {
      // Fetch roles
      axios.get(`http://127.0.0.1:8000/api/roles/consumidor/${userId}`)
        .then(response => setRoles(response.data.information))
        .catch(error => console.error('Error fetching roles:', error));

      // Fetch gerencias
      axios.get(`http://127.0.0.1:8000/api/gerencias/consumidor/${userId}`)
        .then(response => setGerencias(response.data.information))
        .catch(error => console.error('Error fetching gerencias:', error));
      
      // Initialize fields if currentUser is provided
      if (currentUser) {
        setUsuario(currentUser.usuario || '');
        setNombres(currentUser.nombres || '');
        setApellidos(currentUser.apellidos || '');
        setTelefono(currentUser.telefono || '');
        setRole(currentUser.role ? currentUser.role.id : '');
        setGerencia(currentUser.gerencia ? currentUser.gerencia.id : '');
      }
    }
  }, [isOpen, currentUser]);

  const handleSubmit = () => {
    if (!currentUser) return; // Prevent submission if currentUser is not defined

    axios.put(`http://127.0.0.1:8000/api/usuarios/${currentUser.id}`, {
      usuario,
      nombres,
      apellidos,
      telefono,
      role_id: role,
      gerencia_id: gerencia
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 200) {
        setSuccessMessage('Usuario actualizado exitosamente');
        setTimeout(() => {
          setSuccessMessage('');
          onSubmit(); // Notify parent component
          onClose();
          window.location.reload(); // Reload the page after the modal closes          
        }, 2000);
      }
    })
    .catch(error => {
      setError('Error al actualizar el usuario');
      console.error('Error updating user:', error);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Actualizar Usuario</h2>

        {successMessage && (
          <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">
            <FaCheck className="inline mr-2" /> {successMessage}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">
            <FaTimes className="inline mr-2" /> {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-2">Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Nombres</label>
          <input
            type="text"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Apellidos</label>
          <input
            type="text"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Telefono</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Rol</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Selecciona un rol</option>
            {roles.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Gerencia</label>
          <select
            value={gerencia}
            onChange={(e) => setGerencia(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Selecciona una gerencia</option>
            {gerencias.map(g => (
              <option key={g.id} value={g.id}>{g.nombre}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
            onClick={handleSubmit}
          >
            Actualizar Usuario
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;

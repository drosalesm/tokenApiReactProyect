import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';

const UpdateTokenModal = ({ token, onClose,userId }) => {
  const [estado, setEstado] = useState(token ? token.estado : true);
  const [tipoToken, setTipoToken] = useState(token ? token.tipo_token : 'String');
  const [serieTokenId, setSerieTokenId] = useState(token ? token.serie_token_id : '');
  const [usuarioId, setUsuarioId] = useState(token ? token.usuario_id : '');
  const [usuarios, setUsuarios] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

console.log('Viendo el usuario en actualizar:',userId)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/usuarios/consumidor/${userId}`)

      .then(response => {
        setUsuarios(response.data.information);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleSubmit = () => {
    axios.put(`http://127.0.0.1:8000/api/tokens/${token.id}/consumidor/${userId}`, {
      estado: estado,
      tipo_token: tipoToken,
      serie_token_id: serieTokenId,
      usuario_id: usuarioId
    })
    .then(response => {
      if (response.status === 200) {
        setSuccessMessage('Token actualizado exitosamente');
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
          window.location.reload(); // Reload the page after the modal closes
        }, 2000);
      }
    })
    .catch(error => {
      setError('Error al actualizar el token');
      console.error('Error updating token:', error);
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Actualizar Token</h2>

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
          <label className="block mb-2">Serie</label>
          <input
            type="text"
            value={serieTokenId}
            onChange={(e) => setSerieTokenId(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Estado</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value === 'true')}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value={true}>Asignado</option>
            <option value={false}>Disponible</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Tipo Token</label>
          <select
            value={tipoToken}
            onChange={(e) => setTipoToken(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="Fisico">Fisico</option>
            <option value="Virtual">Virtual</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Usuario</label>
          <select
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Selecciona un usuario</option>
            {usuarios.map(user => (
              <option key={user.id} value={user.id}>{user.usuario}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
            onClick={handleSubmit}
          >
            Actualizar Token
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

export default UpdateTokenModal;

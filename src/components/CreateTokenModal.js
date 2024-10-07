import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';

const UpdateModal = ({ token, onClose, userId }) => {
  const [numeroSerie, setNumeroSerie] = useState(token ? token.numero_serie : '');
  const [estado, setEstado] = useState(token ? token.estado : true);
  const [tipoToken, setTipoToken] = useState(token ? token.tipo_token : 'String');
  const [usuarioId, setUsuarioId] = useState(token ? token.usuario_id : '');
  const [serie, setSerie] = useState(token ? token.serie : ''); // New state for Serie
  const [usuarios, setUsuarios] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [tokenError, setTokenError] = useState(false); // New state for Token field error
  const [usuarioError, setUsuarioError] = useState(false); // New state for Usuario field error
  const [serieError, setSerieError] = useState(false); // New state for Serie field error

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/usuarios/consumidor/${userId}`)
      .then(response => {
        setUsuarios(response.data.information);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [userId]);

  const handleSubmit = () => {
    setError('');
    setTokenError(false); // Reset token error
    setUsuarioError(false); // Reset usuario error
    setSerieError(false); // Reset serie error

    // Validate Token, Usuario, and Serie fields
    if (!numeroSerie) {
      setTokenError(true); // Set token field error if empty
      return;
    }

    if (!usuarioId) {
      setUsuarioError(true); // Set usuario field error if no user selected
      return;
    }

    if (!serie) {
      setSerieError(true); // Set serie field error if empty
      return;
    }

    axios.post(`http://127.0.0.1:8000/api/tokens/consumidor/${userId}`, {
      numero_serie: numeroSerie,
      estado: estado,
      tipo_token: tipoToken,
      usuario_id: usuarioId,
      serie_token_id: serie // Include serie in the request payload
    })
    .then(response => {
      if (response.status === 200) {
        setSuccessMessage('Token creado exitosamente');
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
          window.location.reload(); // Reload the page after the modal closes
        }, 2000);
      }
    })
    .catch(error => {
      setError('Error al crear el token. Por favor, intente nuevamente.'); // Set error message on failure
      console.error('Error creating token:', error);
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">{token ? 'Actualizar Token' : 'Crear Nuevo Token'}</h2>

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
          <label className="block mb-2">Token <span className="text-red-600">*</span></label>
          <input
            type="text"
            value={numeroSerie}
            onChange={(e) => setNumeroSerie(e.target.value)}
            className={`w-full border p-2 rounded ${tokenError ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {tokenError && (
            <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Serie <span className="text-red-600">*</span></label> {/* Added Serie field */}
          <input
            type="text"
            value={serie}
            onChange={(e) => setSerie(e.target.value)}
            className={`w-full border p-2 rounded ${serieError ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {serieError && (
            <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>
          )}
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
          <label className="block mb-2">Usuario <span className="text-red-600">*</span></label>
          <select
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
            className={`w-full border p-2 rounded ${usuarioError ? 'border-red-500' : 'border-gray-300'}`}
            required
          >
            <option value="">Selecciona un usuario</option>
            {usuarios.map(user => (
              <option key={user.id} value={user.id}>{user.usuario}</option>
            ))}
          </select>
          {usuarioError && (
            <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
            onClick={handleSubmit}
          >
            {token ? 'Actualizar Token' : 'Crear Token'}
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

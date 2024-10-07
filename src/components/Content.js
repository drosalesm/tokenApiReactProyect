import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { FaDownload,FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import UpdateModal from '../components/updateModal';
import CreateTokenModal from '../components/CreateTokenModal'; // Import the CreateTokenModal component
import DeleteTokenModal from '../components/DeleteTokenModal'; // Import DeleteTokenModal component
import ViewTokenModal from '../components/ViewTokenModal'; // Import the ViewTokenModal component


import { AuthContext } from '../context/AuthContext'; // Adjust the path according to your project structure



const Content = ({ data, userRole }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Manage Create Token Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Manage Delete Token Modal
  const [tokenIdToDelete, setTokenIdToDelete] = useState(null); // Track which token to delete

  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // Manage View Token Modal
  const [viewTokenData, setViewTokenData] = useState(null); // Store token data for the ViewTokenModal
  


  const { user } = useContext(AuthContext); // Get user and logout from AuthContext

  console.log('El usuario logeado es: ',user.userId)

  useEffect(() => {
    if (!data) {
      axios.get(`http://127.0.0.1:8000/api/tokens/consumidor/${user.userId}`)
        .then(response => {
          setApiData(response.data.information); // Adjust based on the actual response structure
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data && !apiData) {
    return <div>Error loading data</div>;
  }














// ----------------------------------------------------------------------------------


const handleDownloadListadoTokensCSV = () => {
  const listadoTokens = apiData || [];

  // Create CSV headers for Listado Tokens
  const csvHeadersListado = [
    'ID', 'Token', 'Serie', 'Estado', 'Tipo Token', 'Usuario'
  ].join(',') + '\n';

  // Map through Listado Tokens data
  const listadoRows = listadoTokens.map(item => [
    item.id || '',
    item.numero_serie || '',
    item.serie_token_id || '',
    item.estado ? 'Asignado' : 'Disponible',
    item.tipo_token || '',
    item.usuario ? item.usuario.usuario : 'N/A'
  ].join(',')).join('\n');

  // Combine the headers and rows
  const csvContent = 'Listado Tokens\n' + csvHeadersListado + listadoRows;

  // Create a link to download the CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'listado_tokens.csv');

  // Append link to the body and trigger the download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleDownloadResumenDetalleCSV = () => {
  const resumen = data?.information?.resumen || [];
  const detalle = data?.information?.detalle || [];

  // Create CSV headers for Resumen and Detalle
  const csvHeadersResumen = [
    'Conteo Tokens', 'Estado', 'Gerencia / CC'
  ].join(',') + '\n';

  const csvHeadersDetalle = [
    'ID', 'Token', 'Serie', 'Estado', 'Tipo Token', 'Usuario Asignado', 'Gerencia'
  ].join(',') + '\n';

  // Map through Resumen data
  const resumenRows = resumen.map(item => [
    item.conteo_tokens || '',
    item.estado === 1 ? 'Asignado' : 'Disponible',
    item.gerencia || 'N/A'
  ].join(',')).join('\n');

  // Map through Detalle data
  const detalleRows = detalle.map(item => [
    item.id || '',
    item.numero_serie || '',
    item.serie_token || '',
    item.estado === 1 ? 'Asignado' : 'Disponible',
    item.tipo_token || '',
    item.usuario_asignado || 'N/A',
    item.gerencia || 'N/A'
  ].join(',')).join('\n');

  // Combine the headers and rows
  const csvContent = 
    'Resumen\n' + csvHeadersResumen + resumenRows + '\n\n' +
    'Detalle\n' + csvHeadersDetalle + detalleRows;

  // Create a link to download the CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'resumen_detalle.csv');

  // Append link to the body and trigger the download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};



// ----------------------------------------------------------------------------------





  const handleViewClick = (id) => {
    axios.get(`http://127.0.0.1:8000/api/tokens/${id}/consumidor/${user.userId}`)
      .then(response => {
        setViewTokenData(response.data); 
        setIsViewModalOpen(true); 
      })
      .catch(error => {
        console.error('Error fetching token details:', error);
      });
  };

  const handleDeleteClick = (id) => {
    setTokenIdToDelete(id); // Set the token ID for deletion
    setIsDeleteModalOpen(true); // Open the delete modal
  };

  const handleDeleteSuccess = (id) => {
    setApiData((prevData) => prevData.filter((token) => token.id !== id)); // Remove the deleted token
  };

  const handleEditClick = (token) => {
    setSelectedToken(token);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedToken(null);
  };

  if (!data) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Listado de Tokens</h2>
        <div className="flex justify-end mb-4">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setIsCreateModalOpen(true)} // Open Create Token Modal
          >
            <FaPlus className="inline mr-2" /> Crear Nuevo Token
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Token</th>
              <th className="py-2 px-4 border-b">Serie</th>              
              <th className="py-2 px-4 border-b">Estado</th>
              <th className="py-2 px-4 border-b">Tipo Token</th>
              <th className="py-2 px-4 border-b">Usuario</th>
              {userRole === 1 && (
                <>
                 <th className="py-2 px-4 border-b">Ver</th>

                  <th className="py-2 px-4 border-b">Actualizar</th>
                  <th className="py-2 px-4 border-b">Borrar</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {apiData.map(item => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{item.id}</td>
                <td className="py-2 px-4 border-b">
                  {item.numero_serie.length > 15 ? item.numero_serie.substring(0, 15) + '...' : item.numero_serie}
                </td>
                <td className="py-2 px-4 border-b">{item.serie_token_id}</td>                
                <td className="py-2 px-4 border-b">{item.estado ? 'Asignado' : 'Disponible'}</td>
                <td className="py-2 px-4 border-b">{item.tipo_token}</td>
                <td className="py-2 px-4 border-b">{item.usuario ? item.usuario.usuario : 'N/A'}</td>
                {userRole === 1 && (
                  <>
                    <td className="py-2 px-4 border-b text-center">
                      <FaEye className="text-blue-500 cursor-pointer" onClick={() => handleViewClick(item.id)} />
                    </td>                  
                    <td className="py-2 px-4 border-b text-center">
                      <FaEdit className="text-green-500 cursor-pointer" onClick={() => handleEditClick(item)} />
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeleteClick(item.id)} />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && apiData && (
  <button 
    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-6" 
    onClick={handleDownloadListadoTokensCSV}>
    <FaDownload className="inline mr-2" /> Descargar Listado de Tokens
  </button>
)}




        {isViewModalOpen && (
        <ViewTokenModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} tokenData={viewTokenData} />
        )}

        {/* Render the CreateTokenModal component */}
        {isCreateModalOpen && (
          <CreateTokenModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} userId={user.userId}/>
        )}

        {/* Render the UpdateModal component */}
        {isModalOpen && (
          <UpdateModal token={selectedToken} onClose={handleCloseModal} userId={user.userId} />
        )}

        {/* Render the DeleteTokenModal component */}
        {isDeleteModalOpen && (
          <DeleteTokenModal 
            isOpen={isDeleteModalOpen} 
            onClose={() => setIsDeleteModalOpen(false)} 
            tokenId={tokenIdToDelete}
            onSuccess={handleDeleteSuccess} 
            userId={user.userId}
          />
        )}
      </div>
    );
  }

  // Extract data for the two sections
  const { resumen, detalle } = data.information || {};

  return (
    <div className="p-6">
      {/* Conditionally render the 'Resumen' table */}
      {resumen && detalle ? (
        <>
          {/* Resumen Table */}
          <h2 className="text-2xl font-semibold mb-4">Resumen</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Conteo Tokens</th>
                <th className="py-2 px-4 border-b">Estado</th>
                <th className="py-2 px-4 border-b">Gerencia / CC</th>
              </tr>
            </thead>
            <tbody>
              {resumen.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{item.conteo_tokens}</td>
                  <td className="py-2 px-4 border-b">{item.estado === 1 ? 'Asignado' : 'Disponible'}</td>
                  <td className="py-2 px-4 border-b">{item.gerencia}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Detalle Table */}
          <h2 className="text-2xl font-semibold mt-8 mb-4">Detalle</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Token</th>
                <th className="py-2 px-4 border-b">Serie</th>                
                <th className="py-2 px-4 border-b">Estado</th>
                <th className="py-2 px-4 border-b">Tipo Token</th>
                <th className="py-2 px-4 border-b">Usuario Asignado</th>
                <th className="py-2 px-4 border-b">Gerencia / CC</th>
              </tr>
            </thead>
            <tbody>
              {detalle.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border-b">{item.id}</td>
                  <td className="py-2 px-4 border-b">
                    {item.numero_serie.length > 10 ? item.numero_serie.substring(0, 10) + '...' : item.numero_serie}
                  </td>
                  <td className="py-2 px-4 border-b">{item.serie_token}</td>                                    
                  <td className="py-2 px-4 border-b">{item.estado === 1 ? 'Asignado' : 'Disponible'}</td>
                  <td className="py-2 px-4 border-b">{item.tipo_token}</td>
                  <td className="py-2 px-4 border-b">{item.usuario_asignado}</td>
                  <td className="py-2 px-4 border-b">{item.gerencia}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {!loading && data?.information && (
  <button 
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-6"
    onClick={handleDownloadResumenDetalleCSV}
  >
    <FaDownload className="inline mr-2" /> Descargar CSV
  </button>
)}





        </>
      ) : null}

      {/* Render the UpdateModal component */}
      {isModalOpen && (
        <UpdateModal token={selectedToken} onClose={handleCloseModal} />
      )}

      {/* Render the CreateTokenModal component */}
      {isCreateModalOpen && (
        <CreateTokenModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      )}

      {/* Render the DeleteTokenModal component */}
      {isDeleteModalOpen && (
        <DeleteTokenModal 
          isOpen={isDeleteModalOpen} 
          onClose={() => setIsDeleteModalOpen(false)} 
          tokenId={tokenIdToDelete}
          onSuccess={handleDeleteSuccess} 
        />
      )}
    </div>
  );
};

export default Content;


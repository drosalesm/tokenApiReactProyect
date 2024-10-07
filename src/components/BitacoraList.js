import React, { useEffect, useState } from 'react';

const BitacoraList = ({ user }) => {
  const [bitacoraData, setBitacoraData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(20); // Number of records per page

  useEffect(() => {
    const fetchBitacoraData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/bitacora/consumidor/${user.userId}?page=${currentPage}&size=${pageSize}`);
        const data = await response.json();
        if (data.generalResponse.status === 'success') {
          setBitacoraData(data.information.bitacora);
          setTotalPages(Math.ceil(data.information.totalRecords / pageSize));
        } else {
          console.error('Error fetching bitacora data:', data.generalResponse.message);
        }
      } catch (error) {
        console.error('Error fetching bitacora data:', error);
      }
    };

    fetchBitacoraData();
  }, [user.userId, currentPage, pageSize]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bitacora de Transacciónes</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 border-r">Fila</th>
            <th className="py-2 px-4 border-r">Fecha</th>
            <th className="py-2 px-4 border-r">Estatus Peticion</th>            
            <th className="py-2 px-4 border-r">Endpoint Consultado</th>
            <th className="py-2 px-4 border-r">Usuario</th>
            <th className="py-2 px-4 border-r">Transacción</th>            
          </tr>
        </thead>
        <tbody>
          {bitacoraData.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-r">{index + 1 + (currentPage - 1) * pageSize}</td>
              <td className="py-2 px-4 border-r">{item.fecha_trans}</td>
              <td className="py-2 px-4 border-r">{item.codigo_trans}</td>              
              <td className="py-2 px-4 border-r">{item.endpoint}</td>
              <td className="py-2 px-4 border-r">{item.usuario}</td>
              <td className="py-2 px-4 border-r">{item.uti}</td>                
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BitacoraList;

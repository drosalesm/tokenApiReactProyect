import React, { useState } from 'react';
import { FaBook,FaHome, FaChartBar, FaChevronDown, FaChevronUp, FaCog, FaUsers, FaKey, FaInfoCircle } from 'react-icons/fa';


import axios from 'axios';
import '../styles/Sidebar.css'; // Import the CSS file


const Sidebar = ({ isSidebarOpen, toggleSidebar, user, setData, onOptionClick, setViewType }) => {
  const [isReportesOpen, setIsReportesOpen] = useState(false);
  const [isAdministrationOpen, setIsAdministrationOpen] = useState(false);

  const handleReportesClick = async () => {
    setIsReportesOpen(!isReportesOpen);

    // New API call for Reportes
    if (!isReportesOpen) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tokens/consumidor/${user.userId}`);
        setData(response.data); // Update the state in HomePage with API response data
        onOptionClick('Reportes'); // Update Navbar title
        setViewType('reportes'); // Set viewType to 'reportes'
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  
  const handleTokensByGerenciaClick = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tokens/consumidor/${user.userId}/tokens-por-gerencia/`);
      setData(response.data); // Update the state in HomePage with API response data
      onOptionClick('Reporte de tokens por gerencia'); // Update Navbar title
      setViewType('gerencia'); // Set viewType to 'gerencia'
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleTokensByCCClick = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/centros_costo/consumidor/${user.userId}/tokens-por-cc/`);
      setData(response.data); // Update the state in HomePage with API response data
      onOptionClick('Reporte de tokens por centro de costo'); // Update Navbar title
      setViewType('cc'); // Set viewType to 'cc'
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAdministrationClick = () => {
    setIsAdministrationOpen(!isAdministrationOpen);
  };

  const handleUsuariosClick = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/usuarios/consumidor/${user.userId}`);
      setData(response.data); // Update the state in HomePage with API response data
      onOptionClick('Usuarios'); // Update Navbar title
      setViewType('usuarios'); // Set viewType to 'usuarios'
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  const handleGerenciasClick = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/gerencias/consumidor/${user.userId}`);
      setData(response.data); // Update the state in HomePage with API response data
      onOptionClick('Gerencias'); // Update Navbar title
      setViewType('gerencias'); // Set viewType to 'usuarios'
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };




  const handleBitacoraClick = () => {
    onOptionClick('Bitacora'); // Update the Navbar title
    setViewType('bitacora'); // Set viewType to 'bitacora'
  };

  const handleInicioClick = () => {
    onOptionClick('Inicio');  // Cambia el título a Inicio
    setViewType('inicio');    // Cambia la vista a "inicio"
  };

  return (
    <aside className={`w-64 bg-white shadow-lg ${isSidebarOpen ? 'block' : 'hidden'} md:block transition-transform duration-300`}>
      <div className="p-6">
        <button onClick={toggleSidebar} className="md:hidden mb-4 text-gray-600 hover:text-gray-900">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">U</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{user ? `${user.userName}` : ''}</h2>
              <h4 className="text font-semibold text-gray-800">{user ? `${user.userRoleName}` : ''}</h4>
            </div>
          </div>

          <nav className="flex-1">
            <ul> 
              <li className="mb-6">
                <button
                  onClick={handleInicioClick}
                  className="flex items-center text-gray-600 hover:text-gray-900 text-lg w-full text-left sidebar-item"
                >
                  <FaInfoCircle className="mr-4 text-2xl" />
                  Inicio
                </button>
              </li>
              <li className="mb-6">
                <button
                  onClick={handleReportesClick}
                  className="flex items-center text-gray-600 hover:text-gray-900 text-lg w-full text-left sidebar-item"
                >
                  <FaChartBar className="mr-4 text-2xl" />
                  Reportes
                  {isReportesOpen ? (
                    <FaChevronUp className="ml-auto text-xl transition-transform duration-300" />
                  ) : (
                    <FaChevronDown className="ml-auto text-xl transition-transform duration-300" />
                  )}
                </button>
                <ul className={`ml-6 mt-2 space-y-2 transition-max-height duration-500 ease-in-out ${isReportesOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                  <li>
                    <a
                      href="#"
                      onClick={handleTokensByCCClick}
                      className="flex items-center text-gray-600 hover:text-gray-900 text-lg sidebar-item"
                    >
                      Tokens by CC
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={handleTokensByGerenciaClick}
                      className="flex items-center text-gray-600 hover:text-gray-900 text-lg sidebar-item"
                    >
                      Tokens por Gerencia
                    </a>
                  </li>
                </ul>
              </li>
              <li className="mb-6">
                <button
                  onClick={handleAdministrationClick}
                  className="flex items-center text-gray-600 hover:text-gray-900 text-lg w-full text-left sidebar-item"
                >
                  <FaCog className="mr-4 text-2xl" />
                  Administración
                  {isAdministrationOpen ? (
                    <FaChevronUp className="ml-auto text-xl transition-transform duration-300" />
                  ) : (
                    <FaChevronDown className="ml-auto text-xl transition-transform duration-300" />
                  )}
                </button>
                <ul className={`ml-6 mt-2 space-y-2 transition-max-height duration-500 ease-in-out ${isAdministrationOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                  <li>
                    <button
                      onClick={handleUsuariosClick}
                      className="flex items-center text-gray-600 hover:text-gray-900 text-lg w-full text-left sidebar-item"
                    >
                      <FaUsers className="mr-4 text-2xl" />
                      Usuarios
                    </button>

                    <button
                      onClick={handleGerenciasClick}
                      className="flex items-center text-gray-600 hover:text-gray-900 text-lg w-full text-left sidebar-item"
                    >
                      <FaUsers className="mr-4 text-2xl" />
                      Gerencias
                    </button>



                  </li>
                  <li>
                    <a href="/" className="flex items-center text-gray-600 hover:text-gray-900 text-lg sidebar-item">
                      <FaKey className="mr-4 text-2xl" />
                      Tokens
                    </a>
                  </li> 
                  <li>
                    <button
                      onClick={handleBitacoraClick}
                      className="flex items-center text-gray-600 hover:text-gray-900 text-lg w-full text-left sidebar-item"
                    >
                      <FaBook className="mr-4 text-2xl" />
                      Bitacora
                    </button>
                  </li>                                   
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

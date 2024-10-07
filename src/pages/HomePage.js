import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import UserList from "../components/UserList";
import InicioView from "../components/InicioView";
import BitacoraList from "../components/BitacoraList"; // Import BitacoraList
import { AuthContext } from "../context/AuthContext";
import GerenciasList from "../components/gerenciasList";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState(null); // State to hold API data
  const [title, setTitle] = useState(""); // State to hold title for Navbar
  const [viewType, setViewType] = useState(""); // State to hold the type of view ('gerencia', 'cc', 'usuarios', or 'bitacora')
  const { user, logout } = useContext(AuthContext); // Get user and logout from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout from context
    navigate("/login"); // Redirect to login page
  };

  const handleSidebarOptionClick = (title) => {
    setTitle(title); // Update the title based on the selected option
  };

  if (!user) {
    navigate("/login"); // Redirect to login if user is not authenticated
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        user={user}
        setData={setData}
        onOptionClick={handleSidebarOptionClick} // Pass handleSidebarOptionClick to Sidebar
        setViewType={setViewType} // Pass setViewType to Sidebar
      />
      <div className="flex-1 flex flex-col">
        <Navbar onLogout={handleLogout} title={title} />
        {viewType === "usuarios" ? (
          <UserList onOptionClick={handleSidebarOptionClick} />
        ):viewType === "gerencias" ? (
          <GerenciasList onOptionClick={handleSidebarOptionClick} />
        ) : viewType === "inicio" ? (
          <InicioView /> // Renderiza el contenido de la pestaña de inicio
        ) : viewType === "bitacora" ? (
          <BitacoraList user={user} /> // Render BitacoraList when viewType is 'bitacora'
        ) : (
          <Content data={data} userRole={user.userRole} viewType={viewType} />
        )}
      </div>
    </div>
  );
};

export default HomePage;

import React, { useState } from 'react';
import { FaSignOutAlt, FaChevronDown } from 'react-icons/fa';

const Navbar = ({ onLogout, title }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      <div className="relative">
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center text-gray-600 hover:text-gray-900">
          <span className="mr-2">Cuenta</span>
          <FaChevronDown />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-48">
            <button onClick={onLogout} className="block px-4 py-2 text-gray-600 hover:bg-gray-100 w-full text-left">
              <FaSignOutAlt className="inline mr-2" />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

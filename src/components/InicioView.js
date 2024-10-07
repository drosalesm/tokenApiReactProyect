import React from 'react';

const InicioView = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-10">
      <h1 className="text-3xl font-semibold mb-6 text-center">Inicio - Panel de Control</h1>
      <div className="mb-6">
        <img
          src="https://static.vecteezy.com/system/resources/previews/010/750/938/original/security-token-icon-on-white-background-rsa-token-sign-two-factor-authentication-device-cryptosystem-for-security-flat-style-vector.jpg"
          alt="Security Token"
          className="max-w-full h-auto"
          style={{ maxHeight: '200px', objectFit: 'contain' }} // Tamaño de imagen ajustado
        />
      </div>
      <p className="text-lg text-center max-w-2xl">
        ¡Bienvenido al sistema de administración de tokens!<br /><br />
        En este panel podrás acceder a información clave sobre el inventario de tokens, reportes de seguridad y el estado de tus asignaciones. Utiliza los dashboards para consultar datos detallados por centro de costo y obtener estadísticas actualizadas.<br /><br />
        Mantén el control total sobre tus recursos de seguridad y gestiona tus activos de manera eficiente.
      </p>
    </div>
  );
};

export default InicioView;

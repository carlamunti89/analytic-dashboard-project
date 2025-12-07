// src/components/Sidebar.js (Versión CORREGIDA)

import React from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  // 1. Lógica de Clase CSS
  const sidebarClass = `sidebar ${isOpen ? "" : "sidebar--closed"}`;

  return (
    // ESTE ES EL ÚNICO <aside> RAÍZ
    <aside className={sidebarClass} onClick={toggleSidebar}>
      {/* CONTENIDO DEL SIDEBAR */}
      <h2>Panel de Control</h2>
      <nav>
        <ul>
          <li>Visión General</li>
          <li>Reportes de Ventas</li>
          <li>Gestión de Usuarios</li>
          <li>Configuración</li>
        </ul>
      </nav>
      {/* FIN DEL CONTENIDO */}

      {/* Puedes eliminar el comentario del botón de toggle si no lo estás usando aquí */}
    </aside>
  );
};

export default Sidebar;

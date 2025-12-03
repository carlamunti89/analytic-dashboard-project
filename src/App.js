function App() {
  return (
    // Aplicamos la clase principal de la rejilla
    <div className="dashboard-container">
      {/* 1. Área del Sidebar */}
      <aside className="sidebar">
        <h2>Panel de Control</h2>
        <nav>
          <ul>
            <li>Visión General</li>
            <li>Reportes de Ventas</li>
            <li>Gestión de Usuarios</li>
            <li>Configuración</li>
          </ul>
        </nav>
      </aside>

      {/* 2. Área del Contenido Principal */}
      <main className="main-content">
        <h1>Dashboard de Analíticas</h1>
        <p>Aquí se cargará el contenido principal (cards, gráficos, tablas).</p>
      </main>
    </div>
  );
}

export default App;

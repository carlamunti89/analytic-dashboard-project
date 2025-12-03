import Card from "./styles/components/Card";

function App() {
  return (
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
        <div className="card-grid">
          <Card
            title="Total de Ventas"
            value="$45,231"
            icon="📈"
            change={12.5}
          />
          <Card
            title="Usuarios Activos"
            value="3,489"
            icon="👥"
            change={-2.1}
          />
          <Card
            title="Tasa de Conversión"
            value="4.6%"
            icon="⚡"
            change={0.8}
          />
          <Card title="Pedidos Pendientes" value="12" icon="📦" change={-5.0} />
        </div>
      </main>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import dashboardData from "./data/dashboardData.json";

function App() {
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setMetrics(dashboardData.keyMetrics);
      setIsLoading(false);
    }, 500);
  }, []);

  const formatValue = (value, unit) => {
    const options = {
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    };
    const formattedValue = value.toLocaleString("es-ES", options);
    if (unit === "$") {
      return unit + formattedValue;
    }
    return formattedValue + unit;
  };

  const formatChange = (change, change_unit) => {
    if (change === undefined || change === null) return "";

    const sign = change > 0 ? "+" : "";

    const options = {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    };

    const formattedChange = Math.abs(change).toLocaleString("es-ES", options);

    return `${sign}${formattedChange}${change_unit}`;
  };

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
        {isLoading ? (
          <p>Cargando métricas...</p>
        ) : (
          <div className="card-grid">
            {metrics.map((metric) => (
              <Card
                key={metric.id}
                title={metric.title}
                value={formatValue(metric.value, metric.unit)}
                icon={metric.icon}
                change={formatChange(metric.change, metric.change_unit)}
                changeValue={metric.change}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

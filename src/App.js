import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import LineChartCard from "./components/LineChartCard";
import BarChartCard from "./components/BarChartCard";
import DataTable from "./components/DataTable";
import Spinner from "./components/Spinner";
import dashboardData from "./data/dashboardData.json";

function App() {
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulación de carga de datos: 2 segundos de retraso
    const timer = setTimeout(() => {
      setMetrics(dashboardData.keyMetrics);
      setIsLoading(false); // <-- Cambiar a false después del retraso
    }, 2000); // 2000 milisegundos = 2 segundos
    return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
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
          <Spinner />
        ) : (
          <>
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
            {/* INICIO DE LOS GRÁFICOS */}
            <div className="charts-row">
              <LineChartCard
                title="Rendimiento de Ventas Mensuales"
                data={dashboardData.charts[0].data} // Datos de tu JSON
                dataKey="month" // Clave para el Eje X
                lineDataKey="ventas" // Clave para la Línea Y
                unit="$" // Unidad para el Eje Y y Tooltip
              />
              {/* Gráfico de Barras (Chart 2) */}
              <BarChartCard
                title="Tráfico por Fuente de Usuario"
                data={dashboardData.charts[1].data}
                dataKey="category" // Eje X: Email, Social, etc.
                barDataKey="users" // Barras: Valor de Usuarios
              />
            </div>
            {/* INICIO DE LA TABLA DE DATOS */}
            <DataTable
              title="Transacciones Recientes"
              data={dashboardData.recentTransactions} // <-- Usamos los nuevos datos del JSON
            />
            {/* FIN DE LA TABLA DE DATOS */}
          </>
        )}
      </main>
    </div>
  );
}

export default App;

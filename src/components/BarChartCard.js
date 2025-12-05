import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartCard = ({ title, data, dataKey, barDataKey }) => {
  return (
    <div className="chart-card">
      <h2 className="chart-title">{title}</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e9ecef"
            vertical={false}
          />{" "}
          {/* vertical={false} para líneas solo horizontales */}
          <XAxis dataKey={dataKey} />{" "}
          {/* Clave para el eje horizontal (ej. "category") */}
          <YAxis
            tickFormatter={(value) => value.toLocaleString("es-ES")}
            width={60}
          />
          <Tooltip
            formatter={(value) => value.toLocaleString("es-ES")}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              padding: "5px",
            }}
          />
          {/* La Barra del Gráfico */}
          <Bar
            dataKey={barDataKey} // La clave con los valores a dibujar (ej. "users")
            fill="#00C49F" // Color secundario ($color-secondary)
            radius={[4, 4, 0, 0]} // Barras redondeadas arriba
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;

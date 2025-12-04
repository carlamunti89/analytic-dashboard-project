import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChartCard = ({ title, data, dataKey, lineDataKey, unit }) => {
  return (
    <div className="chart-card">
      <h2 className="chart-title">{title}</h2>

      {/* 1. Contenedor Responsivo: Asegura que el gráfico se adapte al tamaño del div padre */}
      <ResponsiveContainer width="100%" height={300}>
        {/* 2. Componente Principal del Gráfico de Líneas */}
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          {/* 3. Rejilla: Dibuja líneas horizontales y verticales dentro del gráfico */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />

          {/* 4. Eje X (horizontal): Muestra las etiquetas basadas en la clave de datos (e.g., "month") */}
          <XAxis dataKey={dataKey} />

          {/* 5. Eje Y (vertical): Muestra los valores de la escala */}
          <YAxis
            // Formato de los números en el eje Y (ej., 10000 -> 10.000)
            tickFormatter={(value) =>
              value.toLocaleString("es-ES") + (unit || "")
            }
            // Ancho del espacio para las etiquetas del eje Y
            width={80}
          />

          {/* 6. Tooltip: La caja emergente que aparece al pasar el ratón */}
          <Tooltip
            // Formato del valor dentro del Tooltip
            formatter={(value) => value.toLocaleString("es-ES") + (unit || "")}
            // Estilo básico del Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              padding: "5px",
            }}
          />

          {/* 7. La Línea del Gráfico: Define qué datos dibujar */}
          <Line
            type="monotone" // Tipo de línea suave
            dataKey={lineDataKey} // La clave con los valores a dibujar (e.g., "ventas")
            stroke="#5A58FE" // Color principal ($color-primary)
            activeDot={{ r: 8 }} // El punto que aparece al pasar el ratón
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartCard;

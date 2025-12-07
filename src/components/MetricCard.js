import React from "react";

// Función para determinar la clase CSS (color) basada en el cambio
const getChangeColor = (change) => {
  if (change > 0) {
    return "change-positive";
  } else if (change < 0) {
    return "change-negative";
  } else {
    return "change-neutral";
  }
};

// Función para obtener la flecha de dirección (▲ o ▼)
const getChangeArrow = (change) => {
  if (change > 0) {
    return "▲"; // Triángulo hacia arriba
  } else if (change < 0) {
    return "▼"; // Triángulo hacia abajo
  } else {
    return "";
  }
};

// Función para formatear el valor de cambio (ej: +2.5%)
// src/components/MetricCard.js (Solución más limpia)

const formatChange = (change, changeUnit) => {
  if (change === undefined || change === null || change === 0) return "";

  // 1. Convertir a porcentaje manteniendo el signo
  const percentage = change * 100;

  const options = {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  };

  // 2. Formatear el número (toLocaleString mantendrá el signo - si es negativo)
  const formattedChange = percentage.toLocaleString("es-ES", options);

  // 3. Si el número es positivo, añade el signo '+' al inicio de la cadena formateada.
  // Si es negativo, la cadena ya empieza con '-'
  if (percentage > 0) {
    return `+${formattedChange}${changeUnit}`;
  }

  return `${formattedChange}${changeUnit}`; // Devuelve -X.X%
};

const MetricCard = ({
  title,
  value,
  unit,
  change,
  changeUnit,
  formatValue,
}) => {
  // 1. Aplicar formato al valor principal usando la prop pasada por App.js
  const formattedValue = formatValue(value, unit);

  // 2. Aplicar formato al porcentaje de cambio
  const formattedChangeText = formatChange(change, changeUnit);

  // 3. Obtener la clase CSS y la flecha (basado en el valor 'change' sin formato)
  const changeColorClass = getChangeColor(change);
  const changeArrow = getChangeArrow(change);

  return (
    <div className="card metric-card">
      <h3 className="metric-title">{title}</h3>
      <p className="metric-value">{formattedValue}</p>

      {/* Solo mostramos el cambio si existe y no es cero */}
      {change !== 0 && formattedChangeText && (
        <div className={`metric-change ${changeColorClass}`}>
          <span className="arrow">{changeArrow}</span>
          <span className="percentage">{formattedChangeText}</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;

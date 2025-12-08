import React from "react";
import {
  getChangeColor,
  getChangeArrow,
  formatChange,
} from "../utils/formatters";

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
        <div
          className={`metric-change ${changeColorClass}`}
          data-testid="metric-change-status"
        >
          <span className="arrow">{changeArrow}</span>
          <span className="percentage">{formattedChangeText}</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;

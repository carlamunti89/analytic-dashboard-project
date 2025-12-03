import React from "react";

// El componente recibirá props para ser reutilizable
const Card = ({ title, value, icon, change }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        {/* Usaremos un div simple para simular un icono */}
        <div className="card-icon">{icon}</div>
      </div>
      <div className="card-body">
        <p className="card-value">{value}</p>
        {/* Ejemplo simple de cómo mostrar un cambio (positivo/negativo) */}
        <span className={`card-change ${change > 0 ? "positive" : "negative"}`}>
          {change > 0 ? "↑" : "↓"} {Math.abs(change)}%
        </span>
      </div>
    </div>
  );
};

export default Card;

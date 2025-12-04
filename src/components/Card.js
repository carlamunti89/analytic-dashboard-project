import React from "react";

// El componente recibirá props para ser reutilizable
const Card = ({ title, value, icon, change, changeValue }) => {
  const changeClass = changeValue > 0 ? "positive" : "negative";
  const arrow = changeValue > 0 ? "↑" : "↓";
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        {/* Usaremos un div simple para simular un icono */}
        <div className="card-icon">{icon}</div>
      </div>
      <div className="card-body">
        <p className="card-value">{value}</p>

        <span className={`card-change ${changeClass}`}>
          {arrow} {change}
        </span>
      </div>
    </div>
  );
};

export default Card;

import React from "react";

const DataTable = ({ title, data }) => {
  // Si no hay datos, mostramos un mensaje
  if (!data || data.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  // Usamos el primer objeto para obtener las claves (encabezados de la tabla)
  const columns = Object.keys(data[0]);

  // Función para dar formato simple a la moneda
  const formatCurrency = (value) => {
    return "$" + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="data-table-card">
      <h2 className="table-title">{title}</h2>
      <div className="table-container">
        <table>
          {/* ENCABEZADOS DE LA TABLA (THEAD) */}
          <thead>
            <tr>
              {columns.map((key) => (
                <th key={key}>
                  {/* Capitalizar la primera letra y reemplazar guiones bajos */}
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, " $1")}
                </th>
              ))}
            </tr>
          </thead>

          {/* CUERPO DE LA TABLA (TBODY) */}
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {columns.map((key) => (
                  <td key={key}>
                    {/* Lógica de formato especial para 'amount' y 'status' */}
                    {key === "amount" ? (
                      formatCurrency(row[key])
                    ) : key === "status" ? (
                      <span
                        className={`status-badge status-${row[
                          key
                        ].toLowerCase()}`}
                      >
                        {row[key]}
                      </span>
                    ) : (
                      row[key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;

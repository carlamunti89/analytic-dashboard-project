import React, { useState } from "react";

const ROWS_PER_PAGE = 3;

const DataTable = ({ title, data }) => {
  // 1. ESTADOS PARA CONTROL
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  if (!data || data.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  const columns = Object.keys(data[0]);

  const formatCurrency = (value) => {
    return "$" + value.toFixed(2).toLocaleString("es-ES");
  };

  // 2. LÓGICA DE BÚSQUEDA (FILTRADO)
  // src/components/DataTable.js (Sustituir las líneas de LÓGICA DE BÚSQUEDA)

  // 2. LÓGICA DE BÚSQUEDA (FILTRADO)
  const filteredData = data.filter((row) => {
    const term = searchTerm.toLowerCase();

    // Si el término de búsqueda está vacío, mostramos todos los datos
    if (term === "") {
      return true;
    }

    // Itera sobre los valores de la fila (user, amount, date, status, id)
    // y devuelve true si AL MENOS UNO incluye el término.
    return Object.values(row).some((value) => {
      // 1. Convierte el valor a cadena (incluso si es un número o fecha)
      // 2. Convierte a minúsculas
      // 3. Verifica si incluye el término buscado
      return String(value).toLowerCase().includes(term);
    });
  });

  // 3. LÓGICA DE PAGINACIÓN
  const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);

  // Calcula los índices de inicio y fin para el corte de datos
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  // Datos que se mostrarán en la página actual
  const currentData = filteredData.slice(startIndex, endIndex);

  // Funciones para cambiar de página
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="data-table-card">
      <h2 className="table-title">{title}</h2>

      {/* 4. CAMPO DE BÚSQUEDA */}
      <div className="table-controls">
        <input
          type="text"
          placeholder="Buscar en la tabla..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Resetear a la primera página al buscar
          }}
          className="table-search-input"
        />
      </div>

      <div className="table-container">
        <table>
          {/* ENCABEZADOS DE LA TABLA (THEAD) - Sin cambios */}
          <thead>
            <tr>
              {columns.map((key) => (
                <th key={key}>
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, " $1")}
                </th>
              ))}
            </tr>
          </thead>

          {/* CUERPO DE LA TABLA (TBODY) - Usa currentData */}
          <tbody>
            {currentData.map((row) => (
              <tr key={row.id}>
                {columns.map((key) => (
                  <td key={key}>
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

      {/* 5. CONTROLES DE PAGINACIÓN */}
      {filteredData.length > ROWS_PER_PAGE && (
        <div className="pagination-controls">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages} ({filteredData.length}{" "}
            resultados)
          </span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;

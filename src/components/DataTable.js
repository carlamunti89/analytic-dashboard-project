import React, { useState, useMemo } from "react";
// Asegúrate de que la ruta sea correcta
import { formatCurrency } from "../utils/formatters";

const ROWS_PER_PAGE = 3;

const DataTable = ({ title, data }) => {
  // 1. ESTADOS PARA CONTROL (useState)
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 2. LÓGICA DE BÚSQUEDA (FILTRADO) - useMemo (LLAMADA INCONDICIONAL 1)
  const filteredData = useMemo(() => {
    // Si no hay datos, retorna un array vacío. Esto asegura que el Hook siempre se llama.
    if (!data || data.length === 0) return [];

    const term = searchTerm.toLowerCase();

    // Lógica de filtrado
    if (term === "") {
      return data;
    }
    return data.filter((row) => {
      // Nota: Asumimos que Object.values(row) es seguro aquí.
      return Object.values(row).some((value) => {
        return String(value).toLowerCase().includes(term);
      });
    });
  }, [data, searchTerm]);

  // 3. CÁLCULO DE PAGINACIÓN Y currentData (LLAMADA INCONDICIONAL 2)

  // Calcula el número total de páginas (si filteredData está vacío, totalPages será 0)
  const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);

  const currentData = useMemo(() => {
    // Si filteredData está vacío (por búsqueda o datos iniciales), retorna [].
    if (filteredData.length === 0) return [];

    // Resetear currentPage si el usuario está en una página que ya no existe después del filtro
    const page = Math.min(currentPage, totalPages > 0 ? totalPages : 1);

    const startIndex = (page - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;

    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, totalPages]); // Añadimos totalPages por seguridad

  // 4. DEFINICIÓN DE COLUMNAS
  // Esto NO es un Hook, pero debe ejecutarse ANTES del return, si data[0] existe.
  // Movemos la lógica para manejar el caso de 'data' vacío.
  const columns = data && data.length > 0 ? Object.keys(data[0]) : [];

  // 5. RETORNO TEMPRANO VERIFICANDO DATOS
  // Esto es seguro porque TODOS los Hooks (useState y useMemo) ya se llamaron.
  if (filteredData.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  // 6. FUNCIONES DE MANEJO
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="data-table-card">
      <h2 className="table-title">{title}</h2>

      {/* 7. CAMPO DE BÚSQUEDA */}
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
          {/* ENCABEZADOS DE LA TABLA (THEAD) */}
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
            {currentData.map((row, index) => (
              <tr key={row.id || index}>
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

      {/* 8. CONTROLES DE PAGINACIÓN */}
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

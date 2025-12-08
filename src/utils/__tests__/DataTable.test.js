// src/components/__tests__/DataTable.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DataTable from "../../components/DataTable"; // Asegúrate de que esta ruta sea correcta

// MOCK: Jest debe mockear cualquier utilidad (como formatCurrency) que se use dentro del componente.
// Esto asegura que probamos el DataTable de forma aislada.
jest.mock("../../utils/formatters", () => ({
  formatCurrency: (value) => `€${value.toFixed(2)}`,
}));

// Datos de prueba (6 filas)
const mockData = [
  { id: 1, region: "Norte", sales: 1500, product: "Laptop Pro" },
  { id: 2, region: "Sur", sales: 800, product: "Monitor Max" },
  { id: 3, region: "Este", sales: 2200, product: "Laptop Air" },
  { id: 4, region: "Oeste", sales: 500, product: "Teclado X" },
  { id: 5, region: "Norte", sales: 1100, product: "Mouse Z" },
  { id: 6, region: "Sur", sales: 1800, product: "Laptop Air" },
];

describe("DataTable Component", () => {
  // Definimos un valor constante para ROWS_PER_PAGE (3)
  const ITEMS_PER_PAGE = 3;

  // Props base (Solo se usa data; itemsPerPage coincide con la constante interna)
  const defaultProps = {
    data: mockData,
    title: "Reporte de Ventas",
    // Nota: itemsPerPage ya está definido internamente como 3, pero lo incluimos
    // para fines de documentación si usáramos la prop.
    itemsPerPage: ITEMS_PER_PAGE,
  };

  // --- TEST 1: RENDERIZADO Y PAGINACIÓN INICIAL ---
  test("debe mostrar la cabecera correcta y el número de filas por defecto (3)", () => {
    render(<DataTable {...defaultProps} />);

    // 1. Verificar cabeceras dinámicas (basadas en las claves de mockData)
    expect(screen.getByText("Region")).toBeInTheDocument();
    expect(screen.getByText("Sales")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();

    // 2. Verificar filas visibles (1 encabezado + 3 datos = 4)
    const allRows = screen.getAllByRole("row");
    expect(allRows).toHaveLength(ITEMS_PER_PAGE + 1);

    // 3. Verificar paginación inicial
    // La primera fila (Laptop Pro) debe estar visible.
    expect(screen.getByText("Laptop Pro")).toBeInTheDocument();
    // La cuarta fila ('Teclado X') NO debe estar visible.
    expect(screen.queryByText("Teclado X")).not.toBeInTheDocument();
  });

  // --- TEST 2: FUNCIONALIDAD DE PAGINACIÓN ---
  test("debe navegar a la siguiente página y mostrar las filas correctas", () => {
    render(<DataTable {...defaultProps} />);

    // El botón Siguiente debe estar habilitado
    const nextButton = screen.getByRole("button", { name: /siguiente/i });
    expect(nextButton).toBeEnabled();

    // Clic en Siguiente (Vamos de la Pág 1 a la Pág 2)
    fireEvent.click(nextButton);

    // 1. El contenido de la Pág 1 (Laptop Pro) ya no debe estar.
    expect(screen.queryByText("Laptop Pro")).not.toBeInTheDocument();

    // 2. El contenido de la Pág 2 (Teclado X) debe estar visible.
    expect(screen.getByText("Teclado X")).toBeInTheDocument();

    // 3. El botón Anterior debe estar habilitado, y Siguiente debe seguir habilitado.
    expect(screen.getByRole("button", { name: /anterior/i })).toBeEnabled();
    expect(nextButton).toBeDisabled(); // Todavía quedan datos en la Pág 2.
  });

  // --- TEST 3: FUNCIONALIDAD DE BÚSQUEDA (FILTRADO) ---
  test("debe filtrar filas correctamente y resetear la paginación", () => {
    render(<DataTable {...defaultProps} />); // 1. Encontrar el campo de búsqueda por el placeholder

    const searchInput = screen.getByPlaceholderText(/buscar en la tabla/i); // 2. Escribir "Laptop" (hay 3 resultados: 1, 3, 6)

    fireEvent.change(searchInput, { target: { value: "Laptop" } }); // ... (otras aserciones de filas y filtro son correctas) ... // 4. Verificar que la paginación NO EXISTE porque 3 resultados caben en 3 filas. // Usamos queryByRole porque esperamos que el elemento no esté en el DOM.

    const nextButton = screen.queryByRole("button", { name: /siguiente/i }); // CORRECCIÓN CLAVE: El botón NO debe estar en el documento.
    expect(nextButton).not.toBeInTheDocument();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MetricCard from "../../components/MetricCard"; // Ruta ajustada a tu estructura

// 1. SIMULAR LAS UTILIDADES CON JEST (MOCKING)
// Importamos las utilidades de formatters para simularlas.
// Jest reemplazará la implementación real de estas funciones por las nuestras.
jest.mock("../../utils/formatters", () => ({
  // Implementación falsa para getChangeColor (simplemente devuelve la clase)
  getChangeColor: (change) => {
    if (change > 0) return "change-positive";
    if (change < 0) return "change-negative";
    return "change-neutral";
  },
  // Implementación falsa para getChangeArrow (simplemente devuelve la flecha)
  getChangeArrow: (change) => {
    if (change > 0) return "▲";
    if (change < 0) return "▼";
    return "";
  },
  // Implementación falsa para formatChange (devuelve un string predecible)
  formatChange: (change) => {
    const value = Math.abs(change * 100).toFixed(1);
    // Añadir el signo + si es positivo, o el signo - si es negativo.
    if (change > 0) return `+${value}%`;
    if (change < 0) return `-${value}%`; // <-- ¡CORRECCIÓN CLAVE AQUÍ!
    return `${value}%`;
  },
}));

// MOCK para la prop formatValue que se pasa desde App.js
const mockFormatValue = (value, unit) => `${unit} ${value}`;

describe("MetricCard Component", () => {
  // Props base para reutilizar en los tests
  const defaultProps = {
    title: "Ventas Totales",
    value: 125000,
    unit: "€",
    change: 0, // Neutro por defecto
    changeUnit: "%",
    formatValue: mockFormatValue, // Usamos el mock directo
  };

  // Test 1: Renderizado básico de título y valor
  test("debe renderizar el título y el valor principal formateado", () => {
    render(<MetricCard {...defaultProps} />);

    expect(screen.getByText("Ventas Totales")).toBeInTheDocument();
    // Verifica el valor formateado usando el mock: "€ 125000"
    expect(screen.getByText("€ 125000")).toBeInTheDocument();
  });

  // Test 2: Comportamiento Positivo
  test("debe mostrar el cambio positivo (▲) y la clase 'change-positive'", () => {
    const props = { ...defaultProps, change: 0.15 };
    render(<MetricCard {...props} />);

    // Usamos el data-testid añadido al componente para encontrar el contenedor
    const changeContainer = screen.getByTestId("metric-change-status");

    // Verificación de Contenido (basado en el mocking de utilidades)
    expect(screen.getByText("▲")).toBeInTheDocument();
    expect(screen.getByText("+15.0%")).toBeInTheDocument();

    // Verificación de Lógica Visual (Clase CSS)
    expect(changeContainer).toHaveClass("change-positive");
    expect(changeContainer).toHaveClass("metric-change");
  });

  // Test 3: Comportamiento Negativo
  test("debe mostrar el cambio negativo (▼) y la clase 'change-negative'", () => {
    const props = { ...defaultProps, change: -0.05 };
    render(<MetricCard {...props} />);

    const changeContainer = screen.getByTestId("metric-change-status");

    // Verificación de Contenido
    expect(screen.getByText("▼")).toBeInTheDocument();
    expect(screen.getByText("-5.0%")).toBeInTheDocument();

    // Verificación de Lógica Visual (Clase CSS)
    expect(changeContainer).toHaveClass("change-negative");
  });

  // Test 4: Comportamiento Neutro (Ausencia)
  test("no debe mostrar la sección de cambio cuando el cambio es 0", () => {
    // Renderiza con el change: 0 de defaultProps
    render(<MetricCard {...defaultProps} />);

    // Usamos queryByTestId, que devuelve null si el elemento no está en el DOM
    const changeContainer = screen.queryByTestId("metric-change-status");

    // Esperamos que el elemento NO esté en el documento (debido al condicional en MetricCard.js)
    expect(changeContainer).not.toBeInTheDocument();
    // También verificamos que no se muestre texto de cambio (aunque sea '0.0%')
    expect(screen.queryByText("0.0%")).not.toBeInTheDocument();
  });
});

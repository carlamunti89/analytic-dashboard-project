import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "../../components/Sidebar";

describe("Sidebar Component", () => {
  // Mock de la función de manejo (toggleSidebar)
  const mockToggle = jest.fn();

  // Props base
  const defaultProps = {
    toggleSidebar: mockToggle,
    isOpen: true,
  };

  // --- TEST 1: COMPORTAMIENTO VISUAL (CLASES CSS) ---
  test('debe tener la clase "sidebar" y NO la clase "--closed" cuando isOpen es true', () => {
    render(<Sidebar {...defaultProps} />);

    // Buscar el elemento principal (el rol 'complementary' es común para sidebars/aside)
    const sidebarElement = screen.getByRole("complementary");

    // Debe tener la clase base
    expect(sidebarElement).toHaveClass("sidebar");
    // NO debe tener la clase de cerrado
    expect(sidebarElement).not.toHaveClass("sidebar--closed");
  });

  test('debe tener la clase "sidebar--closed" cuando isOpen es false', () => {
    // Renderizar con la prop isOpen=false
    const closedProps = { ...defaultProps, isOpen: false };
    render(<Sidebar {...closedProps} />);

    const sidebarElement = screen.getByRole("complementary");

    // Debe tener la clase de cerrado
    expect(sidebarElement).toHaveClass("sidebar--closed");
  });

  // --- TEST 2: COMPORTAMIENTO FUNCIONAL (INTERACCIÓN) ---
  test("debe llamar a toggleSidebar al hacer clic en cualquier parte de la barra lateral", () => {
    // Limpiamos las llamadas anteriores del mock antes de este test
    mockToggle.mockClear();

    render(<Sidebar {...defaultProps} />);

    // Buscamos el elemento raíz (el tag <aside>)
    const sidebarElement = screen.getByRole("complementary");

    // 1. Antes del clic, la función NO debe haber sido llamada
    expect(mockToggle).not.toHaveBeenCalled();

    // 2. Simular el clic en el elemento raíz (que contiene el onClick)
    fireEvent.click(sidebarElement);

    // 3. Verificar que la función mock ha sido llamada exactamente una vez
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
});

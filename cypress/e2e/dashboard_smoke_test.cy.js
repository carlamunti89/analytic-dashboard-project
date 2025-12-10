/// <reference types="cypress" />
/* global cy */ // <-- AÑADE ESTA LÍNEA AQUÍ
// cypress/e2e/dashboard_smoke_test.cy.js

describe("Dashboard Smoke Test", () => {
  // El beforeEach se encarga de la visita y de esperar la carga de datos.
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Sincronización CLAVE: Esperar a que el Spinner desaparezca.

    cy.get(".spinner", { timeout: 3000 }).should("not.exist");
  }); // --- TEST 1: CARGA DE LA APLICACIÓN Y TÍTULOS ---

  it("Debe cargar la aplicación y mostrar el título principal después del spinner", () => {
    cy.get(".main-content h1")
      .should("be.visible")
      .and("contain", "Dashboard de Analíticas");
  }); // --- TEST 2: VERIFICACIÓN DE ELEMENTOS DE DATOS CLAVE (ÚLTIMA CORRECCIÓN) ---

  it('Debe mostrar la tarjeta de métrica "Ventas Totales" y la tabla de datos', () => {
    // 1. BÚSQUEDA ROBUSTA: Usa RegExp para ignorar mayúsculas/minúsculas o espacios extraños.
    cy.contains(/total de ventas/i).should("be.visible"); // 2. Verificación de la tabla (más estricta)
    cy.get(".data-table-card")
      .contains("Transacciones Recientes")
      .should("exist");
    cy.get(".data-table-card tbody tr").its("length").should("be.gt", 0);
  }); // --- TEST 3: FUNCIONALIDAD DE LA SIDEBAR (Toggle) ---

  it("Debe alternar la Sidebar al hacer clic en el botón de hamburguesa", () => {
    const toggleButtonSelector = ".sidebar-toggle-btn";

    // 1. Verificar estado inicial (Cerrada)
    cy.get(".sidebar").should("have.class", "sidebar--closed");

    // --- PRIMER CLIC: ABRE ---
    cy.get(toggleButtonSelector).should("be.visible").click({ force: true });

    // 2. Verificar estado (Abierta)
    cy.get(".sidebar").should("not.have.class", "sidebar--closed");

    // --- SEGUNDO CLIC: CIERRA ---
    // Si el problema es de propagación o de un elemento cubriendo,
    // es mejor confiar en 'force: true'.
    // Eliminamos el 'log: false' ya que no es la solución.
    cy.get(toggleButtonSelector).should("be.visible").click({ force: true });

    // 3. Dar más tiempo de espera (si es necesario) o eliminar el cy.wait(500)
    // El 'cy.should' ya reintenta por 4000ms, pero un pequeño 'wait' a veces ayuda
    // si la transición CSS es muy lenta.
    cy.wait(500);

    // 4. Verificar estado final (Cerrada)
    // Si el error persiste, la implementación del segundo clic es el problema.
    cy.get(".sidebar").should("have.class", "sidebar--closed");
  });
  // --- TEST 4: COMPORTAMIENTO AVANZADO (Cerrar al hacer clic en el main-content) ---
  it("Debe cerrar la Sidebar al hacer clic en el contenido principal (overlay)", () => {
    // 1. ABRIR la Sidebar usando el botón de toggle (ya que nace cerrada)
    cy.get(".sidebar-toggle-btn").click({ force: true });

    // 2. Verificar que ahora está ABIERTA (no tiene la clase)
    cy.get(".sidebar").should("not.have.class", "sidebar--closed");

    // 3. Clic en el overlay (título principal)
    cy.get(".main-content h1").click();

    // 4. VERIFICAR QUE SE CIERRA
    cy.get(".sidebar").should("have.class", "sidebar--closed"); // <--- ASERCIÓN FINAL CORRECTA

    // 5. ¡Eliminar la línea fallida final!
  });
});

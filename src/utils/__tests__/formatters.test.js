//Este código prueba la función formatChange, que es la más compleja.
import {
  formatCurrency,
  formatMetricValue,
  getChangeColor,
  formatChange,
} from "../formatters";

describe("Formatters Utilities", () => {
  // Test 1: formatCurrency
  test("formatCurrency debe formatear a € con separador de miles correcto", () => {
    // 12345.67 debe ser 12.345,67 €
    expect(formatCurrency(12345.67)).toBe("12.345,67\u00A0€");
  });

  // Test 2: formatMetricValue
  test("formatMetricValue debe añadir la unidad al final y formatear el número", () => {
    // 15000 con la unidad '%' debe ser '15.000%'
    expect(formatMetricValue(15000, "%")).toBe("15.000%");
    // 5000 con la unidad '$' debe ser '$5.000'
    expect(formatMetricValue(5000, "$")).toBe("$5.000");
  });

  // Test 3: getChangeColor
  test("getChangeColor debe retornar la clase correcta según el cambio", () => {
    expect(getChangeColor(0.1)).toBe("change-positive"); // Positivo
    expect(getChangeColor(-0.05)).toBe("change-negative"); // Negativo
    expect(getChangeColor(0)).toBe("change-neutral"); // Cero
  });

  // Test 4: formatChange (El más importante)
  test("formatChange debe incluir el signo + para cambios positivos", () => {
    // 0.05 (5%) debe ser '+5,0%'
    expect(formatChange(0.05)).toBe("+5,0%");
  });

  test("formatChange debe incluir el signo - para cambios negativos", () => {
    // -0.015 (-1.5%) debe ser '-1,5%'
    expect(formatChange(-0.015)).toBe("-1,5%");
  });

  test("formatChange debe retornar vacío para cambio nulo", () => {
    // 0 debe ser ''
    expect(formatChange(0)).toBe("");
  });
});

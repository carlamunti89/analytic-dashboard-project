// ------------------------------------
// 1. FORMATO DE MONEDA PARA TABLAS Y GRÁFICOS
// ------------------------------------
export const formatCurrency = (value) => {
  // Usamos Intl.NumberFormat para asegurarnos de que el formato de moneda es robusto
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR", // Cambia a "USD" si es necesario
    minimumFractionDigits: 2,
  }).format(value);
};

// ------------------------------------
// 2. FORMATO DEL VALOR PRINCIPAL (DE APP.JS)
// ------------------------------------
export const formatMetricValue = (value, unit) => {
  // Formatea el número sin decimales y con separador de miles
  const options = {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  const formattedValue = value.toLocaleString("es-ES", options);

  if (unit === "$") {
    return unit + formattedValue;
  }
  return formattedValue + unit;
};

// ------------------------------------
// 3. LÓGICA DE CAMBIO (DE METRICCARD.JS)
// ------------------------------------

export const getChangeColor = (change) => {
  if (change > 0) {
    return "change-positive";
  } else if (change < 0) {
    return "change-negative";
  } else {
    return "change-neutral";
  }
};

export const getChangeArrow = (change) => {
  if (change > 0) {
    return "▲"; // Triángulo hacia arriba
  } else if (change < 0) {
    return "▼"; // Triángulo hacia abajo
  } else {
    return "";
  }
};

export const formatChange = (change, changeUnit = "%") => {
  if (change === undefined || change === null || change === 0) return "";

  // Convertir a porcentaje (0.05 -> 5)
  const percentage = change;

  const options = {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    // La clave es 'signDisplay': 'exceptZero' añade el '+' a los positivos
    signDisplay: "exceptZero",
  };

  const formattedChange = new Intl.NumberFormat("es-ES", options).format(
    percentage
  );

  return `${formattedChange}${changeUnit}`;
};

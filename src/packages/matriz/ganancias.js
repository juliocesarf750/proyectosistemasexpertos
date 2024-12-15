export const generarSubmatriz = (matriz, valores, columnasDeseadas) => {
  const indicesDeseados = columnasDeseadas.map((columna) => valores.indexOf(columna));
  if (indicesDeseados.includes(-1)) {
    throw new Error("Algunas columnas deseadas no existen en los valores.");
  }
  return matriz.map((fila) => indicesDeseados.map((indice) => fila[indice]));
};

export const obtenerValoresUnicos = (matriz) =>
  [...new Set(matriz.map((fila) => fila[0]))];

export const obtenerFavorablesYDesfavorables = (matriz, numero) => {
  const aceptado = Math.min(...matriz.map((fila) => fila[1]));
  const rechazado = aceptado + 1;

  let favorables = 0;
  let desfavorables = 0;

  matriz.forEach((fila) => {
    if (fila[0] === numero) {
      if (fila[1] === aceptado) favorables++;
      if (fila[1] === rechazado) desfavorables++;
    }
  });

  return { favorables, desfavorables };
};

export const calcularEntropia = (F, D, C) => {
  if (F === 0 || D === 0) return 0;
  const pF = F / C;
  const pD = D / C;
  return Math.round((-pF * Math.log2(pF) - pD * Math.log2(pD)) * 100) / 100;
};

export const calcularGanancia = (matriz, header, n, meta) => {
  const cEntropia = (submatriz) => {
    const variables = obtenerValoresUnicos(submatriz);
    return variables.reduce((acc, fila) => {
      const { favorables, desfavorables } = obtenerFavorablesYDesfavorables(submatriz, fila);
      const C = favorables + desfavorables;
      const F = favorables;
      const D = desfavorables;
      return acc + (C / n) * calcularEntropia(F, D, C);
    }, 0);
  };

  const EGlobal = () => {
    const ultimaColumna = matriz.map((fila) => fila[fila.length - 1]);
    const valorFavorable = Math.min(...ultimaColumna);
    const valorDesfavorable = Math.max(...ultimaColumna);

    const casosFavorables = ultimaColumna.filter((v) => v === valorFavorable).length;
    const casosDesfavorables = ultimaColumna.filter((v) => v === valorDesfavorable).length;

    const n = casosFavorables + casosDesfavorables;
    const pFavorables = casosFavorables / n;
    const pDesfavorables = casosDesfavorables / n;

    return -pFavorables * Math.log2(pFavorables) - pDesfavorables * Math.log2(pDesfavorables);
  };

  const ganancia = [];
  header.slice(0, -1).forEach((h) => {
    const submatriz = generarSubmatriz(matriz, header, [h, meta]);
    console.log("submatriz ganacia", submatriz);
    console.log("Eglobal", EGlobal());
    ganancia[h] = Math.round((EGlobal() - cEntropia(submatriz)) * 100) / 100;
  });

  return ganancia;
};

import { useEffect, useState } from "react";
import ArbolDecision from "./packages/arbol/arbol";
import { NodoDecision } from "./packages/arbol/nodo";
import { Matriz } from "./packages/matriz/clase_matriz";
import { calcularGanancia } from "./packages/matriz/ganancias";
import NodoDecisionComponent from "./components/arbolcss";

//PROBLEMA DEL CREDITO
/*const Cabeza = [["moroso", "antiguedad", "ingresos", "trabajo", "credito"]]
const Valores = [["si", "no", ">5", "<1", "1-5", "600-1200", ">1200", "<600", "tiene", "no tiene", "aceptado", "rechazado"]]
const Matrizprincipal = [
  [0, 2, 5, 8, 11],
  [1, 3, 5, 8, 10],
  [0, 4, 6, 8, 11],
  [1, 2, 6, 9, 10],
  [1, 3, 6, 8, 10],
  [0, 4, 5, 8, 11],
  [1, 4, 6, 8, 10],
  [1, 3, 7, 8, 11],
  [1, 2, 5, 9, 11],
  [0, 4, 7, 9, 11],
]*/

//PROBLEMA DE PODER JUGAR
const Cabeza = [["cielo", "temperatura", "humedad", "viento", "jugar"]]
const Valores = [["soleado", "nublado", "lluvia", "alta", "suave", "baja", "normal", "fuerte", "devil", "si", "no"]]
const Matrizprincipal = [
  [0, 3, 3, 8, 10],
  [0, 3, 3, 7, 10],
  [1, 3, 3, 8, 9],
  [2, 4, 3, 8, 9],
  [2, 5, 6, 8, 9],
  [2, 5, 6, 7, 10],
  [1, 5, 6, 7, 9],
  [0, 4, 3, 8, 10],
  [0, 5, 6, 8, 9],
  [2, 4, 6, 8, 9],
  [0, 4, 6, 7, 9],
  [1, 4, 3, 7, 9],
  [1, 3, 6, 8, 9],
  [2, 4, 3, 7, 10],
]



function App() {

  const Header = new Matriz(10, 0, Cabeza);
  const Value = new Matriz(10, 0, Valores);
  const M = new Matriz(17, 10, Matrizprincipal);


  function dividirMatrizSinColumna(MatrizPrincipal, cabeza, indiceColumna) {
    const valoresUnicos = [...new Set(MatrizPrincipal.map(fila => fila[indiceColumna]))];
    const resultado = {};

    valoresUnicos.forEach(valor => {
      const submatriz = MatrizPrincipal.filter(fila => fila[indiceColumna] === valor)
        .map(fila => fila.filter((_, index) => index !== indiceColumna));

      const header = new Matriz(10, 10, [cabeza]);
      const nuevaCabeza = header.eliminarColumnaYRetornarNueva(indiceColumna);
      const h = nuevaCabeza.elemento;

      resultado[valor] = { submatriz, h };
    });

    return resultado;
  }



  function ultimacolumnaigual(matriz) {
    const lastColumn = matriz.map(row => row[row.length - 1]);
    return lastColumn.every(val => val === lastColumn[0]);
  }



  function generarArbolDecision(matriz, cabeza, n, meta) {
    const cabezaPlan = cabeza;
    const indiceMeta = cabezaPlan.indexOf(meta);

    const esHomogenea = ultimacolumnaigual(matriz)
    if (esHomogenea) {
      const resultadoFinal = matriz[0][indiceMeta];
      return new NodoDecision(`${meta} = ${Value.elemento[0][resultadoFinal]} `);
    }

    console.log("indice meta", indiceMeta);
    if (indiceMeta === -1) {
      throw new Error(`La columna '${meta}' no se encuentra en cabeza.`);
    }

    const ganancias = calcularGanancia(matriz, cabezaPlan, n, meta);

    let maxValor = -Infinity;
    let claveMax = null;

    Object.entries(ganancias).forEach(([clave, valor]) => {
      if (valor > maxValor) {
        maxValor = valor;
        claveMax = clave;
      }
    });

    const indiceMax = cabezaPlan.indexOf(claveMax);
    const divisiones = dividirMatrizSinColumna(matriz, cabeza, indiceMax);

    const nodoRaiz = new NodoDecision(`¿${claveMax}?`);

    Object.entries(divisiones).forEach(([clave, division]) => {
      const submatriz = division.submatriz;
      const nuevaCabeza = division.h[0];

      const nodoHijo = generarArbolDecision(submatriz, nuevaCabeza, submatriz.length, meta);
      nodoRaiz.agregarOpcion(` ${Value.elemento[0][clave]}`, submatriz, nuevaCabeza, nodoHijo);

    });

    return nodoRaiz;
  }


  const arbol = generarArbolDecision(M.elemento, Header.elemento[0], M.elemento.length, Header.elemento[0][Header.elemento[0].length - 1]);




  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <h1 style={{ textAlign: 'center', paddingTop: "50px" }}>problema de {Cabeza[0][Cabeza[0].length - 1]}?</h1>
      <ArbolDecision nodo={arbol} />
      <div style={{  width: '120px', height: 'auto', margin: 'auto', marginTop: '100px', paddingBottom: '0px' }}>
        <NodoDecisionComponent nodo={arbol} />
      </div>
    </div>
  );
}

export default App;
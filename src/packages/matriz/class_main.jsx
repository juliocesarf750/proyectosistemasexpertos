import React, { useEffect, useState } from "react";

import { Matriz } from "./clase_matriz.js";
import { calcularGanancia } from "./ganancias.js";

const Main = ({ cabeza, valores, matrizprincipal, n, meta }) => {
  const Header = new Matriz(3, 0, cabeza);
  const Value = new Matriz(7, 0, valores);
  const M = new Matriz(9, 4, matrizprincipal);


  const [header] = useState(Header.elemento[0]);
  const [value] = useState(Value.elemento[0]);
  const [m] = useState(M.elemento);

  useEffect(() => {
    const ganancias = calcularGanancia(M.elemento, Header.elemento[0], n, meta);
    console.log("Ganancias:", ganancias);
  }, [Header, M, n, meta]);

  return (
    <div>
      <h1>Tabla Generada</h1>
      <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {header.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {m.map((fila, index) => (
            <tr key={index}>
              {fila.map((col, colIndex) => (
                <td key={colIndex}>{value[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Main;

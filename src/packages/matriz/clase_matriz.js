export class Matriz {
    constructor(fila, columna, elemento) {
      this.fila = fila; 
      this.columna = columna; 
      this.elemento = elemento; 
    }
  
    mostrarMatriz() {
      console.log("Matriz:");
      for (let i = 0; i < this.fila; i++) {
        let fila = this.elemento[i].join(" ");
        console.log(fila);
      }
    }
  
  
    obtenerElemento(fila, columna) {
        return this.elemento[fila][columna];
    }
  
    
    modificarElemento(fila, columna, nuevoValor) {
      if (fila >= 0 && fila < this.fila && columna >= 0 && columna < this.columna) {
        this.elemento[fila][columna] = nuevoValor;
      } else {
        throw new Error("Índices fuera de rango");
      }
    }

    eliminarColumnaYRetornarNueva(numeroColumna) {
      console.log('Elemento:', this.elemento); 
      if (!Array.isArray(this.elemento) || !this.elemento.every(Array.isArray)) {
          throw new Error("El atributo 'elemento' debe ser una matriz bidimensional.");
      }
      const nuevaMatriz = this.elemento.map(fila => fila.filter((_, index) => index !== numeroColumna));
      return new Matriz(this.fila, this.columna - 1, nuevaMatriz);
  }
  

  }


export class NodoDecision {
    constructor(pregunta) {
      this.pregunta = pregunta;
      this.opciones = [];
    }
  
    agregarOpcion(opcion, matriz,header, nodoHijo) {
      this.opciones.push({ opcion, matriz,header, nodoHijo });
    }
  }
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ArbolDecision = ( raiz ) => {
  const [nodoActual, setNodoActual] = useState(raiz.nodo);

  const reiniciarArbol = () => {
    setNodoActual(raiz.nodo);
  };

  const mostrarOpciones = async (nodo) => {
    const tieneNodoFinal = nodo.opciones.some(opcion => opcion.nodoHijo.opciones.length === 0);

    const opciones = nodo.opciones.map((opcion) => ({
      text: opcion.opcion,
      value: opcion.nodoHijo,
    }));

    const { value: nodoSeleccionado } = await Swal.fire({
      title: nodo.pregunta || 'Elige una opción:',
      input: 'radio',
      inputOptions: opciones.reduce((acc, opcion, index) => {
        acc[index] = opcion.text;
        return acc;
      }, {}),
      inputValidator: (value) => (!value ? 'Debes elegir una opción' : undefined),
      confirmButtonText: 'Siguiente',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    });

    if (nodoSeleccionado !== undefined) {
      const nuevoNodo = opciones[nodoSeleccionado].value;
      

      if (nuevoNodo.opciones.length === 0) {
        await Swal.fire({
          title: `Decisión Final: ${nuevoNodo.pregunta}`,
          icon: false,
          confirmButtonText: 'Aceptar',
          willClose: () => {
            reiniciarArbol();
          }
        });
        return null;
      }

      return nuevoNodo;
    }

    return null;
  };

  const avanzarArbol = async () => {
    const nuevoNodo = await mostrarOpciones(nodoActual);
    if (nuevoNodo) {
      setNodoActual(nuevoNodo);
      
      setTimeout(async () => {
        if (nuevoNodo.opciones && nuevoNodo.opciones.length > 0) {
          const siguienteNodo = await mostrarOpciones(nuevoNodo);
          if (siguienteNodo) {
            setNodoActual(siguienteNodo);
          }
        }
      }, 500);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h3 style={{ marginBottom: '20px' }}>{nodoActual.pregunta}</h3>
      <button
        onClick={avanzarArbol}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          marginRight: '10px',
        }}
      >
        {nodoActual.pregunta ? 'Responder' : 'Comenzar'}
      </button>
      <button
        onClick={reiniciarArbol}
        style={{
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Reiniciar
      </button>
    </div>
  );
};

export default ArbolDecision;